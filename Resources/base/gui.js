
// Editor Load 
// SİLME!

function editorheight () {
	var heig = $( window ).height();
	$( '#editor-container' ).height( heig - 56 );
}

editorheight();

$( window ).resize(function() {
	editorheight();
});

function loadNPM(){
	$( "#content" ).load( "./npm.html" );
}

