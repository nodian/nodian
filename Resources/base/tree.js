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

var data = [
					{ 
						"data" : "arrayUS node", 
						"metadata" : { id : 23 },
						"children" : [ "Child andrud 1", "A Child 2" ]
					},
					{ 
						"attr" : { "id" : "li.node.id1" }, 
						"data" : { 
							"title" : "Long format demo", 
							"attr" : { "href" : "#" } 
						} 
					}
			];

setTree(data);