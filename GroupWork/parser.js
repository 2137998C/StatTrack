function node(lat, lon, hr, ele, cad, time)
{ 
    this.lat = lat;
    this.lon = lon;
    this.hr = hr;
    this.ele = ele;
	this.cad = cad;
	this.time = time;
}

var listOfNodes = [];


var inputElement = document.getElementById("file-input");
inputElement.addEventListener("change", function(e){
	console.log("checkpoint: 1");
	console.log(e.target);
	var reader = new FileReader();
	reader.onload = function(e){
		console.log("checkpoint: 2");
		var text = reader.result;
		
		var parser = new DOMParser();
		var doc = parser.parseFromString(text, "application/xml");
		
		var xml = text;
		var xmlDoc = $.parseXML(xml);
		$xml = $(xmlDoc);
		
		console.log("checkpoint: 3");
		
		
		
		$xml.find('trkpt').each(function(){
			
			
			var n = new node();
			var lat = $(this).attr("lat");
            var lon = $(this).attr("lon");
			
			var cad = parseInt($(this).find("ns3\\:cad").text());
			var hr = parseInt($(this).find("ns3\\:hr").text());
			var ele = parseFloat($(this).find("ele").text());
			var time = Date.parse($(this).find("time").text());
			
			
			n.lat = lat;
			n.lon = lon;
			n.cad = cad;
			n.hr = hr;
			n.ele = ele;
			n.time = time;
			listOfNodes.push(n);
		});
		
		/*var gpxDoc = $.parseXML(text); 
		var $xml = $(gpxDoc);
		var i = 0;
		var listOfNodes = [];
		var n = new node();
		$xml.find('trkpt').each(function(){
			var lat = $(this).attr("lat");
            var lon = $(this).attr("lon");
			
			
			
			n.lat = lat;
			n.lon = lon;
			console.log($(this).text());
		});
		*/
	}
	reader.readAsText(this.files[0]);
	
});

