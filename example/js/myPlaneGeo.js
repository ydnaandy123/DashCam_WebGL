function myPlaneGeo(pn, pd){
	this.normal = pn;
	this.distance = pd;		
	this.color = new THREE.Color(Math.random() * 0xffffff);	
	
	this.indices = [];	
	
	this.geometryPCL = new THREE.Geometry();	
	this.tile = new THREE.Mesh();
	this.arrowHelper ;
	this.max = new THREE.Vector3();
	this.min = new THREE.Vector3();
					
	this.createPCL = function () {
		//this.geometryPCL.verticesNeedUpdate = true;
		//this.geometryPCL.colorsNeedUpdate = true;
		this.geometryPCL.computeBoundingBox();
		this.max = new THREE.Vector3(this.geometryPCL.boundingBox.max.x, this.geometryPCL.boundingBox.max.y, this.geometryPCL.boundingBox.max.z);
		this.min = new THREE.Vector3(this.geometryPCL.boundingBox.min.x, this.geometryPCL.boundingBox.min.y, this.geometryPCL.boundingBox.min.z);	
    };	
	this.createPL = function () {
		var geometry = new THREE.PlaneGeometry( textWidth, textHeigh, 100, 100);
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );
		var plane = new THREE.Mesh( geometry, material );
		//plane.rotation.x = - Math.PI/2;
		plane.position.x = Math.round(Math.abs(max.x + min.x)/2);
		plane.position.y = Math.round(Math.abs(max.y + min.y)/2);
		plane.position.z = Math.round(Math.abs(max.z + min.z)/2);
		//plane.rotateY(-main_rotation * Math.PI / 180.0);	
		plane.rotateX(-Math.PI/2);
    };		
	this.createNormal = function (){		
		var origin = new THREE.Vector3( Math.round((this.max.x + this.min.x)/2), Math.round((this.max.y + this.min.y)/2), Math.round((this.max.z + this.min.z)/2));
		var dir = this.normal.normalize();
		var length = 5;
		var hex = this.color.getHex();

		this.arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
	}
	this.createTile = function (){		
		var geometry = new THREE.PlaneGeometry( 20, 65, 200, 500);
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );		
		var plane = new THREE.Mesh( geometry, material );	
		this.tile = plane;
	}	
}