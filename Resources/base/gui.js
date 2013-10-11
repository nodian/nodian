
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

function leanmiddleheight () {
	var heig = $( window ).height();
	$( '#leanmiddle' ).height( heig );
}

leanmiddleheight();

$( window ).resize(function() {
	editorheight();
	treeviewheight();
	packageheight();
	leanmiddleheight();
});

function loadNPM(){
	$( "#content" ).load( "./npm.html" );
}

