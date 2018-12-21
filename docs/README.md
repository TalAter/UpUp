

<!-- Start src/upup.js -->

# Quick Start

The quickest way to get started is to visit the [UpUp homepage](https://www.talater.com/upup/).

Next, you'll want to experiment with the [Getting Started with Offline First using UpUp tutorial](https://www.talater.com/upup/getting-started-with-offline-first.html).

Once you're ready for a more in-depth look at the UpUp API, read on.

# Good to Know

## Service Worker

At the heart of UpUp are *service workers* - a new web technology, which allows developers to take control and shape user's requests to their server.

While UpUp abstracts much of service workers' complexity, their browser compatibility issues, and flattens the learning curve, there are a few things to be aware of.

### HTTPS only

Service workers, and thus UpUp, only work when the user is accessing your server over a secure connection.

During development you can also use UpUp through localhost (e.g. http://localhost/ or http://localhost:1234/)

### Scope

UpUp can only serve offline content for requests within its scope. The scope is determined by where you placed the `upup.min.js` and `upup.sw.min.js` files.

This means that if you placed the files in your `/js/` directory, UpUp will only be able to show your offline content when users try to look inside the `/js/` directory.

**This is why you should almost always place the script as close to the root of your site as possible (e.g. https://www.talater.com/upup.min.js).**

#### Scope - Advanced
It is possible to keep `upup.min.js` outside the scope (e.g. in a CDN), as long as `upup.sw.min.js` is kept local (that file's location determines the scope).
If you choose to keep the two in separate directories, make sure to pass the `service-worker-url` [setting](https://github.com/TalAter/UpUp/tree/master/docs#settings).
````html
<script src="//cdnjs.cloudflare.com/ajax/libs/UpUp/1.1.0/upup.min.js"></script>
<script>
UpUp.start({
  'content-url': 'offline.html',
  'assets': ['/img/logo.png', '/css/style.css', 'headlines.json'],
  'service-worker-url': '/upup.sw.min.js'
});
</script>
````

It is also possible to modify the scope that UpUp will control by using the [scope setting](https://github.com/TalAter/UpUp/tree/master/docs#settings). Note that this scope must be contained at the same level as the service worker file, or deeper.

e.g., If `upup.sw.min.js` is located at the root of your site you can limit the scope to the root (default behavior) or a subdirectory under it. If `upup.sw.min.js` is located in a subdirectory you can limit the scope to that subdirectory (default behavior), a subdirectory within the first subdirectory, but not a different subdirectory under the root, or the root.

### Cache Versions

When users visit your page, UpUp stores the files needed to display the offline content in their cache.

When you make a change to your offline site, these files need to be downloaded again, and updated in the cache.

This cache update happens automatically everytime you change the value of `content`, `content-url`, or `assets` (e.g. changing `content-url` from `offline-v1.html` to `offline-v2.html`).

If you changed the content of one of those files, but none of the filenames changed, you may want to manually tell UpUp to update the cache anyway. For this purpose you can use a `cache-version`.

For example, consider the following:

````javascript
UpUp.start({
  'content-url': '/offline.html',
  'assets': ['/img/logo.png']
});
````

If you were to add another file to the `assets` array, UpUp would know it had to download and store a new cache. If however, the change is within the contents of `/offline.html` you will need to signal UpUp that it needs to update the cache by changing the `cache-version`:

````javascript
UpUp.start({
  'cache-version': 'v2',
  'content-url': '/offline.html',
  'assets': ['/img/logo.png']
});
````

Everytime you change the value of `cache-version`, all the files needed to display the offline content will download again and be saved in the user's cache.

## Settings

UpUp can be configured either by calling addSettings() with a settings object, or by passing the
same settings object directly to the start() method.

#### Examples:
````javascript
// Set up offline mode with a basic message
UpUp.addSettings({ content: 'Cannot reach site. Please check your internet connection.' });
UpUp.start();

// The same thing can be achieved like this
UpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });
````

The settings object supports the following options:
- `content-url`        (String)  The content to display when user is offline (url to the content that will be served)
- `content`            (String)  The content to display when user is offline (plain text, HTML, etc.)
- `assets`             (Array)   Array of assets to cache for offline access
- `cache-version`      (String|Number) Optional version number, change this when offline files change. UpUp will download and cache all content-url and assets files again
- `service-worker-url` (String)  The url to the service worker file (`upup.sw.min.js`)
                                 Allows loading `upup.min.js` from a CDN while `upup.sw.min.js` stays local (see [scope](https://github.com/TalAter/UpUp/blob/master/docs/README.md#scope))
- `scope`              (String)  The scope to limit the service worker to (see [scope](https://github.com/TalAter/UpUp/blob/master/docs/README.md#scope))

# API Reference

## start([settings])

Make this site available offline

Can receive a settings object directly, or be configured by running addSettings() first.
See Settings section of docs for details.

#### Examples:
````javascript
// Set up offline mode with a basic message
UpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });

// Set up offline mode with the settings defined previously via addSettings()
UpUp.start();
````

### Params:

* **Object** *[settings]* - Settings for offline mode

## addSettings([settings])

Adds settings to configure how UpUp behaves.
Call this before running start, or just pass the settings object when calling the start method.

Receives a mandatory settings object. See Settings section of docs for details.

#### Examples:
````javascript
// Set up offline mode with a basic message
UpUp.addSettings({ content: 'Cannot reach site. Please check your internet connection.' });
UpUp.start();

// The same thing can be achieved like this
UpUp.start({ content: 'Cannot reach site. Please check your internet connection.' });
````

See: [Settings](#settings)

### Params:

* **Object** *[settings]* - Settings for offline mode

## debug([newState=true])

Turn on or off the output of debug messages to the console.
Don't pass any parameters to turn on, or pass a boolean to explicitly set
debug state on or off.

### Params:

* **Boolean** *[newState=true]* - Turn on/off debug messages

<!-- End src/upup.js -->

