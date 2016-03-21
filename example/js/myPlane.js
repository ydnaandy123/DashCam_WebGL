function myPlane(pn, pd){
	this.normal = pn;
	this.distance = pd;		
	this.positions = [];
	this.colors = [];				
	this.color = new THREE.Color(Math.random() * 0xffffff);	
	
	this.indices = [];	
	
	this.geometryPL = new THREE.BufferGeometry();	
	this.arrowHelper ;
	this.max = new THREE.Vector3();
	this.min = new THREE.Vector3();
					
	this.createPCL = function () {
		var geometry = new THREE.BufferGeometry();
		var num_points = this.indices.length;
		var planepositions = new Float32Array(num_points * 3);
		var planecolors = new Float32Array(num_points * 3);
		var geometryP = new THREE.Geometry();
		
		for(np=0; np<num_points; np++){
			planepositions[3 * np + 0] = this.positions[3 * np + 0];
			planepositions[3 * np + 1] = this.positions[3 * np + 1];
			planepositions[3 * np + 2] = this.positions[3 * np + 2];
			
			planecolors[3 * np + 0] = this.colors[3 * np + 0];
			planecolors[3 * np + 1] = this.colors[3 * np + 1];
			planecolors[3 * np + 2] = this.colors[3 * np + 2];
			
			geometryP.vertices.push( new THREE.Vector3(planepositions[3 * np + 0],
			planepositions[3 * np + 1], planepositions[3 * np + 2]) );						
		}
		
		geometry.addAttribute('position', new THREE.BufferAttribute(planepositions, 3));
		geometry.addAttribute('color', new THREE.BufferAttribute(planecolors, 3));
		geometry.computeBoundingBox();	
		this.geometryPL = geometry;
		this.max = new THREE.Vector3(geometry.boundingBox.max.x, geometry.boundingBox.max.y, geometry.boundingBox.max.z);
		this.min = new THREE.Vector3(geometry.boundingBox.min.x, geometry.boundingBox.min.y, geometry.boundingBox.min.z);	
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
}