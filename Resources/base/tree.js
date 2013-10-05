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

var filesystem = [];

function first(p){for(var i in p)return p[i];}

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

    		di.attr.id = i;
    		di.data.title = dir_total[i].nativePath().match(/(\/\w*)$/i);
    		di.data.title = first(di.data.title);
    		di.data.attr.href = dir_total[i].nativePath();
    		if(di.data.title !== null || di.data.title != undefined)
    			fs[i] = di;
    	}else{
    		var fi = new Object();
    		fi.attr = new Object();
    		fi.data = new Object();
    		fi.data.attr = new Object();

    		fi.attr.id = i;
    		fi.data.title = dir_total[i].nativePath().match(/(\w*\..*)$/i);
    		fi.data.title = first(fi.data.title);
    		fi.data.attr.href = dir_total[i].nativePath();
    		if(fi.data.title !== null || fi.data.title != undefined)
    			fs[i] = fi;
    	}
        //alert(dir_files[i].toString());
    }
    console.log(fs);
    return fs;
}

filesystem = fillFilesystem('~/lantern');

function setTree (tree) {
	$(function () {
		$("#treeview").jstree({ 
			"plugins" : ["themes","json_data","ui","crrm", "dnd", "contextmenu", "types"],
			//Themes sections
			"themes" : {
				"theme" : "apple",
				"dots" : true,
				"icons" : true
			},
			//Data section
			"json_data" : {
				"data" : tree
			}
		}).bind("select_node.jstree", function (e, data) { alert(data.rslt.obj.data("id")); });
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

setTree(filesystem);