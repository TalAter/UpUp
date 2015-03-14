

<!-- Start src/upup.js -->

# Quick Start

The quickest way to get started is to visit the [UpUp homepage](https://github.com/TalAter/UpUp).

For a more in-depth look at UpUp, read on.

# Good to Know

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
- `content`      (String) The content to display when user is offline.

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

