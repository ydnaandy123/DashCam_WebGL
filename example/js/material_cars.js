/***How to use***/
/***
1. load mrdoob-three.js-5c6ec4a/examples/js/loaders/BinaryLoader.js
2. load material_cars.js
3. add button and css. EX:
	<style>
		canvas {
			position: fixed;
			top: 0;
			left: 0;
		}
		body {
			background:#000;
			color:#fff;
			padding:0;
			margin:0;
			overflow:hidden;
			font-family:georgia;
			text-align:center;
		}
		h1 { }
		a { color:skyblue; text-decoration:none }
		canvas { pointer-events:none; z-index:10; position:relative; }

		#d { position:absolute; width: 100%; text-align:center; margin:1em 0 -4.5em 0; z-index:1000; }

		.bwrap { margin:0.5em 0 0 0 }
		button { font-family:georgia; border:0; background:#000; color:#fff; padding:0.2em 0.5em; cursor:pointer; border-radius:3px; }
		button:hover { background:#333 }
		#buttons_cars button { color:#fa0 }

		#car_info { text-align:center; }
		#car_name { font-size:1em }
		#car_author { font-size:1em }

		#oldie { background:rgb(50,0,0) !important; color:#fff !important; margin-top:7em!important }
	</style>
--------------------------------------------------------------------------------------------------------
	<div id="d">
		<div id="info">
			<a href="http://threejs.org" target="_blank">three.js</a> webgl demo :
			texture by <a href="http://www.humus.name/index.php?page=Textures" target="_blank">Humus</a> :
			<span id="car_info">
				<span id="car_name">Bugatti Veyron model</span>
				by <span id="car_author"><a href="http://artist-3d.com/free_3d_models/dnm/model_disp.php?uid=1129" target="_blank">Troyano</a></span>
			</span>

		</div>

		<div id="buttons_cars" class="bwrap">
			<button id="veyron">Bugatti Veyron</button>
			<button id="gallardo">Lamborghini Gallardo</button>
			<button id="f50">Ferrari F50</button>
			<button id="camaro">Chevrolet Camaro</button>
		</div>

		<div id="buttons_materials" class="bwrap"></div>
	</div>
4. initial CARS. EX:
	//load cars
	carSize = 0.1;
	carLoader = new THREE.BinaryLoader();
	carLoader.load( CARS[ "veyron" ].url, function( geometry ) { createScene( geometry, "veyron" ) } );
	for( var c in CARS ) initCarButton( c );
***/


var carName, carSize = 0.5, CARS;
var CARS = {

	"veyron": 	{

		name:	"Bugatti Veyron",
		url: 	"../libs/mrdoob-three.js-5c6ec4a/examples/obj/veyron/VeyronNoUv_bin.js",
		author: '<a href="http://artist-3d.com/free_3d_models/dnm/model_disp.php?uid=1129" target="_blank">Troyano</a>',
		init_rotation: [ 0, 0, 0 ],
		scale: 5.5,
		init_material: 4,
		body_materials: [ 2 ],

		object: null,
		buttons: null,
		materials: null

	},

	"gallardo": {

		name: 	"Lamborghini Gallardo",
		url:	"../libs/mrdoob-three.js-5c6ec4a/examples/obj/gallardo/GallardoNoUv_bin.js",
		author: '<a href="http://artist-3d.com/free_3d_models/dnm/model_disp.php?uid=1711" target="_blank">machman_3d</a>',
		init_rotation: [ 0, 0, 0 ],
		scale: 3.7,
		init_material: 9,
		body_materials: [ 3 ],

		object:	null,
		buttons: null,
		materials: null

	},

	"f50": {

		name: 	"Ferrari F50",
		url:	"../libs/mrdoob-three.js-5c6ec4a/examples/obj/f50/F50NoUv_bin.js",
		author: '<a href="http://artist-3d.com/free_3d_models/dnm/model_disp.php?uid=1687" target="_blank">daniel sathya</a>',
		init_rotation: [ 0, 0, 0 ],
		scale: 0.175,
		init_material: 2,
		body_materials: [ 3, 6, 7, 8, 9, 10, 23, 24 ],

		object:	null,
		buttons: null,
		materials: null

	},

	"camaro": {

		name: 	"Chevrolet Camaro",
		url:	"../libs/mrdoob-three.js-5c6ec4a/examples/obj/camaro/CamaroNoUv_bin.js",
		author: '<a href="http://www.turbosquid.com/3d-models/blender-camaro/411348" target="_blank">dskfnwn</a>',
		init_rotation: [ 0.0, 0.0, 0.0 /*0, 1, 0*/ ],
		scale: 75,
		init_material: 0,
		body_materials: [ 0 ],

		object:	null,
		buttons: null,
		materials: null

	}

};
			
