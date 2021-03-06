nodian
====

`nodian` is a cross-platform IDE for Node.JS.
An awesome installation for Node.js, HTML5, TypeScript, CoffeeScript, CSS & JS development.

<a href="https://twitter.com/NodianProject" class="twitter-follow-button" data-show-count="false" data-size="large">Follow the awesome @NodianProject</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

[![Stories in Ready](https://badge.waffle.io/nodian/nodian.png?label=ready)](http://waffle.io/nodian/nodian)

![ide](https://raw.github.com/nodian/nodian/master/public/img/logofw.png "IDE")

`nodian` has:

- Typescript compiling
- Coffeescript run
- Coffeescript compiling
- File explorer tree view
- File operations (create/delete/rename files and directories)
- Syntax highlighted code tabbed code editing for multiple programming languages
- HTML/CSS/JS beautify
- Code folding
- Find/Find+Replace
- JSLINT validation warning
- NPM integration (display currently installed packages, add/remove packages, install package dependencies)
- HTTP basic authentication (for running nodian on a public server)
- Configurable documentation links
- Running/Debugging/Previewing



Use cases:
============
A lightweight editor for installation on terminal cloud VMs e.g. joyent smart machine.
A desktop app for nodejs, coffeescript, typescript and development.

Built using:
============

- [Node.js](http://nodejs.org/)
- [ace editor](http://ace.c9.io/)
- [Flat UI](http://designmodo.github.io/Flat-UI/)
- [Backbone](http://backbonejs.org)
- [JQuery](http://jquery.com)
- [socket.io](http://socket.io/)

Dependencies:
=============
- Node.js
- Node packages (express, ejs, ejs-locals, rimraf & socket.io)

Optional
=========================
- node-inspector

node-inspector works almost exactly like the web inspector in Safari and Chrome. Here's a good [overview](http://code.google.com/chrome/devtools/docs/scripts.html) of the UI

OS Platforms/Browsers
=========================
- Tested on MacOS, SmartOS, Linux Ubuntu and Windows 7/8/8.1
- Tested using Chrome, Firefox, Opera, Safari & IE9

Note: integrated debugging uses web inspector plugin available on webkit based browsers Chrome, Safari, Opera.


nodian configuration file (optional)
===================================
If a `nodian.json` file is present in the root of the [nodian-install-dir] it is read on start up.
This file should hold the IDE settings:

```json
{
  "projectsDir": "",
  "users": {
    "testuser": "testpassword"
  },
  "editor": {
    "tabSize": 2,
    "useSoftTabs": true,
    "highlightActiveLine": true,
    "showPrintMargin": false,
    "showGutter": true,
    "fontSize": "12px",
    "useWorker": false
  },
  "beautify": {
    "js": {
      "indent_size": 2,
      "indent_char": " ",
      "indent_level": 0,
      "indent_with_tabs": false,
      "preserve_newlines": true,
      "max_preserve_newlines": 1,
      "jslint_happy": false,
      "brace_style": "collapse",
      "keep_array_indentation": false,
      "keep_function_indentation": false,
      "space_before_conditional": true,
      "break_chained_methods": false,
      "eval_code": false,
      "unescape_strings": false,
      "wrap_line_length": 0
    },
    "css": {
      "indent_size": 2,
      "indent_char": " "
    },
    "html": {
      "indent_size": 2,
      "indent_char": " ",
      "brace_style": "collapse",
      "indent_scripts ": "normal"
    }
  },
  "links": {
    "node": "http://nodejs.org",
    "mongodb": "http://www.mongodb.org",
    "mongoose": "http://mongoosejs.com",
    "w3": "http://www.w3.org/",
    "mozilla js": "https://developer.mozilla.org/en-US/docs/JavaScript",
    "expressjs": "http://expressjs.com",
    "bootstrap": "http://twitter.github.com/bootstrap/",
    "jquery": "http://jquery.com/",
    "jqueryui": "http://jqueryui.com/",
    "jquerymobile": "http://jquerymobile.com/"
  }
}
```

Editor
======

Here's a useful ACE editor shortcuts [link](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts) for default keyboard shortcuts 

License
=======

Nodian is released under a **MIT License**:

    Copyright (C) 2013 by Mahmut Bulut, Serhat Erdoğan, Abdurrahman Kolsuz, Mehmet Emin Akdeniz, Erdi Yılmaz
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

BTW Love us like this
=======
!["Love US!!"](http://i.imgur.com/ZiIoAUj.gif "Love US!!")
