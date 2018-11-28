$(document).ready(function(){
    $(".login").click(function(){
        $("p").hide();
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



function stats(){
	var minHR, maxHR, minCad, maxCad, maxEle, minEle;
	var avgHR = 0, avgCad = 0, avgEle = 0;
	
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
	}
	
	avgHR = avgHR/listOfNodes.length;
	avgCad = avgCad/listOfNodes.length;
	avgEle = avgEle/listOfNodes.length;
	
	
	var time = listOfNodes[listOfNodes.length - 1].time - listOfNodes[0].time;
	var timeElapsed = time/60/60/1000;
	console.log(avgCad);
}

function draw(){
	drawPath();
	stats();
}