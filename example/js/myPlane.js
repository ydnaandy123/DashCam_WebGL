function myPlane(pn, pd, cd, w, h){
	this.normal = [];
	this.distance = [];		
	this.positions = [];
	this.colors = [];				
	this.color = new THREE.Color(Math.random() * 0xffffff);	
	
	this.color_data = cd, this.width = w, this.height = h;
	this.indices = [];	
	
	this.geometryPCL = new THREE.BufferGeometry();		
	this.tile = new THREE.Mesh();
	this.arrowHelper ;
	this.max = new THREE.Vector3();
	this.min = new THREE.Vector3();
	this.aveNormal = new THREE.Vector3();
	this.aveDist;
	
	this.normal.push(pn);
	this.distance.push(pd);
	
	this.averageCal = function () {
		var d=0, n=new THREE.Vector3(0,0,0);
		var num_points = this.indices.length;
		if(num_points>0){
			for(var i=0; i<num_points; i++){
				d += this.distance[i];
				n.add(this.normal[i]);
			}
			this.aveDist = d/num_points;
			this.aveNormal = n.divideScalar(num_points).normalize();
		}
    };	
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
		this.geometryPCL = geometry;
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
		/*var origin = new THREE.Vector3( Math.round((this.max.x + this.min.x)/2), Math.round((this.max.y + this.min.y)/2), Math.round((this.max.z + this.min.z)/2));
		var dir = this.normal.normalize();
		var length = 5;
		var hex = this.color.getHex();

		this.arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );*/
	}
	this.createTile = function (n, w, h, off){
		n =  this.aveNormal;
		var width = w || 10;
		var height = h || 10;
		var geometry = new THREE.PlaneGeometry( width, height, width*5, height*5);
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, vertexColors: THREE.VertexColors } );		
		var plane = new THREE.Mesh( geometry, material );
		plane.lookAt(n);
		plane.translateOnAxis(new THREE.Vector3(0,0,1), -this.aveDist);
		if(off != undefined){			
			plane.translateOnAxis(new THREE.Vector3(0,1,0), height/2 - off);
		}
		plane.updateMatrix();
		
		for ( var i = 0; i < geometry.vertices.length; i ++ ) {
			var vec = geometry.vertices[i].clone().applyProjection(plane.matrix);
				
			lng = Math.atan(-vec.x / vec.z) / Math.PI * 180;
			if(vec.x>=0 && vec.z>=0) lng = lng + 180;							
			else if(vec.x<=0 && vec.z>=0) lng = lng - 180;
			r = new THREE.Vector3(vec.x, 0, vec.z).length();
			lat = Math.atan(vec.y / r) / Math.PI * 180;
			
			var color_canvas_x = parseInt(((lng + 180) / 360) * this.width);
			var color_canvas_y = parseInt((-(lat - 90) / 180) * this.height);
			var color_index = color_canvas_y * this.width * 4 + color_canvas_x * 4;
			geometry.colors[i] = new THREE.Color( (this.color_data[color_index + 0]) / 255.0, (this.color_data[color_index + 1]) / 255.0, (this.color_data[color_index + 2]) / 255.0 );
			
		}	
		// face color
		var faceIndices = [ 'a', 'b', 'c' ];
		for ( var i = 0; i < geometry.faces.length; i ++ ) {
			f  = geometry.faces[ i ];
			for( var j = 0; j < 3; j++ ) {
				vertexIndex = f[ faceIndices[ j ] ];
				f.vertexColors[ j ] = geometry.colors[vertexIndex];
			}
		}
					
		this.tile = plane;
	}	
}