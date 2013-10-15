/*
$(function () {
	// TO CREATE AN INSTANCE
	// select the tree container using jQuery
	$("#treeview")
		// call `.jstree` with the options object
		.jstree({
			// the `plugins` array allows you to configure the active plugins on this instance
			"plugins" : ["themes","json_data","ui","crrm","hotkeys", "dnd", "contextmenu", "types"],
			// each plugin you have included can have its own config object
			*/
var editor = ace.edit("editor");

var currentlyopen = ""; // File that currently opened in editor
var curprojectdir = ""; // Currently opened projecy dir

var projspec = new Object(); // Nodian project config File Object

var config = new Object(); // Nodian project config object

/**
 * Wait extension for jquery
 */
(function($) {
    $.wait = function(time) {
         return $.Deferred(function(dfd) {
               setTimeout(dfd.resolve, time); // use setTimeout internally. 
         }).promise();
    }
}(jQuery));

/**
 * Editor commands in here
 */
editor.commands.addCommands([
{
    name: 'savefile',
    bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
    exec: function(editor) {
        saveFile(currentlyopen);
    },
    readOnly: true // false if this command should not apply in readOnly mode
},
{
    name: 'myCommnd',
    bindKey: {win: 'Ctrl-Y',  mac: 'Command-Y'},
    exec: function(editor) {
        alert('COMMAND-Y');
    },
    readOnly: true // false if this command should not apply in readOnly mode
}
]);

var filesystem = [];

function first(p){for(var i in p)return p[i];}

function fillFilesystemWithRoot (projectpath) {
	var rootarray = projectpath.split(Ti.Filesystem.getSeparator())
	var root = new Array();
	root[1] = new Object();
    root[1].attr = new Object();
    root[1].data = new Object();
    root[1].data.attr = new Object();
    root[1].children = new Array();
	
    root[1].attr.id = 0;
	root[1].data.title = rootarray[rootarray.length - 1];
	root[1].data.attr.href = projectpath;

	var fs = fillFilesystem(projectpath);

	root[1].children = fs;
	return root[1];
}

function fillFilesystem(projectpath){
	// /Users/core/etc tipinde olacak
	// watchdog yaparken modificationTimestamp( ) kullan

	var fs = [];
	var dir = Ti.Filesystem.getFile(projectpath);
	var dir_total = dir.getDirectoryListing();
    // (\w*\/\w*\..*) i kaka/ter.jpg
    // (\/\w*)$ i /kaka
    // (\w*\..*)$ i kaka.jpg
    for (var i=1;i<dir_total.length;i++){ 
    	if (dir_total[i].isDirectory()) {
    		var di = new Object();
    		di.attr = new Object();
    		di.data = new Object();
    		di.data.attr = new Object();
    		di.children = new Array();

    		di.attr.id = i;
    		//di.data.title = dir_total[i].nativePath().match(/(\/\w*)$/i);
    		var lst = new Array();
    		lst = dir_total[i].nativePath().split(Ti.Filesystem.getSeparator());
    		di.data.title = lst[lst.length - 1];
    		di.data.attr.href = dir_total[i].nativePath();
    		if(di.data.title !== null || di.data.title != undefined){
    			fs[i] = di;
    			di.children = fillFilesystem(di.data.attr.href);
    		}

    	}else{
    		var fi = new Object();
    		fi.attr = new Object();
    		fi.data = new Object();
    		fi.data.attr = new Object();

    		fi.attr.id = i;
    		// fi.data.title = dir_total[i].nativePath().match(/(\w*\..*)$/i);
    		var lst = new Array();
    		lst = dir_total[i].nativePath().split(Ti.Filesystem.getSeparator());
    		fi.data.title = lst[lst.length - 1];
    		fi.data.attr.href = dir_total[i].nativePath();
    		if(fi.data.title !== null || fi.data.title != undefined)
    			fs[i] = fi;
    	}
        //alert(dir_files[i].toString());
    }
    //console.log("FS RETURNED: "+fs);
    return fs;
}

function submitRequest(buttonId) {
	if (document.getElementById(buttonId) == null
		|| document.getElementById(buttonId) == undefined) {
		return;
}
	if (document.getElementById(buttonId).dispatchEvent) {
		var e = document.createEvent("MouseEvents");
		e.initEvent("click", true, true);
		document.getElementById(buttonId).dispatchEvent(e);
	} else {
		document.getElementById(buttonId).click();
	}
}

function warn (title, text, btn) {
	$('#alerttitle').text(title);
	$('#alerttext').text(text);
	$('#declinealertbtn').text(btn);
	submitRequest('alerttoggle');
}

