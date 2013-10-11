
var searchlist = new Array();
var searchitem = new Object();

var resultlimit = 0;

function getPackageJson (startKeyword, endKeyword) {
	$('#packlist').empty();
	//$('#packlist').append('<li class="nav-header">Possible Results</li>');
	var kafa = "http://registry.npmjs.org/-/_view/byKeyword?startkey=[\"";
	var govde = "\"]&endkey=[\"";
	var ayak = "\",{}]&group_level=3";
	
	$.getJSON( kafa+startKeyword+govde+endKeyword+ayak, {})
	.done(function( data ) {
		$(data.rows).each( function(i){
			$( "<li>" ).append($( "<a>" ).attr( "href", data.rows[i].key[1] ).text(data.rows[i].key[1])).appendTo( "#packlist" );
			if ( i === 999 ) {
				return false;
			}
		});
	}).fail(function( jqxhr, textStatus, error ) {
    	var err = textStatus + ", " + error;
    	console.error("getJSON failed, status: " + textStatus + ", error: "+error)
    	alert( "Request Failed: " + error );
    	alert( "incoming Text " + jqxhr.responseText);
	});
	
}

function searchnow () {
	var val = document.getElementById('searchinput').value;
    getPackageJson(val.substring(0,3), val);
}