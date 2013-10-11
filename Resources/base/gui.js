
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

function packageheight () {
	var heig = $( window ).height();
	$( '#packlist' ).height( heig - 98 );
}

packageheight();

$( window ).resize(function() {
	editorheight();
	treeviewheight();
	packageheight();
});

function loadNPM(){
	$( "#content" ).load( "./npm.html" );
}