function erroroccured (text) {
	warn('Error Occured', text, 'Dismiss');
}

function nameit (title) {
	$('#namertitle').text(title);
	$('#nameryesbtn').text('OK');
	$('#namernobtn').text('Cancel');
	submitRequest('namertoggle');
}

var willnew = new Object();
var renfile = "";
var rename = 0;

function setTree (tree) {
	$(function () {
		$("#treeview").jstree({ 
			// "plugins" : ["themes","json_data","ui","crrm", "dnd", "contextmenu", "types"], DND'yi ( drag drop )sonra yap
			"plugins" : ["themes","json_data","ui","crrm", "contextmenu", "types"],
			//Themes sections
			"themes" : {
				"theme" : "apple",
				"dots" : true,
				"icons" : true
			},

			"contextmenu" : {
				// Some key
				"items": {
					"newfile": {
						"label"		: "New File",
						"action"	: function (data) {
							rename = 0;
							var fh = Ti.Filesystem.getFile(data.context.pathname, '');
							if(fh.isFile()){
								var fhparent = fh.parent();
								willnew = fhparent;
								nameit('File name will be');
							}else{
								willnew = fh+Ti.Filesystem.getSeparator();
								nameit('File name will be');
							}
						}
					},

					"newfolder": {
						"label"		: "New Folder",
						"action"	: function (data) {
							rename = -1;
							var fh = Ti.Filesystem.getFile(data.context.pathname, '');
							if(fh.isFile()){
								console.log('PATH : '+data.context.pathname);
								var division = data.context.pathname.toString().trim().split(Ti.Filesystem.getSeparator());
								division.pop();
								console.log(division);
								console.log("HEIL"+division);
								var pa = division.join(Ti.Filesystem.getSeparator());
								console.log('LAST PATH: '+pa);
								willnew = Ti.Filesystem.getFile(pa.toString(), '');
								nameit('Folder name will be');
							}else{
								willnew = fh;
								nameit('Folder name will be');
							}
						}
					},

					"delete": {
						"label"		: "Delete",
						"action"	: function (data) {
							var fh = Ti.Filesystem.getFile(data.context.pathname, '');
							if(fh.isFile()){
								fh.deleteFile();
								if(this.is_selected(data)) {
									this.remove();
								} else {
									this.remove(data); 
								}
							}else{
								fh.deleteDirectory(true);
								if(this.is_selected(data)) {
									this.remove();
								} else {
									this.remove(data); 
								}
							}
						}
					},

					"rename" : {
						// The item label
						"label"		: "Rename",
						"action"	: function (data) {
								console.dir(data);
								rename = 1;
								renfile = data.context.pathname;
								nameit('Rename');
							}
						}
					/* MORE ENTRIES ... */
				}
			},
			//Data section
			"json_data" : {
				"data" : tree
			}
		}).bind("select_node.jstree", function (e, data) {
			readFile(data.rslt.obj.context.pathname);
			currentlyopen = data.rslt.obj.context.pathname;
		});
	});
}

/*
var data = [
					{ 
						"attr" : { "id" : "li.node.id1" }, 
						"data" : { 
							"title" : "Long format demo", 
							"attr" : { "href" : "#" } 
						},
						"children" : [ "Child andrud 1", "A Child 2" ]
					}
			];
*/

$("#openproject").click(function(){ openProject(); });
$("#savefile").click(function(){ saveFile(currentlyopen); });
$("#nameryesbtn").click(function(){
	if(rename == 0){
		var file = Ti.Filesystem.getFile(willnew, document.getElementById('namertext').value);
		//alert(document.getElementById('namertext').value);    
		file.write('');
		$.wait(1000).then(function(){ 
			filesystem = fillFilesystemWithRoot(curprojectdir);
			//$('#treeview').empty();
		    setTree(filesystem);
		});
	}else if(rename == 1) {
		//var file = Ti.Filesystem.getFile(willnew, '');
		divide = renfile.trim().split(Ti.Filesystem.getSeparator());
		//console.log(divide.toString());
		//document.getElementById('namertext').placeholder = divide[divide.length - 1].toString();
		divide[divide.length - 1] = document.getElementById('namertext').value;
		var renamed = divide.join(Ti.Filesystem.getSeparator());
		//console.log(renamed);
		//file.rename(renamed.toString());
		/** 
		 * ruby running
		 */
		renamerfun(renfile, renamed);

		$.wait(1000).then(function(){ 
			filesystem = fillFilesystemWithRoot(curprojectdir);
		    setTree(filesystem);
		});
	} else {
		var file = Ti.Filesystem.getFile(willnew, document.getElementById('namertext').value);
		file.createDirectory();
		$.wait(1000).then(function(){ 
			filesystem = fillFilesystemWithRoot(curprojectdir);
			//$('#treeview').empty();
		    setTree(filesystem);
		});
	}
});

