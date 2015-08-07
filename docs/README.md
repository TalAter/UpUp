

<!-- Start src/upup.js -->

# Quick Start

The quickest way to get started is to visit the [UpUp homepage](https://www.talater.com/upup/).

Next, you'll want to experiment with the [Getting Started with Offline First using UpUp tutorial](https://www.talater.com/upup/getting-started-with-offline-first.html).

Once you're ready for a more in-depth look at the UpUp API, read on.

# Good to Know

## ServiceWorker

ServiceWorkers are at the heart of UpUp.

While UpUp abstracts much of the complexity and browsers compatibility issues, there are a few things to be aware of.

### HTTPS only

ServiceWorkers, and thus UpUp, only work when the user is accessing your server over a secure connection.

During development you can also use UpUp through localhost or file (e.g. both http://localhost/ and file:///Users/tal/index.html are ok)

### Scope
UpUp can serve offline content for any request within its scope. The scope is determined by where you placed the `upup.min.js` and `upup.sw.min.js` files.

This means that if you placed the files in your /js/ directory, UpUp will only be able to show your offline content when users try to look at the /js/ directory. This is why you should always place the script as close to the root of your site as possible (e.g. https://www.talater.com/upup.min.js).

## Settings

UpUp can be configured either by calling addSettings() with a settings object, or by passing the
same settings object directly to the start() method.

#### Examples:
    // Set up offline mode with a basic message
    UpUp.addSettings({ content: 'Cannot reach site. Please check your internet connection.' });
    UpUp.start();

    // The same thing can be achieved like this
    UpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });

The settings object supports the following options:
- `content-url`  (String) The content to display when user is offline (url to the content that will be served)
- `content`      (String) The content to display when user is offline (plain text, HTML, etc.)
- `assets`       (Array)  Array of assets to cache for offline access

# API Reference

## start([settings])

Make this site available offline

Can receive a settings object directly, or be configured by running addSettings() first.
See Settings section of docs for details.

#### Examples:
    // Set up offline mode with a basic message
    UpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });

    // Set up offline mode with the settings defined previously via addSettings()
    UpUp.start();

### Params:

* **Object** *[settings]* - Settings for offline mode

## addSettings([settings])

Adds settings to configure how UpUp behaves.
Call this before running start, or just pass the settings object when calling the start method.

Receives a mandatory settings object. See Settings section of docs for details.

#### Examples:
    // Set up offline mode with a basic message
    UpUp.addSettings({ content: 'Cannot reach site. Please check your internet connection.' });
    UpUp.start();

    // The same thing can be achieved like this
    UpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });

See: [Settings](#settings)

### Params:

* **Object** *[settings]* - Settings for offline mode

## debug([newState=true])

Turn on or off the output of debug messages to the console.
Don't pass any parameters to turn on, or pass a boolean to control debug state.

### Params:

* **Boolean** *[newState=true]* - Turn on/off debug messages

<!-- End src/upup.js -->

