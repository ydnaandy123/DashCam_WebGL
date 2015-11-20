var pathPointScalar = 1000000;
var pathPointCen=[], pathVector=[], pathAngle=[];
console.log(pathPoint);
for(var i=0;i<pathPoint.length/2;i++){
	pathPointCen[i*2] = (pathPoint[i*2] - pathPoint[0]) * pathPointScalar;
	pathPointCen[i*2+1] = (pathPoint[i*2+1] - pathPoint[1]) * pathPointScalar;
}
console.log(pathPointCen);
for(var i=0; i<pathPointCen.length/2-1; i++){
	var vec;
	vec = new THREE.Vector3(pathPointCen[(i+1)*2+1]-pathPointCen[i*2+1],0,pathPointCen[(i+1)*2]-pathPointCen[i*2]);
	pathVector.push(vec);
}
console.log(pathVector);
for(var i=0; i<pathVector.length; i++){
	var deg;
	deg = pathVector[i].angleTo(new THREE.Vector3(0,0,1));
	if(pathVector[i].x>0)deg=-deg;
	pathAngle.push(deg);
}
console.log(pathAngle);