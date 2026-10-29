'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { unzipSync } = require('fflate');
const { documentation } = require('../tasks/build');

const read = path => fs.readFileSync(path, 'utf8');

test('generated docs preserve examples, optional arguments, defaults and links', () => {
  assert.equal(documentation(read('src/upup.js')), read('docs/README.md'));
  const result = documentation('/**\n * Example description.\n * @param {Boolean} [enabled=false] - Enable feature\n * @method configure\n * @see [Guide](#guide)\n */');
  assert.match(result, /## configure\(\[enabled=false\]\)/);
  assert.match(result, /\* \*\*Boolean\*\* \*\[enabled=false\]\* - Enable feature/);
  assert.match(result, /See: \[Guide\]\(#guide\)/);
});

test('download ZIP contains exactly the built browser scripts', () => {
  const entries = unzipSync(fs.readFileSync('dist/upup.zip'));
  assert.deepEqual(Object.keys(entries).sort(), ['upup.min.js', 'upup.sw.min.js']);
  for (const [name, contents] of Object.entries(entries)) {
    assert.deepEqual(Buffer.from(contents), fs.readFileSync('dist/' + name));
  }
});

for (const file of ['src/upup.js', 'dist/upup.min.js']) {
  test(file + ' preserves unsupported browsers and service-worker settings', async () => {
    const unsupported = { navigator: {} };
    vm.runInNewContext(read(file), unsupported);
    assert.equal(unsupported.UpUp, null);
    let registered;
    let message;
    const context = { navigator: { serviceWorker: {
      register(url, options) {
        registered = { url, options };
        return Promise.resolve({ active: { postMessage(value) { message = value; } } });
      }
    } } };
    vm.runInNewContext(read(file), context);
    assert.deepEqual(Object.keys(context.UpUp).sort(), ['addSettings', 'debug', 'start']);
    context.UpUp.addSettings({ content: 'Offline', assets: ['/logo.png'] });
    context.UpUp.start({ scope: '/demo/', 'service-worker-url': '/worker.js' });
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(registered.url, '/worker.js');
    assert.equal(registered.options.scope, '/demo/');
    assert.equal(message.action, 'set-settings');
    assert.equal(message.settings.content, 'Offline');
    assert.equal(message.settings.assets[0], '/logo.png');
  });
}

for (const file of ['src/upup.sw.js', 'dist/upup.sw.min.js']) {
  test(file + ' uses the network, cached assets, and offline navigation fallback', async () => {
    const listeners = {};
    const cached = new Map([['/logo.png', 'logo'], ['sw-offline-content', 'Offline']]);
    let online = true;
    const context = {
      self: { addEventListener(name, listener) { listeners[name] = listener; } },
      fetch: () => online ? Promise.resolve('network') : Promise.reject(new Error('offline')),
      caches: { match: request => Promise.resolve(cached.get(request.url || request)) }
    };
    vm.runInNewContext(read(file), context);
    async function request(url, mode, accept) {
      let response;
      listeners.fetch({ request: { url, mode, method: 'GET', headers: { get: () => accept } }, respondWith(value) { response = value; } });
      return response;
    }
    assert.equal(await request('/page', 'navigate', 'text/html'), 'network');
    online = false;
    assert.equal(await request('/logo.png', 'cors', 'image/png'), 'logo');
    assert.equal(await request('/page', 'navigate', 'text/html'), 'Offline');
    assert.equal(await request('/page', 'cors', 'text/html'), 'Offline');
    assert.equal(await request('/missing.png', 'cors', 'image/png'), undefined);
  });
}