var r = "../libs/mrdoob-three.js-5c6ec4a/examples/textures/cube/Bridge2/";
var urls = [ r + "posx.jpg", r + "negx.jpg",
			 r + "posy.jpg", r + "negy.jpg",
			 r + "posz.jpg", r + "negz.jpg" ];

var textureCube = THREE.ImageUtils.loadTextureCube( urls );
textureCube.format = THREE.RGBFormat;

// common materials

var mlib = {

"Orange": 	new THREE.MeshLambertMaterial( { color: 0xff6600, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.3 } ),
"Blue": 	new THREE.MeshLambertMaterial( { color: 0x001133, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.3 } ),
"Red": 		new THREE.MeshLambertMaterial( { color: 0x660000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
"Black": 	new THREE.MeshLambertMaterial( { color: 0x000000, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.15 } ),
"White":	new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),

"Carmine": 	new THREE.MeshPhongMaterial( { color: 0x770000, specular:0xffaaaa, envMap: textureCube, combine: THREE.MultiplyOperation } ),
"Gold": 	new THREE.MeshPhongMaterial( { color: 0xaa9944, specular:0xbbaa99, shininess:50, envMap: textureCube, combine: THREE.MultiplyOperation } ),
"Bronze":	new THREE.MeshPhongMaterial( { color: 0x150505, specular:0xee6600, shininess:10, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.25 } ),
"Chrome": 	new THREE.MeshPhongMaterial( { color: 0xffffff, specular:0xffffff, envMap: textureCube, combine: THREE.MultiplyOperation } ),

"Orange metal": new THREE.MeshLambertMaterial( { color: 0xff6600, envMap: textureCube, combine: THREE.MultiplyOperation } ),
"Blue metal": 	new THREE.MeshLambertMaterial( { color: 0x001133, envMap: textureCube, combine: THREE.MultiplyOperation } ),
"Red metal": 	new THREE.MeshLambertMaterial( { color: 0x770000, envMap: textureCube, combine: THREE.MultiplyOperation } ),
"Green metal": 	new THREE.MeshLambertMaterial( { color: 0x007711, envMap: textureCube, combine: THREE.MultiplyOperation } ),
"Black metal":	new THREE.MeshLambertMaterial( { color: 0x222222, envMap: textureCube, combine: THREE.MultiplyOperation } ),

"Pure chrome": 	new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: textureCube } ),
"Dark chrome":	new THREE.MeshLambertMaterial( { color: 0x444444, envMap: textureCube } ),
"Darker chrome":new THREE.MeshLambertMaterial( { color: 0x222222, envMap: textureCube } ),

"Black glass": 	new THREE.MeshLambertMaterial( { color: 0x101016, envMap: textureCube, opacity: 0.975, transparent: true } ),
"Dark glass":	new THREE.MeshLambertMaterial( { color: 0x101046, envMap: textureCube, opacity: 0.25, transparent: true } ),
"Blue glass":	new THREE.MeshLambertMaterial( { color: 0x668899, envMap: textureCube, opacity: 0.75, transparent: true } ),
"Light glass":	new THREE.MeshBasicMaterial( { color: 0x223344, envMap: textureCube, opacity: 0.25, transparent: true, combine: THREE.MixOperation, reflectivity: 0.25 } ),

"Red glass":	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.75, transparent: true } ),
"Yellow glass":	new THREE.MeshLambertMaterial( { color: 0xffffaa, opacity: 0.75, transparent: true } ),
"Orange glass":	new THREE.MeshLambertMaterial( { color: 0x995500, opacity: 0.75, transparent: true } ),

"Orange glass 50":	new THREE.MeshLambertMaterial( { color: 0xffbb00, opacity: 0.5, transparent: true } ),
"Red glass 50": 	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ),

"Fullblack rough":	new THREE.MeshLambertMaterial( { color: 0x000000 } ),
"Black rough":		new THREE.MeshLambertMaterial( { color: 0x050505 } ),
"Darkgray rough":	new THREE.MeshLambertMaterial( { color: 0x090909 } ),
"Red rough":		new THREE.MeshLambertMaterial( { color: 0x330500 } ),

"Darkgray shiny":	new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x050505 } ),
"Gray shiny":		new THREE.MeshPhongMaterial( { color: 0x050505, shininess: 20 } )

};

// Gallardo materials

