$(document).ready(function(){
        $("#stats").hide();
		$("#submit").click(function(){
			drawPath();
			stats();
			$("#stats").show();
});
		
});


function drawPath(){
	var pointList = [];
	for(var i in listOfNodes){
		var point = new L.LatLng(listOfNodes[i].lat, listOfNodes[i].lon);
		pointList.push(point);
	}	
	
	var firstpolyline = new L.Polyline(pointList, {
    color: 'red',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
});
var map = L.map('mapid').setView([listOfNodes[0].lat, listOfNodes[0].lon], 15);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	
firstpolyline.addTo(map);
//L.map('mapid').setView([listOfNodes[0].lat, listOfNodes[0].lon], 5);
}

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

function stats(){
	var minHR, maxHR, minCad, maxCad, maxEle, minEle, lastNode;
	var avgHR = 0, avgCad = 0, avgEle = 0, dis = 0;
	
	for(var i in listOfNodes){
		
		avgHR += listOfNodes[i].hr;
		avgCad += listOfNodes[i].cad;
		avgEle += listOfNodes[i].ele;
		
		if(i == 0){
			minHR = listOfNodes[0].hr;
			maxHR = listOfNodes[0].hr;
			
			minCad = listOfNodes[0].cad;
			maxCad = listOfNodes[0].cad;
			
			maxEle = listOfNodes[0].ele;
			minEle = listOfNodes[0].ele;
		}else{
			dis = dis + distance(listOfNodes[i].lat, listOfNodes[i].lon, lastNode.lat, lastNode.lon);
			
			
			
			
			if(listOfNodes[i].hr < minHR){
				minHR = listOfNodes[i].hr;
			}
			if(listOfNodes[i].hr > maxHR){
				maxHR = listOfNodes[i].hr;
			}
			
			if(listOfNodes[i].hr < minCad){
				minCad = listOfNodes[i].cad;
			}
			if(listOfNodes[i].hr > maxCad){
				maxCad = listOfNodes[i].cad;
			}
			
			if(listOfNodes[i].hr < minEle){
				minEle = listOfNodes[i].ele;
			}
			if(listOfNodes[i].hr > maxEle){
				maxEle = listOfNodes[i].ele;
			}
		}
		lastNode = listOfNodes[i];
	}
	
	avgHR = avgHR/listOfNodes.length;
	avgCad = avgCad/listOfNodes.length;
	avgEle = avgEle/listOfNodes.length;
	
	
	var time = listOfNodes[listOfNodes.length - 1].time - listOfNodes[0].time;
	time = time/60/1000;
	var minutes = time%60
	var hours = (time - minutes)/60
	var speed = dis/(time/60)
	
	document.getElementById("avgHR").innerHTML = avgHR.toFixed(2);
	document.getElementById("avgCad").innerHTML = avgCad.toFixed(2);
	document.getElementById("avgEle").innerHTML = avgEle.toFixed(2); 
	document.getElementById("minHR").innerHTML = minHR;
	document.getElementById("minCad").innerHTML = minCad;
	document.getElementById("minEle").innerHTML = minEle.toFixed(2);
	document.getElementById("maxHR").innerHTML = maxHR;
	document.getElementById("maxCad").innerHTML = maxCad;
	document.getElementById("maxEle").innerHTML = maxEle.toFixed(2);
	document.getElementById("time").innerHTML = hours.toFixed(0) + "h " + minutes.toFixed(0) + "min";
	document.getElementById("distance").innerHTML = dis.toFixed(2) + "km";
	document.getElementById("speed").innerHTML = speed.toFixed(2) + "km/h";
}

