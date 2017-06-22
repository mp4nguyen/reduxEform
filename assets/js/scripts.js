var $ = jQuery.noConflict();

$(function() {
    'use strict';
    // Check mobile
    var isMobile = false;
    if ((/Mobile|Android|webOS|iP(hone|ad|od)|BlackBerry|IEMobile|Opera M(ob|in)i|Windows Phone/i.test(navigator.userAgent))) {
        isMobile = true;
    }

});


$(document).ready(function($) {
    // $.material.init()
    $('#responsive-example-table').stacktable();

    //handle booking buttons

    $("#booking-section-1").click(function() {
        $(".section-right.section-1").addClass("display-none");
        $(".section-right.section-2").removeClass("display-none");
        $(".tree-section-1").css("background-image","url(../images/booking/tree-2.png)");
    });
    $("#booking-section-2").click(function() {
        $(".section-right.section-2").addClass("display-none");
        $(".section-right.section-3").removeClass("display-none");
        $(".tree-section-1").css("background-image","url(../images/booking/tree-3.png)");
    });
    $("#booking-section-3").click(function() {
        $(".section-right.section-3").addClass("display-none");
        $(".section-right.section-4").removeClass("display-none");
        $(".tree-section-1").css("background-image","url(../images/booking/tree-4.png)");
    });
    $("#booking-section-4").click(function() {
        $(".section-right.section-4").addClass("display-none");
        $(".section-right.section-5").removeClass("display-none");
        $(".tree-section-1").css("background-image","url(../images/booking/tree-5.png)");
    });
    $("#booking-section-5").click(function() {
        $(".section-right.section-5").addClass("display-none");
        $(".section-right.section-6").removeClass("display-none");
        $(".tree-section-1").css("background-image","url(../images/booking/tree-final.png)");
    });
    $("#booking-section-6").click(function() {
        alert("Completed");
    });


});

$(window).load(function() {
    'use strict';
    //$(".loader").fadeOut("slow");
    //$(".loader").remove();


});

/* Modal JS */
