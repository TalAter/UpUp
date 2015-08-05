<a href="https://www.talater.com/upup"><img align="right" src="demo/img/upup-readme.gif" alt="Offline-First with UpUp"></a>
### UpUp

#### Make sure your site is always up

A tiny javascript library that makes sure your users can always access your site's content, even when they're on a plane, in an elevator, or 20,000 leagues under the sea.

With just 1 line of code, you can control the content your users see, even when they are offline.

### Demo & Tutorial
[Play with some live demos](https://www.talater.com/upup)

### Hello World
It's as easy as adding two javascript files to your site, [upup.min.js](https://raw.githubusercontent.com/TalAter/UpUp/master/dist/upup.min.js) & [upup.sw.min.js](https://raw.githubusercontent.com/TalAter/UpUp/master/dist/upup.sw.min.js), and defining the content you want your users to see when they are offline.
For example:
````html
<script src="/upup.min.js"></script>
<script>
UpUp.start({
  'content-url': 'offline.html',
  'assets': ['/img/logo.png', '/css/style.css', 'headlines.json']
});
</script>
````
**Check out some [live demos and advanced samples](https://www.talater.com/upup), then read the full [API Docs](https://github.com/TalAter/UpUp/blob/master/docs/README.md).**

### HTTPS Requirement
UpUp requires a secure connection to your site (this is a requirement of ServiceWorkers). So make sure your users visit your site over HTTPS (an SSL certificate can be as cheap as $5).

### Browser Support
UpUp works in any browser that supports ServiceWorkers - [Is ServiceWorker ready?](https://jakearchibald.github.io/isserviceworkerready/)

### Technical Documentation and API
[Docs and full API reference](https://github.com/TalAter/UpUp/blob/master/docs/README.md)

### UpUp is currently under heavy construction!
Feel free to **Star** and **Watch** it, but watch out for falling debris, and a wildly changing API.

### Author
Tal Ater: [@TalAter](https://twitter.com/TalAter)

### License
Licensed under [MIT](https://github.com/TalAter/annyang/blob/master/LICENSE).
