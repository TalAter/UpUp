//! UpUp
//! version : 0.1.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://github.com/TalAter/UpUp

(function (undefined) {
  "use strict";

  /**
   * # Quick Start
   *
   * The quickest way to get started is to visit the [UpUp homepage](https://www.talater.com/upup/).
   *
   * Next, you'll want to experiment with the [Getting Started with Offline First using UpUp tutorial](https://www.talater.com/upup/getting-started-with-offline-first.html).
   *
   * Once you're ready for a more in-depth look at the UpUp API, read on.
   *
   * # Good to Know
   *
   * ## ServiceWorker
   *
   * At the heart of UpUp are ServiceWorkers - a new web technology, which allows developers to take control and shape user's requests to their server.
   *
   * While UpUp abstracts much of ServiceWorkers' complexity, browser compatibility issues and flattens the learning curve, there are a few things to be aware of.
   *
   * ### HTTPS only
   *
   * ServiceWorkers, and thus UpUp, only work when the user is accessing your server over a secure connection.
   *
   * During development you can also use UpUp through localhost or file (e.g. both http://localhost/ and file:///Users/tal/index.html are ok)
   *
   * ### Scope
   * UpUp can only serve offline content for requests within its scope. The scope is determined by where you placed the `upup.min.js` and `upup.sw.min.js` files.
   *
   * This means that if you placed the files in your `/js/` directory, UpUp will only be able to show your offline content when users try to look inside the `/js/` directory.
   *
   * **This is why you should always place the script as close to the root of your site as possible (e.g. https://www.talater.com/upup.min.js).**
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
  // Requires ServiceWorker
  if (!_serviceWorker) {
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
        if (messenger) {
          messenger.postMessage({'action': 'set-settings', 'settings': _settings});
        }
      }).catch(function(err) {
        // registration failed :(
        if (_debugState) {
          console.error('ServiceWorker registration failed: %c'+err, _debugStyle);
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

      // default settings
      var defaultSettings = {
        'content-url': _root.location ? _root.location.href : null, // get the current window location url
        'cache-ttl': 60 * 60 * 24 // 1 day default TTL
      };

      // add new settings to our settings object
      ['content', 'content-url', 'assets', 'cache-ttl'].forEach(function(settingName) {
        _settings[settingName] = settings[settingName] || (defaultSettings[settingName] || null);
      });

      _settings['cache-ttl'] = parseInt(_settings['cache-ttl'], 10);
    },

    /**
     * Turn on or off the output of debug messages to the console.
     * Don't pass any parameters to turn on, or pass a boolean to explicitly set
     * debug state on or off.
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