CARS[ "gallardo" ].materials = {

	body: [

		[ "Orange", 	mlib[ "Orange" ] ],
		[ "Blue", 		mlib[ "Blue" ] ],
		[ "Red", 		mlib[ "Red" ] ],
		[ "Black", 		mlib[ "Black" ] ],
		[ "White", 		mlib[ "White" ] ],

		[ "Orange metal", 	mlib[ "Orange metal" ] ],
		[ "Blue metal", 	mlib[ "Blue metal" ] ],
		[ "Green metal", 	mlib[ "Green metal" ] ],
		[ "Black metal", 	mlib[ "Black metal" ] ],

		[ "Carmine", 	mlib[ "Carmine" ] ],
		[ "Gold", 		mlib[ "Gold" ] ],
		[ "Bronze", 	mlib[ "Bronze" ] ],
		[ "Chrome", 	mlib[ "Chrome" ] ]

	]

};

m = CARS[ "gallardo" ].materials;
mi = CARS[ "gallardo" ].init_material;

CARS[ "gallardo" ].mmap = {

	0: mlib[ "Pure chrome" ], 	// wheels chrome
	1: mlib[ "Black rough" ],   // tire
	2: mlib[ "Black glass" ], 	// windshield
	3: m.body[ mi ][ 1 ], 		// body
	4: mlib[ "Red glass" ],    	// back lights
	5: mlib[ "Yellow glass" ],  // front lights
	6: mlib[ "Dark chrome" ]	// windshield rim

};

// Veyron materials

CARS[ "veyron" ].materials = {

	body: [

		[ "Orange metal", 	mlib[ "Orange metal" ] ],
		[ "Blue metal", 	mlib[ "Blue metal" ] ],
		[ "Red metal", 		mlib[ "Red metal" ] ],
		[ "Green metal",	mlib[ "Green metal" ] ],
		[ "Black metal", 	mlib[ "Black metal" ] ],

		[ "Gold", 		mlib[ "Gold" ] ],
		[ "Bronze", 	mlib[ "Bronze" ] ],
		[ "Chrome", 	mlib[ "Chrome" ] ]

	],

};

m = CARS[ "veyron" ].materials;
mi = CARS[ "veyron" ].init_material;

CARS[ "veyron" ].mmap = {

	0: mlib[ "Black rough" ],		// tires + inside
	1: mlib[ "Pure chrome" ],		// wheels + extras chrome
	2: m.body[ mi ][ 1 ], 			// back / top / front torso
	3: mlib[ "Dark glass" ],		// glass
	4: mlib[ "Pure chrome" ],		// sides torso
	5: mlib[ "Pure chrome" ],		// engine
	6: mlib[ "Red glass 50" ],		// backlights
	7: mlib[ "Orange glass 50" ]	// backsignals

};

// F50 materials

CARS[ "f50" ].materials = {

	body: [

		[ "Orange", 	mlib[ "Orange" ] ],
		[ "Blue", 		mlib[ "Blue" ] ],
		[ "Red", 		mlib[ "Red" ] ],
		[ "Black", 		mlib[ "Black" ] ],
		[ "White", 		mlib[ "White" ] ],

		[ "Orange metal", 	mlib[ "Orange metal" ] ],
		[ "Blue metal", 	mlib[ "Blue metal" ] ],
		[ "Black metal", 	mlib[ "Black metal" ] ],

		[ "Carmine", 	mlib[ "Carmine" ] ],
		[ "Gold", 		mlib[ "Gold" ] ],
		[ "Bronze", 	mlib[ "Bronze" ] ],
		[ "Chrome", 	mlib[ "Chrome" ] ]

	],

};

m = CARS[ "f50" ].materials;
mi = CARS[ "f50" ].init_material;

CARS[ "f50" ].mmap = {

	0:  mlib[ "Dark chrome" ], 		// interior + rim
	1:  mlib[ "Pure chrome" ], 		// wheels + gears chrome
	2:  mlib[ "Blue glass" ], 		// glass
	3:  m.body[ mi ][ 1 ], 			// torso mid + front spoiler
	4:  mlib[ "Darkgray shiny" ], 	// interior + behind seats
	5:  mlib[ "Darkgray shiny" ], 	// tiny dots in interior
	6:  m.body[ mi ][ 1 ], 			// back torso
	7:  m.body[ mi ][ 1 ], 			// right mirror decal
	8:  m.body[ mi ][ 1 ], 			// front decal
	9:  m.body[ mi ][ 1 ], 			// front torso
	10: m.body[ mi ][ 1 ], 			// left mirror decal
	11: mlib[ "Pure chrome" ], 		// engine
	12: mlib[ "Darkgray rough" ],	// tires side
	13: mlib[ "Darkgray rough" ],	// tires bottom
	14: mlib[ "Darkgray shiny" ], 	// bottom
	15: mlib[ "Black rough" ],		// ???
	16: mlib[ "Orange glass" ],		// front signals
	17: mlib[ "Dark chrome" ], 		// wheels center
	18: mlib[ "Red glass" ], 		// back lights
	19: mlib[ "Black rough" ], 		// ???
	20: mlib[ "Red rough" ], 		// seats
	21: mlib[ "Black rough" ], 		// back plate
	22: mlib[ "Black rough" ], 		// front light dots
	23: m.body[ mi ][ 1 ], 			// back torso
	24: m.body[ mi ][ 1 ] 			// back torso center

};


