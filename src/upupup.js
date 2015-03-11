//! UpUpUp
//! version : 0.1.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://github.com/TalAter/UpUpUp

(function (undefined) {
  "use strict";

  // Save a reference to the global object (window in the browser)
  var _root = this;

  // get ServiceWorker object
  var _sw = navigator.serviceWorker;

  // Check browser support
  // This is done as early as possible, to make it as fast as possible for unsupported browsers
  if (!_sw) {
    _root.UpUpUp = null;
    return undefined;
  }

  // Expose functionality
  _root.UpUpUp = {
  };

}).call(this);