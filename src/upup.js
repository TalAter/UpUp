//! UpUp
//! version : 0.0.1
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://github.com/TalAter/UpUp

(function (undefined) {
  "use strict";

  /**
   * # Quick Start
   *
   * The quickest way to get started is to visit the [UpUp homepage](https://github.com/TalAter/UpUp).
   *
   * For a more in-depth look at UpUp, read on.
   *
   * # Good to Know
   *
   * ## Settings
   *
   * UpUp can be configured either by calling addSettings() with a settings object, or by passing the
   * same settings object directly to the start() method.
   *
   * #### Examples:
   *     // Set up offline mode with a basic message
   *     UpUp.addSettings({ content: 'Cannot reach site. Please check your internet connection.' });
   *     UpUp.start();
   *
   *     // The same thing can be achieved like this
   *     UpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });
   *
   *
   * The settings object supports the following options:
   * - `content-url`  (String) The content to display when user is offline (url to the content that will be served)
   * - `content`      (String) The content to display when user is offline (plain text, HTML, etc.)
   * - `assets`       (Array)  Array of assets to cache for offline access
   *
   * # API Reference
   */

  // Save a reference to the global object (window in the browser)
  var _root = this;

  // get ServiceWorker object
  var _serviceWorker = navigator.serviceWorker;

  // Check browser support
  // This is done as early as possible, to make it as fast as possible for unsupported browsers
  // Requires ServiceWorker and IndexedDB
  if (!_serviceWorker || !_root.indexedDB) {
    _root.UpUp = null;
    return undefined;
  }

  // Settings live here, and these are their defaults
  var _settings = {
    'script': 'upup.sw.min.js'
  };

  var _debugState = false;
  var _debugStyle = 'font-weight: bold; color: #00f;';

  // Expose functionality
  _root.UpUp = {

    /**
     * Make this site available offline
     *
     * Can receive a settings object directly, or be configured by running addSettings() first.
     * See Settings section of docs for details.
     *
     * #### Examples:
     *     // Set up offline mode with a basic message
     *     UpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });
     *
     *     // Set up offline mode with the settings defined previously via addSettings()
     *     UpUp.start();
     *
     * @param {Object} [settings] - Settings for offline mode
     * @method start
     */
    start: function(settings) {
      this.addSettings(settings);

      // register the service worker
      _serviceWorker.register(_settings.script, {scope: './'}).then(function(registration) {
        // Registration was successful
        if (_debugState) {
          console.log('ServiceWorker registration successful with scope: %c'+registration.scope, _debugStyle);
        }

        // Send the settings to the ServiceWorker
        var messenger = registration.installing || _serviceWorker.controller;
        messenger.postMessage({'action': 'set-settings', 'settings': _settings});

      }).catch(function(err) {
        // registration failed :(
        if (_debugState) {
          console.log('ServiceWorker registration failed: %c'+err, _debugStyle);
        }
      });
    },

    /**
     * Adds settings to configure how UpUp behaves.
     * Call this before running start, or just pass the settings object when calling the start method.
     *
     * Receives a mandatory settings object. See Settings section of docs for details.
     *
     * #### Examples:
     *     // Set up offline mode with a basic message
     *     UpUp.addSettings({ content: 'Cannot reach site. Please check your internet connection.' });
     *     UpUp.start();
     *
     *     // The same thing can be achieved like this
     *     UpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });
     *
     * @param {Object} [settings] - Settings for offline mode
     * @method addSettings
     * @see [Settings](#settings)
     */
    addSettings: function(settings) {
      settings = settings || {};

      // if we got a string, instead of a settings object, use that string as the content
      if (typeof settings === 'string') {
        settings = {'content': settings};
      }

      // add new settings to our settings object
      ['content', 'content-url', 'assets'].forEach(function(settingName) {
        _settings[settingName] = settings[settingName] || null;
      });
    },

    /**
     * Turn on or off the output of debug messages to the console.
     * Don't pass any parameters to turn on, or pass a boolean to control debug state.
     *
     * @param {Boolean} [newState=true] - Turn on/off debug messages
     * @method debug
     */
    debug: function(newState) {
      if (arguments.length > 0) {
        _debugState = !!newState;
      } else {
        _debugState = true;
      }
    }

  };

}).call(this);
