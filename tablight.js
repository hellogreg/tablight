(function () {

  "use strict";

  // TODO: Instead of having a separate CSS file, create the CSS styles in this JS file
  //

  function tablight() {

    // Document elements and element arrays, prefixed with $.
    // (We're not using jQuery, but the $ style is familiar.)
    var $main = document.querySelector("main");
    var $navTabs = document.getElementsByClassName("tab-nav")[0];
    var $allTabButtons = $navTabs.getElementsByClassName("tab-button");
    var $allTabs = $main.getElementsByClassName("tab");


    // Hide all tabs, unless a param is sent to ignore the first one (e.g., on page load).
    function hideTabs(showFirstTab) {
      var i = showFirstTab ? 1 : 0;
      var len = $allTabs.length;
      for (; i < len; i++) {
        $allTabs[i].classList.add("invisible");
      }
    }

    // Deselct all tab buttons. Done whenever a button is clicked, before selecting the new one.
    function deselectAllTabButtons() {
      var i = 0, len = $allTabButtons.length;
      for (; i < len; i++) {
        $allTabButtons[i].classList.remove("selected");
      }
    }


    // Self-executing init. Show the first tab on the page, hide the others, and start tab button event listener.
    (function () {
      var tabButtonLen = $allTabButtons.length;
      var showFirstTab = true;
      if (tabButtonLen > 0) {

        $allTabButtons[0].classList.add("selected");
        hideTabs(showFirstTab);

        // If there are multiple tabs, start event listener for all tab display buttons.
        if (tabButtonLen > 1) {

          $navTabs.addEventListener("click", function (e) {

            var $target = e.target || e.srcElement;
            var activeTabName = $target.getAttribute("data-section");
            e.preventDefault();

            if (activeTabName) {
              hideTabs();
              deselectAllTabButtons();
              document.getElementById(activeTabName).classList.remove("invisible");
              $target.classList.add("selected");
            }
          }, false);

        }

      }
    }());

  }

  // Quickie DOM readiness check to initialize Tablight.
  if (!!(window.addEventListener)) {
    window.addEventListener("DOMContentLoaded", tablight);
  } else {
    window.attachEvent("onload", tablight);
  }

}());