function renamerfun (oldone, newone) {
	renameit(oldone, newone);
}

function openProject () {
	var curWin = Ti.UI.getCurrentWindow();
	curWin.openFolderChooserDialog(function(fn){
    if(fn.length == 0) return;      //User canceled so do nothing
    	//chosen directory = fn[0]
		checkProjNodeJS(fn[0]);
  	},{
  		"title": "Nodian: Open Project",
  		"path": Ti.Filesystem.getUserDirectory().nativePath()
  	});
}

function deleteFolder (argument) {
	// body... YAPILDI
}

function createFolder (argument) {
	// body...
}

function updateFolder (argument) {
	// body... YAPILDI
}

function createFile (argument) {
	try{
		var fileHandle = Ti.Filesystem.getFile(argument, '');
		fileHandle.write('');
	}catch(e)
	{
		erroroccured('Error occured during the creating the file: '+e.message);
	}
}

function deleteFile (argument) {
	
}

function saveFile (argument) {
	var writefd= Ti.Filesystem.getFile(argument, '');
	var Stream = Ti.Filesystem.getFileStream(writefd);
	Stream.open(Ti.Filesystem.MODE_WRITE);
	var data = editor.getValue();
	Stream.write(data);
	Stream.close();
}

function readFile (argument) {
	var readfi= Ti.Filesystem.getFile(argument, '');  
	console.log('READ FILE'+argument); 
	if (readfi.isDirectory() == true) {
		return;
	}else{
		if (readfi.exists())
		{
			if (IsBinary(readfi) == 0){
				if(readfi.size() == 0){
					editor.setValue('');
				}else{
					var Stream = Ti.Filesystem.getFileStream(readfi);    
					Stream.open(Ti.Filesystem.MODE_READ);     
					contents = Stream.read();
					console.log(contents.lenght);
					editor.setValue(contents.toString());
					Stream.close();
					//alert( contents );
					//var editor = ace.edit("editor");
				}
			}else{
				erroroccured('Couldn\'t open binary file!');
			}
		} 
	}
}


/**
 * Projenin Node.JS projesi olup olmadığını anlayan kısım
 * Ayrıca Node.JS projesiyse Nodian'ın özelliklerinin yazılı olduğu dosyayı kaydeder aynı patikaya
 */

function checkProjNodeJS (filepath) {
	// package.json var mı?
	var pkg = Ti.Filesystem.getFile(filepath, "package.json");
	// node_modules var mı?
	var modulesdir = Ti.Filesystem.getFile(filepath, "node_modules");
	// Projenin nodian tarafından açılıp açılmadığını tutar ayrıca konfigürasyonlar JSON olarak
	projspec = Ti.Filesystem.getFile(filepath, ".nodianspec");
	
	if (pkg.exists() || modulesdir.exists()) {
		if(projspec.exists()){
			var Stream = Ti.Filesystem.getFileStream(projspec);
			Stream.open(Ti.Filesystem.MODE_READ);
			var contents = Stream.read();
			console.log(".nodianspec content lenght: " + contents.lenght);
			Stream.close();

			config = Ti.JSON.parse(contents.toString());
			// load config

			warn('Nodian project created.', 'Nodian project has created in this directory', 'OK');
		}else{
			// save config with defaults

			warn('Nodian project created.', 'Nodian project has created in this directory', 'OK');
		}
		curprojectdir = filepath;
    	filesystem = fillFilesystemWithRoot(curprojectdir);
    	setTree(filesystem);
	}else{
		erroroccured("Traversed directory doesn't belong to a Node.JS project.");
	}

}

function saveNodianConfig (filepath) {
	/**
	 * == Specification
	 * 
	 * @lastfile : Opened last file
	 * @
	 * @nodecomm : Node.JS command for running
	 * @
	 * 
	 * -- Editor
	 * @fontsize : Fonstsize of editor
	 * @theme : Theme of the editor (Default solarized_dark)
	 * @lintcheck : Lint syntax checking (Default true)
	 * @cursor : Current cursor position (Default 0)
	 * @tabsize : Tab size in project (Default 4)
	 */


}

function loadNodianConfig ( conf ) {
	// body...
}

