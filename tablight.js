(function () {

  "use strict";

  // TODO: Instead of having a separate CSS file, inject and apply the required CSS styles with this JS file
  // Resources...
  // http://davidwalsh.name/add-rules-stylesheets
  // http://stackoverflow.com/questions/15505225/inject-css-stylesheet-as-string-using-javascript
  // http://stackoverflow.com/questions/1720320/how-to-dynamically-create-css-class-in-javascript-and-apply

  function tablight() {

    // Document elements and element arrays, prefixed with $.
    // (We're not using jQuery, but the $ style is familiar.)
    var $tabNav = document.getElementsByClassName("tab-nav")[0];
    var $allTabButtons = $tabNav.getElementsByClassName("tab-button");
    var $allTabs = document.getElementsByClassName("tab");


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

    function initTabListener() {
      $tabNav.addEventListener("click", function (e) {

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

    // Self-executing init. Show the first tab on the page, hide the others, and start tab button event listener.
    (function () {
      var tabButtonLen = $allTabButtons.length;
      var showFirstTab = true;
      if (tabButtonLen > 0) {

        $allTabButtons[0].classList.add("selected");
        hideTabs(showFirstTab);

        // If there are multiple tabs, start event listener.
        if (tabButtonLen > 1) {
          initTabListener();
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