// Camero materials

CARS[ "camaro" ].materials = {

	body: [

		[ "Orange", 	mlib[ "Orange" ] ],
		[ "Blue", 		mlib[ "Blue" ] ],
		[ "Red", 		mlib[ "Red" ] ],
		[ "Black", 		mlib[ "Black" ] ],
		[ "White", 		mlib[ "White" ] ],

		[ "Orange metal", 	mlib[ "Orange metal" ] ],
		[ "Blue metal", 	mlib[ "Blue metal" ] ],
		[ "Red metal", 		mlib[ "Red metal" ] ],
		[ "Green metal", 	mlib[ "Green metal" ] ],
		[ "Black metal", 	mlib[ "Black metal" ] ],

		[ "Gold", 		mlib[ "Gold" ] ],
		[ "Bronze", 	mlib[ "Bronze" ] ],
		[ "Chrome", 	mlib[ "Chrome" ] ]

	],

};

m = CARS[ "camaro" ].materials;
mi = CARS[ "camaro" ].init_material;

CARS[ "camaro" ].mmap = {

	0: m.body[ mi ][ 1 ], 			// car body
	1: mlib[ "Pure chrome" ], 		// wheels chrome
	2: mlib[ "Pure chrome" ], 		// grille chrome
	3: mlib[ "Dark chrome" ], 		// door lines
	4: mlib[ "Light glass" ], 		// windshield
	5: mlib[ "Gray shiny" ],        // interior
	6: mlib[ "Black rough" ],       // tire
	7: mlib[ "Fullblack rough" ],   // tireling
	8: mlib[ "Fullblack rough" ]    // behind grille

};


function initCarButton( car ) {

	$( car ).addEventListener( 'click', function() {

		if ( ! CARS[ car ].object ) {
			carLoader.load( CARS[ car ].url, function( geometry ) { createScene( geometry, car ) } );

		} else {

			switchCar( car );
			carName = car;
		}

	}, false );

}

function $( id ) { return document.getElementById( id ) }
function button_name( car, index ) { return "m_" + car  + "_" + index }

function switchCar( car ) {

	for ( var c in CARS ) {

		if ( c != car && CARS[ c ].object ) {

			CARS[ c ].object.visible = false;
			CARS[ c ].buttons.style.display = "none";

		}
	}

	CARS[ car ].object.visible = true;
	CARS[ car ].buttons.style.display = "block";

	$( "car_name" ).innerHTML = CARS[ car ].name + " model";
	$( "car_author" ).innerHTML = CARS[ car ].author;

}

function createButtons( materials, car ) {

	var buttons, i, src = "";

	for( i = 0; i < materials.length; i ++ ) {

		src += '<button id="' + button_name( car, i ) + '">' + materials[ i ][ 0 ] + '</button> ';

	}

	buttons = document.createElement( "div" );
	buttons.innerHTML = src;

	$( "buttons_materials" ).appendChild( buttons );

	return buttons;

}

function attachButtonMaterials( materials, faceMaterial, material_indices, car ) {

	for( var i = 0; i < materials.length; i ++ ) {

		$( button_name( car, i ) ).counter = i;
		$( button_name( car, i ) ).addEventListener( 'click', function() {

			for ( var j = 0; j < material_indices.length; j ++ ) {

				faceMaterial.materials[ material_indices [ j ] ] = materials[ this.counter ][ 1 ];

			}

		}, false );

	}

}
function createScene( geometry, car ) {
	carName = car;
	var m = new THREE.MeshFaceMaterial(),
		s = CARS[ car ].scale * carSize,
		r = CARS[ car ].init_rotation,
		materials = CARS[ car ].materials,
		mi = CARS[ car ].init_material,
		bm = CARS[ car ].body_materials;

	for ( var i in CARS[ car ].mmap ) {

		m.materials[ i ] = CARS[ car ].mmap[ i ];

	}

	var mesh = new THREE.Mesh( geometry, m );

	mesh.rotation.x = r[ 0 ];
	mesh.rotation.y = r[ 1 ];
	mesh.rotation.z = r[ 2 ];

	mesh.scale.x = mesh.scale.y = mesh.scale.z = s;
	mesh.geometry.computeBoundingBox();
	mesh.position.y = (mesh.position.y - mesh.geometry.boundingBox.min.y)*s;
	scene.add( mesh );

	CARS[ car ].object = mesh;

	CARS[ car ].buttons = createButtons( materials.body, car );
	attachButtonMaterials( materials.body, m, bm, car );

	switchCar( car );

}
				