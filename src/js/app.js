!(function($, e, a, t) {
  function n(e, a) {
    var t = p.width(),
      n = t,
      o = p.height(),
      i = $("nav .menu ul");
    if (((g = p.width() / (p.width() < 960 ? 1 : 2)), c(g * f, m), t > 960))
      var n = 0.5 * t;
    d.css("height", o + "px"),
      d.css("width", n + "px"),
      i.css("marginTop", o / 2 - 60 + "px"),
      $("html").hasClass("lt-ie10") &&
        ($(".wrapper").css("height", t + "px"),
        $(".wrapper").css("width", t + "px"));
  }
  function o(e, a, t, n, o) {
    imgs.swipe({ triggerOnTouchEnd: !0, swipeStatus: i });
  }
  function i(e, a, t, n, o) {
    if (
      ((g = p.width() / (p.width() < 960 ? 1 : 2)),
      "move" !== a || ("left" !== t && "right" !== t))
    )
      "cancel" === a
        ? c(g * f, m)
        : "end" === a && ("right" === t ? s() : "left" === t && l());
    else {
      var i = 0;
      "left" === t ? c(g * f + n, i) : "right" === t && c(g * f - n, i);
    }
    r();
  }
  function r() {
    var e = f + 1;
    $("nav .context ul li").removeClass("active");
    $("nav .context ul li:nth-child( " + e + " )").addClass("active");
    $("nav .context a.compter").html(f + 1 + "/" + k);
  }
  function s() {
    (f = Math.max(f - 1, 0)),
      c(g * f, m),
      history.pushState(null, null, "#/" + f + "/");
  }
  function l() {
    (f = Math.min(f + 1, k - 1)),
      c(g * f, m),
      history.pushState(null, null, "#/" + f + "/");
  }
  function c(e, a) {
    var t = (0 > e ? "" : "-") + Math.abs(e).toString();
    $("html").hasClass("lt-ie10")
      ? imgs.animate({ left: t + "px" })
      : (imgs.css("-webkit-transition-duration", (a / 1e3).toFixed(1) + "s"),
        imgs.css("-webkit-transform", "translate3d(" + t + "px,0px,0px)"),
        imgs.css("-moz-transform", "translate3d(" + t + "px,0px,0px)"),
        imgs.css("-ms-transform", "translate3d(" + t + "px,0px,0px)"),
        imgs.css("-o-transform", "translate3d(" + t + "px,0px,0px)"),
        imgs.css("transform", "translate3d(" + t + "px,0px,0px)"));
  }
  var p = $(e),
    u = $(this),
    d = $(".box"),
    h = p.width(),
    f = 0,
    m = 500,
    v = e.location.pathname,
    imgs;
  if (
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? (imgs = $(".box"))
      : (imgs = $(".container")),
    h > 960)
  )
    var b = 0.5 * h;
  !(function($, e) {
    var a = function(e, a, t) {
      var n;
      return function o() {
        function o() {
          t || e.apply(i, r), (n = null);
        }
        var i = this,
          r = arguments;
        n ? clearTimeout(n) : t && e.apply(i, r), (n = setTimeout(o, a || 500));
      };
    };
    jQuery.fn[e] = function(t) {
      return t ? this.bind("resize", a(t)) : this.trigger(e);
    };
  })(jQuery, "smartresize"),
    p.smartresize(function() {
      n(), $(".box").perfectScrollbar("update");
    });
  var h = p.width(),
    b = h,
    g = 0.5 * b,
    k = $('.box').length;
  if (960 > h)
    var g = b,
      k = 8;
  $(a).keyup(function(e) {
    switch (e.keyCode) {
      case 37:
        s();
        break;
      case 39:
        l();
    }
    r();
  }),
    $("nav .context ul").delegate("li", "click", function() {
      var e = $(this).index();
      c(g * e, m),
        history.pushState(null, null, "#/" + e + "/"),
        (f = Math.max(e, 0)),
        r(),
        $("body").removeClass("modal-open");
    }),
    $("a.next").click(function(e) {
      l(), r(), $("body").removeClass("modal-open"), e.preventDefault();
    }),
    $("a.prev").click(function(e) {
      s(), r(), $("body").removeClass("modal-open"), e.preventDefault();
    }),
    p.bind("popstate", function(a) {
      var t = e.location.hash,
        n = t.replace("#/", "").slice(0, -1);
      (f = Math.max(n, 0)), f > k && (f = k - 1), c(g * f, m), r();
    });
  var y = (function() {
    var t = {},
      n,
      o,
      i;
    return (
      (t.center = function() {
        var a, t;
        (a = Math.max($(e).height() - o.outerHeight(), 0) / 2),
          (t = Math.max($(e).width() - o.outerWidth(), 0) / 2),
          o.css({ top: a + $(e).scrollTop(), left: t + $(e).scrollLeft() });
      }),
      (t.open = function(a) {
        i.empty().append(a.content),
          o.css({ width: a.width || "auto", height: a.height || "auto" }),
          t.center(),
          $(e).bind("resize.modal", t.center),
          o.show(),
          n.show(),
          $("body").addClass("modal-open");
      }),
      (t.close = function() {
        o.hide(),
          n.hide(),
          i.empty(),
          $(e).unbind("resize.modal"),
          $("body").removeClass("modal-open");
      }),
      (n = $('<div id="overlay"></div>')),
      (o = $('<div id="modal"></div>')),
      (i = $('<div id="content"></div>')),
      o.hide(),
      n.hide(),
      o.append(i),
      $(a).ready(function() {
        $("body").append(n, o);
      }),
      n.click(function(e) {
        t.close(), e.preventDefault();
      }),
      n.swipe(function(e) {
        t.close();
      }),
      $("nav .context ul, a.prev, a.next").click(function(e) {
        t.close();
      }),
      $(a).keyup(function(e) {
        switch (e.keyCode) {
          case 37:
            t.close();
            break;
          case 39:
            t.close();
            break;
          case 27:
            t.close();
        }
      }),
      t
    );
  })();
    $("a.company").click(function(e) {
      e.preventDefault(),
        y.open({
          content:
            "<p>Bacon ipsum dolor sit amet cow pork chop tri-tip pork belly jerky. Tenderloin pork beef ribs ball tip, meatball pancetta landjaeger andouille biltong filet mignon sausage. Chuck turducken kielbasa ball tip pork belly hamburger drumstick andouille short loin brisket tail ground round. Venison frankfurter beef leberkas pork loin turducken cow. Ham spare ribs swine short ribs biltong, hamburger kielbasa cow meatball sirloin tri-tip meatloaf tongue salami. Ham hock biltong kielbasa, turkey shankle landjaeger turducken. Leberkas ground round flank prosciutto pig capicola.</p>"
        }),
        $("body").removeClass("nav-open");
    }),
    $("a.switch").click(function(e) {
      e.preventDefault(), $("body").toggleClass("nav-open");
    }),
    $("a.japanese").click(function(a) {
      var t = e.location.pathname,
        n = e.location.hash,
        o = t.replace("/en/", "/ja/").replace("/fr/", "/ja/") + n;
      (e.location.href = o),
        $("body").removeClass("nav-open"),
        a.preventDefault();
    }),
    $("a.francais").click(function(a) {
      var t = e.location.pathname,
        n = e.location.hash,
        o = t.replace("/en/", "/fr/").replace("/ja/", "/fr/") + n;
      (e.location.href = o),
        $("body").removeClass("nav-open"),
        a.preventDefault();
    }),
    $("a.english").click(function(a) {
      var t = e.location.pathname,
        n = e.location.hash,
        o = t.replace("/ja/", "/en/").replace("/fr/", "/en/") + n;
      (e.location.href = o),
        $("body").removeClass("nav-open"),
        a.preventDefault();
    }),
    $(e).load(function() {
      var e = localStorage.getItem("visits");
      $(".preloader-background")
        .delay(200)
        .fadeOut(500, function() {
          $(this).remove();
        });
    }),
    $(a).ready(function() {
      n(), o();
      var a = e.location.hash,
        t = a.replace("#/", "").slice(0, -1);
      (f = Math.max(t, 0)),
        f > k && (f = k - 1),
        c(g * f, m),
        r(),
        $(".text").perfectScrollbar({ suppressScrollX: !0 });
    });
})(jQuery, window, document);
