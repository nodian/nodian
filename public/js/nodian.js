

$(function($) {
  // nodian model

  Nodian = Backbone.Model.extend({
    initialize: function(data) {
      // initial directory fso instance
      var initDir = new FileSystemItem({
        parent_cid: '',
        name: data.name,
        path: data.path,
        isDirectory: true
      });
      // file system collection instance
      var fs = new FileSystemItemCollection([initDir]);
      // populate initial structure from server
      initData.dir.forEach(function(item) {
        fs.add(new FileSystemItem({
          parent_cid: initDir.cid,
          path: item.path,
          isDirectory: item.isDirectory,
          name: item.name,
          ext: item.ext
        }));
      });
      initDir.set({
        loaded: true,
        expanded: true
      }, {
        silent: true
      });
      this.fs = fs;
      this.data = data;
      var sk = this.socket = io.connect();
      data.procs.forEach(function(p) {
        p.alive = true;
        p.socket = sk;
      });
      this.procs = new ChildProcessCollection(data.procs);
    }
  });

  // nodian view
  NodianView = Backbone.View.extend({
    el: document.body,
    events: {
      'click #header .view': 'clickHeaderView',
      'click #header .autocoffee': 'runAutoCompileCoffee'

    },
    initialize: function() {
      this.fs = this.model.fs;
      this.procs = this.model.procs;
      this.socket = this.model.socket;
      this.$el.on('contextmenu', function(e) {
        return false;
      });
      this.fs.on('fileadded', function(item) {
        this._openFile(item);
      }, this);
      this.fs.on('err', function(data) {
        Utils.msg(data);
      }, this);
      this.procs.on('add', function() {
        this.showProcesses();
      }, this);
      // dialogs
      this.$confirm = $('#confirm');
      this.$prompt = $('#prompt');
      // content views
      this._$frames = $('#frames');
      this._$iframes = $('iframe', this._$frames);
      this._$iframeurls = $('input.address-bar', this._$frames);
      this._$files = $('#files');
      /*
      window.onbeforeunload = function() {
        return 'Nodian';
      }
      */
      // frames
      $('#frames form').on('submit', function(e) {
        e.preventDefault();
        $(this).parent().find('iframe').attr('src', $('.address-bar', this).val().trim());
        return false;
      });
      this.render();
    },
    render: function() {
      console.log('render nodian');
      var self = this;
      var explorerView = this.explorerView = new ExplorerView({
        model: this.fs,
        el: $('#explorer')[0]
      });
      var editorView = this.editorView = new EditorView({
        model: this.fs,
        el: $('#main')[0],
        attributes: {
          editorConfig: this.model.data.config ? this.model.data.config.editor : null,
          beautifyConfig: this.model.data.config ? this.model.data.config.beautify : null
        }
      });
      var procsView = this.procsView = new ChildProcessViews({
        model: this.procs,
        el: $('#processes')[0]
      });
      var runDialogView = this.runDialogView = new RunDialogView({
        el: $('#run')[0]
      });
      // explorer ui events
      explorerView.on('fileclick', function(e, item) {
        self._openFile(item);
      });
      explorerView.on('dirclick', function(e, item) {
        if (!item.get('loaded')) {
          item.loadChildren();
        }
        item.set({
          expanded: !item.get('expanded')
        }, {
          silent: true
        });
      });
      explorerView.on('action', function(e, item, action) {
        self.action(action, item);
      });
      // editor ui events
      editorView.on('tabcloseclick', function(e, item, content) {
        if (item.get('edited')) {
          self.$confirm.modalConfirm(
            'Save changes',
            'This file has changed, do you want to save?',

          function(e) {
            item.save(content);
            item.unloadFile();
          },

          function(e) {
            item.unloadFile();
          });
        } else {
          item.unloadFile();
        }
      });
    },
    clickHeaderView: function(e) {
      e.preventDefault();
      this.showView($($(e.currentTarget).attr('href')));
    },
    showFiles: function() {
      this.showView(this._$files);
    },
    showFrames: function(url1, url2) {
      if (url1 || url2) {
        var iframes = this._$frames.find('iframe');
        if (url1) {
          this._$iframeurls.eq(0).val(url1);
          this._$iframes.eq(0).attr('src', url1);
        }
        if (url2) {
          this._$iframeurls.eq(1).val(url2);
          this._$iframes.eq(1).attr('src', url2);
        }
      }
      this.showView(this._$frames);
    },
    runAutoCompileCoffee: function() {
      if (navigator.platform.indexOf("Win") !== -1) {
        alert("Windows is not supported because of restrictions");
      }else{
        
      }
      var comm = "coffee -bcw ", sbst = "";
      if(initData.path.toString().indexOf(" ") !== -1){
        sbst = initData.path.replace(" ", "\\ ");
        //sbst = initData.path;
        //sbst=sbst;
      }
      console.log(navigator);
      //var comm = 'coffee -bcw '+"\""+initData.path+"\"";

      comm+=sbst;
      console.log("Command: "+comm);
      console.log("SBST: "+sbst);
      this.procs.add(new ChildProcess({
        cmd: "coffee -bcw %HOMEPATH%",
        paths: ["", ''],
        socket: this.socket
      }));
    },
    showView: function($el) {
      $el.show().siblings().hide();
    },
    showProcesses: function() {
      $('#content, #footer').removeStyle();
    },
    _openFile: function(item) {
      if (item.get('loaded')) {
        this.editorView.activateFile(item);
      } else {
        item.loadFile();
      }
    },
    action: function(name, item) {
      return {
        'open': function(item) {
          this._openFile(item);
        },
        'rename': function(item) {
          this.$prompt.modalPrompt('Rename', 'Enter new name', 'Enter new name', item.get('name'), function(e, value) {
            item.rename(value);
          });
        },
        'delete': function(item) {
          this.$confirm.modalConfirm('Confirm delete', 'Delete file [' + item.get('name') + ']. Sure?', function(e) {
            item.remove();
          });
        },
        'addfile': function(item) {
          this.$prompt.modalPrompt('Add file', 'Enter file name', 'Enter file name', 'filename.js', function(e, value) {
            item.addFile(value);
          });
        },
        'adddir': function(item) {
          this.$prompt.modalPrompt('Add Folder', 'Enter folder name', 'Enter folder name', '', function(e, value) {
            item.addDir(value);
          });
        },
        'run': function(item) {
          if(item.get('name').indexOf('.js') !== -1){
            this.procs.add(new ChildProcess({
              cmd: 'node ' + item.get('name'),
              paths: item.paths(),
              socket: this.socket
            }));
          }else if(item.get('name').indexOf('.coffee') !== -1){
            this.procs.add(new ChildProcess({
              cmd: 'coffee ' + item.get('name'),
              paths: item.paths(),
              socket: this.socket
            }));
          }
          else{
            alert('This will not compile.');
          }
        },
        'coffeecompile': function(item) {
          if(item.get('name').indexOf('.js') === -1){
            console.log('OLDU: '+item.paths());
            console.log("Autocompile : " + item.paths()[0]);
            this.procs.add(new ChildProcess({
              cmd: 'coffee -c ' + item.get('name'),
              paths: item.paths(),
              socket: this.socket
            }));
          }
        },
        'typescriptcompile': function(item){
          if (item.get('name').indexOf('.js') === -1){
            console.log('OLDU');
            console.log("Autocompile : " + item.paths()[0]);
            this.procs.add(new ChildProcess({
              cmd: 'tsc ' + item.get('name'),
              paths: item.paths(),
              socket: this.socket
            }));
          }
        },
        'runadvanced': function(item) {
          var self = this;
          this.runDialogView.show(function(e, value) {
            if(item.get('name').indexOf('.js') !== -1){
              var command = 'node ';
            }else if(item.get('name').indexOf('.coffee') !== -1){
              var command = 'coffee ';
            }
            if (value.debug) {
              command += (value.brk ? '--debug-brk=' : '--debug=') + value.port + ' ';
            }
            if (value.showframes) {
              self.procs.add(new ChildProcess({
                cmd: command + item.get('name'),
                paths: item.paths(),
                socket: self.socket,
                exitCallback: function(code) {
                  self.showFiles();
                }
              }));
              setTimeout(function() {
                self.showFrames(value.url1, value.url2);
              }, 200);
            } else {
              self.procs.add(new ChildProcess({
                cmd: command + item.get('name'),
                paths: item.paths(),
                socket: self.socket
              }));
            }
          });
        },
        'install': function(item) {
          var self = this;
          this.procs.add(new ChildProcess({
            cmd: 'npm install',
            paths: item.paths(),
            socket: this.socket,
            exitCallback: function(code) {
              if (code === 0) {
                Utils.success('Install dependencies', 'Please refresh page to see changes');
              } else {
                Utils.error('Install dependencies', 'Install unsuccessful - see console');
              }
            }
          }));
        }
      }[name].call(this, item);
    }
  });
  

  
  // nodian instance
  nodian = new Nodian(initData);
  // nodian view instance
  nodianView = new NodianView({
    model: nodian
  });
});