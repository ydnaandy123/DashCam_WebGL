/***How to use***/
/***
1.	Load src/VideoSource/pathPoint.js
2.	Load pathPoint_augment.js
3.	Initialize pathPoint_augment. EX:
	//add pathPoint
	var material_spheres = new THREE.MeshLambertMaterial( { color: 0xdddddd } ),
		sphere = new THREE.SphereGeometry( 15, 16, 8 );		
	var	pathPointAugment = new PathPointAugment(pathPoint,1000000);
	for(var i=0;i<pathPointAugment.pathPointCen.length/2;i++){
		var mesh = new THREE.Mesh( sphere, material_spheres );
		mesh.position.z = pathPointAugment.pathPointCen[i*2];
		mesh.position.x = pathPointAugment.pathPointCen[i*2+1];
		mesh.position.y = 15;
		mesh.receiveShadow = true;
		mesh.castShadow = true;
		scene.add( mesh );					
	}	
***/
function PathPointAugment(p,s){
	this.pathPointScalar = s;
	this.pathPoint = p;
	this.pathPointCen=[]; this.pathVector=[]; this.pathAngle=[];
	console.log(this.pathPointCen);
	for(var i=0;i<pathPoint.length/2;i++){
		this.pathPointCen[i*2] = (pathPoint[i*2] - pathPoint[0]) * -this.pathPointScalar;
		this.pathPointCen[i*2+1] = (pathPoint[i*2+1] - pathPoint[1]) * this.pathPointScalar;
	}
	console.log(this.pathPointCen);
	for(var i=0; i<this.pathPointCen.length/2-1; i++){
		var vec;
		vec = new THREE.Vector3(this.pathPointCen[(i+1)*2+1]-this.pathPointCen[i*2+1],0,this.pathPointCen[(i+1)*2]-this.pathPointCen[i*2]);
		this.pathVector.push(vec);
	}

	for(var i=0; i<this.pathVector.length; i++){
		var deg;
		deg = this.pathVector[i].angleTo(new THREE.Vector3(0,0,1));
		if(this.pathVector[i].x<0)deg=-deg;
		this.pathAngle.push(deg);
	}	
	function Hello(){
		console.log("hello");
	}
}

