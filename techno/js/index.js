var elem = $(".bar");
var count = elem.length;

var loop = function () {
  setTimeout(function () {
    elem.each(function () {
      var $this = $(this);
      var height = Math.random() * 200 + 1;
      $this.css({
        background:
          "rgba(44, 0, " +
          Math.random() * 200 +
          1 +
          "," +
          (0.9 - $this.index() / count / 2) +
          ")",
        bottom: height,
        height: height,
      });
    });
    loop();
  }, 300);
};

loop();

$(window).on("load", function () {
  $(".loader").fadeOut();
  $("#preloder").delay(200).fadeOut("slow");
});
