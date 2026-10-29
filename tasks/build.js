'use strict';

const fs = require('node:fs');
const { spawn } = require('node:child_process');
const { parse } = require('comment-parser');
const { zipSync } = require('fflate');

function parameterName(tag) {
  const name = tag.name + (tag.default === undefined ? '' : '=' + tag.default);
  return tag.optional ? '[' + name + ']' : name;
}

function documentation(source) {
  const sections = parse(source, { spacing: 'preserve' }).map(comment => {
    const method = comment.tags.find(tag => tag.tag === 'method');
    const params = comment.tags.filter(tag => tag.tag === 'param');
    const parts = [];
    if (method) {
      parts.push('## ' + method.name + '(' + params.map(parameterName).join(', ') + ')');
    }
    parts.push(comment.description.trim());
    for (const tag of comment.tags.filter(tag => tag.tag === 'see')) {
      parts.push('See: ' + [tag.name, tag.description].filter(Boolean).join(' '));
    }
    if (params.length) {
      parts.push('### Params:');
      parts.push(params.map(tag => '* **' + tag.type + '** *' + parameterName(tag) + '* ' + tag.description).join('\n'));
    }
    return parts.join('\n\n');
  });
  return '\n\n<!-- Start src/upup.js -->\n\n' + sections.join('\n\n') + '\n\n<!-- End src/upup.js -->\n\n';
}

module.exports = function(grunt) {
  grunt.registerTask('markdox', 'Generate API documentation from source comments.', function() {
    grunt.file.write('docs/README.md', documentation(grunt.file.read('src/upup.js')));
  });

  grunt.registerTask('compress', 'Package the browser scripts.', function() {
    const files = {};
    for (const name of fs.readdirSync('dist').filter(name => name.endsWith('.js')).sort()) {
      files[name] = [fs.readFileSync('dist/' + name), { mtime: new Date('2000-01-01T00:00:00Z') }];
    }
    fs.writeFileSync('dist/upup.zip', zipSync(files, { level: 9 }));
  });

  grunt.registerTask('watch', 'Rebuild when source or demo CSS changes.', function() {
    const done = this.async();
    let child;
    let timer;
    let pending = false;
    function build() {
      if (child) {
        pending = true;
        return;
      }
      pending = false;
      child = spawn(process.execPath, [require.resolve('grunt-cli/bin/grunt'), 'devwatcher'], { stdio: 'inherit' });
      child.on('error', error => grunt.log.error(error));
      child.on('close', () => {
        child = null;
        if (pending) { build(); }
      });
    }
    function changed() {
      clearTimeout(timer);
      timer = setTimeout(build, 100);
    }
    const watchers = [
      fs.watch('src', { recursive: true }, changed),
      fs.watch('demo/css', (event, filename) => {
        if (filename === 'online.css') { changed(); }
      })
    ];
    for (const watcher of watchers) {
      watcher.on('error', error => {
        grunt.log.error(error);
        done(false);
      });
    }
    grunt.log.writeln('Watching src/ and demo/css/online.css');
  });
};

module.exports.documentation = documentation;
