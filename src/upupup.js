//! UpUpUp
//! version : 0.0.1
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

    /**
     * Make this site available offline
     *
     * Can receive a settings object directly, or be configured by running addSettings() first.
     * See Settings section of docs for details.
     * - `content`      (String) The content to display when user is offline.
     *
     * ### Examples:
     *     // Set up offline mode with a basic message
     *     UpUpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });
     *
     *     // Set up offline mode with the settings defined previously via addSettings()
     *     UpUpUp.start();
     *
     * @param {Object} [settings] - Settings for offline mode
     * @method start
     */
    start: function(settings) {
      this.addSettings(settings);
    },

    /**
     * Adds settings to configure how UpUpUp behaves.
     * Call this before running start, or just pass the settings object when calling the start method.
     *
     * Receives a mandatory settings object. See Settings section of docs for details.
     *
     * ### Examples:
     *     // Set up offline mode with a basic message
     *     UpUpUp.addSettings({ content: 'Cannot reach site. Please check your internet connection.' });
     *     UpUpUp.start();
     *
     *     // The same thing can be achieved like this
     *     UpUpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });
     *
     * @param {Object} [settings] - Settings for offline mode
     * @method addSettings
     * @see [Settings](#settings)
     */
    addSettings: function(settings) {
      settings = settings || {};
    }

  };

}).call(this);

/**
 * # Good to Know
 *
 * ## Settings
 *
 * UpUpUp can be configured either by calling addSettings() with a settings object, or by passing the
 * same settings object directly to the start() method.
 *
 * ### Examples:
 *     // Set up offline mode with a basic message
 *     UpUpUp.addSettings({ content: 'Cannot reach site. Please check your internet connection.' });
 *     UpUpUp.start();
 *
 *     // The same thing can be achieved like this
 *     UpUpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });
 *
 *
 * The settings object supports the following options:
 * - `content`      (String) The content to display when user is offline.
 */