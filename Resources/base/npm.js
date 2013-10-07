
var searchlist = new Object();

function getPackageJson (startKeyword, endKeyword, grouplevel) {
	function() {
		var kafa = "http://registry.npmjs.org/-/_view/byKeyword?startkey=[\"";
		var govde = "\"]&endkey=[\"";
		var ayak = "\",{}]&group_level=";
		$.getJSON( kafa+startKeyword+govde+endKeyword+ayak+grouplevel, {
			tags: "mount rainier",
			tagmode: "any",
			format: "json"
		})
		.done(function( data ) {
			$.each( data.items, function( i, item ) {
				$( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
				if ( i === 3 ) {
					return false;
				}
			});
		});
	}
}