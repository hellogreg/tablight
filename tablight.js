(function () {

  "use strict";

  function tablight() {

    // Document elements and element arrays, prefixed with $.
    // (We're not using jQuery, but the $ style is familiar.)
    var $tabNav = document.getElementsByClassName("tab-nav")[0];
    var $allTabButtons = $tabNav.getElementsByClassName("tab-button");
    var $allTabs = document.getElementsByClassName("tab");

    // Max # of pixels for what we consider a non-desktop, non-tablet mobile device.
    var maxMobileWidth = 600;

    // Instead of having a separate CSS file, inject and apply the required CSS styles with this JS file
    // I'd still use the CSS file for myself, but for public use, might be better if all were in one file.
    // If you'd rather use tablight.css, don't call this function and uncomment the CSS in that file.
    //
    // Resources...
    // http://davidwalsh.name/add-rules-stylesheets
    // http://yuiblog.com/blog/2007/06/07/style/
    // http://stackoverflow.com/questions/15505225/inject-css-stylesheet-as-string-using-javascript
    // http://stackoverflow.com/questions/1720320/how-to-dynamically-create-css-class-in-javascript-and-apply
    function injectDocumentStyles () {
      var styleElement = document.createElement("style");
      styleElement.type = "text/css";

      var styles = [];

      styles.push("@media screen and (min-width: " + (maxMobileWidth + 1) + "px) {");
      styles.push(".hidden-tab { display: none; }");
      styles.push(".tab-nav ul {border-bottom: 1px solid #ddd;font-family: sans-serif;font-size: .625rem;line-height: 1.25rem;list-style: none;padding: 0;text-transform: uppercase;}");
      styles.push(".tab-nav ul li {display: inline;margin-right: .25rem;}");
      styles.push(".tab-nav .tab-button {background: #eee;border-radius: .25rem .25rem 0 0;color: #555;padding: .25rem .375rem;text-decoration: none;}");
      styles.push("@-moz-document url-prefix() {.tab-nav .tab-button {padding: .3rem .375rem;}}");
      styles.push(".tab-nav .tab-button.selected {background: #ddd;color: #444;}");
      styles.push(".tab-nav .tab-button:hover {background: #ccc;color: #333;}");
      styles.push(".tab {border-bottom: 1px solid #ddd;padding: 1rem;}");
      styles.push("}");

      var stylesheet = styles.join("\n");

      console.log(stylesheet);

      styleElement.appendChild(document.createTextNode(stylesheet));
      document.head.appendChild(styleElement);
    }

    // Hide all tabs, unless a param is sent to ignore the first one (e.g., on page load).
    function hideTabs(showFirstTab) {
      var i = showFirstTab ? 1 : 0;
      var len = $allTabs.length;
      for (; i < len; i++) {
        $allTabs[i].classList.add("hidden-tab");
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
        var targetTabAnchorName = $target.getAttribute("href").slice(1);
        var $targetTab = document.getElementsByName(targetTabAnchorName)[0].parentElement;
        console.log($targetTab);

        // Only act if a valid tab button was clicked and we're in a browser window wide enough to use tabs.
        // We check the latter every time, in case the window width has changed since loading.
        if ($targetTab && (window.innerWidth > maxMobileWidth)) {
          e.preventDefault();
          hideTabs();
          deselectAllTabButtons();
          $targetTab.classList.remove("hidden-tab");
          $target.classList.add("selected");
        }
      }, false);
    }

    // Self-executing init. Show the first tab on the page, hide the others, and start tab button event listener.
    (function () {
      var tabButtonLen = $allTabButtons.length;
      var showFirstTab = true;
      if (tabButtonLen > 0) {

        injectDocumentStyles();
        $allTabButtons[0].classList.add("selected");
        hideTabs(showFirstTab);

        // If there are multiple tabs, start event listener.
        if (tabButtonLen > 1) {
          initTabListener();
        }
      }
    }());

  }

  // Quickie DOM readiness check to initialize widget.
  if (!!(window.addEventListener)) {
    window.addEventListener("DOMContentLoaded", tablight);
  } else {
    window.attachEvent("onload", tablight);
  }

}());
