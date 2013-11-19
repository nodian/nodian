
var searchlist = new Array();
var searchitem = new Object();

// settingse konacak konabiliyorsa
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
			$( "<li>" ).append($( "<a>" ).attr("id", data.rows[i].key[1] ).attr("onclick", 'showmiddle(this);')
				.attr( "href", "#" ).text(data.rows[i].key[1])).appendTo( "#packlist" );
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
	//resultlimit gelecek buraya genişlik substrsi
    getPackageJson(val.substring(0,3), val);
}

$('#searchinput').on("keypress", function(e) {
        if (e.keyCode == 13) {
        	searchnow();
            return false; // prevent the button click from happening
        }
});

var intro = '<div style="text-align: center;"><img style="margin-top: 30%;" src="core/images/icons/Spaceship@2x.png" alt=""><h3> Search for a NPM package!<br> Launch all the rockets!</h3></div>';

function showmiddle (obj) {
	$("#leanmiddle").empty();
	var requri = "http://registry.npmjs.org/" + obj.id;
	console.log(requri);
	$.getJSON( requri, {} )
	.done(function( data ) {
		console.log(data);
		$("<h1>").text(data.name).appendTo("#leanmiddle");
		$("<h4>").text(data.description).appendTo("#leanmiddle");
		$("<small>").text("Version: " + data["dist-tags"].latest).appendTo("#leanmiddle");
		$("<p>").text("Maintainer: " + data.maintainers[0].name ).appendTo("#leanmiddle");
		$("<p>").text("Maintainer mail: " + data.maintainers[0].email).attr("class", "lead").appendTo("#leanmiddle");
		$("<h5>").text(data.repository.url).appendTo("#leanmiddle");
		$("<hr>").appendTo("#leanmiddle");
//   var text = "Markdown *rocks*.";
//
//   var converter = new Showdown.converter();
//   var html = converter.makeHtml(text);
//
//   alert(html);
		var converter = new Showdown.converter();
		var html = converter.makeHtml(data.readme);
		$("<div>").html(html).appendTo("#leanmiddle");
	}).fail(function( jqxhr, textStatus, error ) {
    	var err = textStatus + ", " + error;
    	console.error("getJSON failed, status: " + textStatus + ", error: "+error)
    	alert( "Request Failed: " + error );
    	alert( "incoming Text " + jqxhr.responseText);
	});
}


