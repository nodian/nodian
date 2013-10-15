// Editor Load 
// SİLME!

function editorheight () {
	// 56 inverse olan
	var heig = $( window ).height();
	$( '#editor-container' ).height( heig - 83 );
}

editorheight();

function treeviewheight () {
	// 56 inverse olan
	var heig = $( window ).height();
	$( '#treeview' ).height( heig - 83 );
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


// dropdown toggle'ın kapanmasını engellemek için
$('.dropdown-menu').click(function(e) {
    e.stopPropagation();
});
