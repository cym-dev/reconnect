//__________ render
var time = 0;
function EscapingText(i) {
  var that = this;
  var arr = [];
  var element = $(".effect")[0];
  var text = element.textContent;
  text.split("").forEach(t => {
    if (t == "|") {
      arr.push("br");
    } else {
      arr.push(t);
    }
  });

  this.invert = false;
  this.mouse = {
    x: 0,
    y: 0,
    active: false,
  };
  this.animate = true;
  this.floating = true;

  this.positionType = getComputedStyle(element).position;

  this.lerp = function (e, t, i) {
    return (1 - i) * e + i * t;
  };
  this.checkBound = function () {
    if (element.hasAttribute("data-bound")) {
      return element.dataset.bound === "true";
    }
  };

  this.useBound = this.checkBound();
  this.colors = ["white", "#91d4fd"];

  this.randomColor = function () {
    var randNum = Math.floor(Math.random() * this.colors.length);
    return this.colors[randNum];
  };

  this.bounds = this.useBound
    ? {
        min: {
          x: element.offsetLeft,
          y: element.offsetTop,
        },
        max: {
          x: element.offsetLeft + element.offsetWidth,
          y: element.offsetTop + element.offsetHeight,
        },
      }
    : {
        min: {
          x: 0,
          y: 0,
        },
        max: {
          x: window.innerWidth,
          y: window.innerHeight,
        },
      };

  this.pointInCircle = function (point, target) {
    var distsq =
      (point.x - target.x) * (point.x - target.x) +
      (point.y - target.y) * (point.y - target.y);
    return [distsq <= 300 * 300, distsq];
  };

  function createSpan(text, pos) {
    var span =
      text == "br"
        ? document.createElement("br")
        : document.createElement("span");
    span.innerHTML = text;
    span.style.position = "relative";
    span.style.display = "inline-block";
    span.style.minWidth = "10px";
    var color = that.randomColor();
    span.style.color = color;
    span._own = {
      old_color: color,
      resetTime: 0,
      pos: {
        x: 0,
        y: 0,
      },
      vel: {
        x: -0.5 + Math.random(),
        y: -0.5 + Math.random(),
      },
      speed: {
        x: 0,
        y: 0,
      },
      dir: {
        x: 1,
        y: 1,
      },
    };
    return span;
  }
  this.textSpans = [];

  element.innerHTML = "";

  arr.forEach(function (t, i) {
    var el = createSpan(t, {
      x: 0,
      y: 0,
    });
    element.appendChild(el);
    that.textSpans.push(el);
  });

  this.getDim = function () {
    this.textSpans.forEach(function (t, i) {
      var offset = {
        x: 0,
        y: 0,
      };
      if (
        that.positionType === "relative" ||
        that.positionType === "absolute"
      ) {
        offset.x = element.offsetLeft;
        offset.y = element.offsetTop;
      }
      (t._own.real = {
        x: offset.x + t.offsetLeft,
        y: offset.y + t.offsetTop,
      }),
        (t._own.size = {
          x: t.offsetWidth,
          y: t.offsetHeight,
        });
    });
  };

  this.getDim();

  this.floatText = function () {
    this.textSpans.forEach(function (t, i) {
      if (
        t._own.pos.x + t._own.real.x < that.bounds.min.x ||
        t._own.pos.x + t._own.real.x + t._own.size.x > that.bounds.max.x
      )
        t._own.dir.x *= -1;

      if (
        t._own.pos.y + t._own.real.y < that.bounds.min.y ||
        t._own.pos.y + t._own.real.y + t._own.size.y > that.bounds.max.y
      )
        t._own.dir.y *= -1;

      var checker = that.pointInCircle(t._own.real, {
        x: that.mouse.x,
        y: that.mouse.y,
      });

      // console.log(checker[0]);
      if (checker[0] == that.invert) {
        t.style.color = "rgba(255,255,255,.6)";
        t._own.speed.x = 2;
        t._own.speed.y = 2;
        t._own.resetTime = 0;
        t._own.pos.x += t._own.vel.x * t._own.speed.x * t._own.dir.x;
        t._own.pos.y += t._own.vel.y * t._own.speed.y * t._own.dir.y;
        t.style.transform =
          "translateX(" +
          t._own.pos.x +
          "px) translateY(" +
          t._own.pos.y +
          "px)";
      } else {
        t.style.color = t._own.old_color;
        if (t._own.pos.x != 0 && t._own.pos.y != 0 && t._own.resetTime !== 10) {
          t._own.resetTime++;

          var x = that.lerp(t._own.pos.x, 0, t._own.resetTime / 10);
          var y = that.lerp(t._own.pos.y, 0, t._own.resetTime / 10);

          t.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
        }
      }
    });
  };
  this.update = function () {
    if (this.animate) {
      this.floatText();
    }
  };

  window.addEventListener("mousemove", function (event) {
    that.mouse.x = event.clientX;
    that.mouse.y = event.clientY;
  });
  window.addEventListener("touchmove", function (event) {
    that.mouse.x = event.touches[0].clientX;
    that.mouse.y = event.touches[0].clientY;
  });

  window.onresize = function () {
    that.getDim();
  };
}
var paragraph = new EscapingText("effect");

var render = function (time) {
  requestAnimationFrame(render);
  animation(time);
};

//__________ animation

function animation(time) {
  paragraph.update();
}

//__________

render(time);
