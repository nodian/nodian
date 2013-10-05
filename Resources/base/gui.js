
// Editor Load 
// SİLME!

function editorheight () {
	var heig = $( window ).height();
	$( '#editor-container' ).height( heig - 56 );
}

editorheight();

function treeviewheight () {
	var heig = $( window ).height();
	$( '#treeview' ).height( heig - 56 );
}

treeviewheight();

$( window ).resize(function() {
	editorheight();
	treeviewheight();
});

function loadNPM(){
	$( "#content" ).load( "./npm.html" );
}

