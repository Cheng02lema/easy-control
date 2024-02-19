import * as THREE from '@/libs/three.weapp.js'
import getMTLLoader from '../../jsm/loaders/MTLLoader.js'; //加载obj 材质纹理贴图
import getOBJLoader from '../../jsm/loaders/OBJLoader.js'; //obj 格式三维模型加载器
import {
	OrbitControls
} from '../../jsm/controls/OrbitControls'; //相机旋转控制器




export default class ThreeBase {

	/**
	 * hscale : canvas 高度与屏幕高比例  如 0.3 
	 * width: 100%;
	 *height: 30vh;
	 */
	constructor(canvas, hscale = 1) {

		this.OBJLoader = getOBJLoader(THREE);
		this.MTLLoader = getMTLLoader(THREE);
		this.canvas = canvas

		this.window = THREE.global

		this.scaleHeight = hscale


	}


	start() {

		const canvas = this.canvas

		this.init()
		this.initScene()
		this.initRenderer()
		this.initCamera()

		this.initLight()
		// this.initUIControls()
		this.initOrbitControls()

		// this.loadModel()
		this.loadOBJ()
		this.onWindowResize()
		this.animate()
		
	


	}

	init() {

		const window = this.window;

		const canvas = this.canvas

		this.view = 'Perspective' //Orthographic
		this.width = window.innerWidth
		this.height = window.innerHeight
		//this.scaleHeight = 0.3 //三维场景显示占整个高度的30vh  这个必须等于css 设置的高度比

		this.scene = null
		this.camera = null

		this.orbitControls = null //相机旋转控制器
		this.renderer = null
		this.activeObj=null  //当前点击的sprite图标


		this.directLight = null
		this.clock = new THREE.Clock()


		//监听屏幕触摸事件
		this.canvas.addEventListener('touchstart', (event) => {
			this.onDocumentMouseDown(event)
		}, true)
		this.canvas.addEventListener('touchmove', (evt) => {
			this.onDocumentMouseMove(evt)
		}, true)

		this.canvas.addEventListener('touchend', (evt) => {
			this.onDocumentMouseUp(evt)
		}, true)


		this.canvas.addEventListener('resize', this.onWindowResize, false);

		//说明:类似虚函数，子类可以添加更多新的属性
		this.onInit()
		
		//预先加载监控图标
		const textureLoader = new THREE.TextureLoader()
		var url = "http://1.15.131.41:8009/textures/video2.png"
		var url2 = "http://1.15.131.41:8009/textures/video2-red.png"
		
		
		 this.texture_viodeo = textureLoader.load(url)
		 this.texture_viodeo_active = textureLoader.load(url2)
		
		// this.texture_viodeo_active = textureLoader.load(url2,function(texture){
		// 	 texture.needsUpdate = true;
		// })
		
		

	}


//监听触摸事件检测碰到的物体
	onDocumentMouseDown(event) {

		this.orbitControls.autoRotate = false
		//this.localRoateY('zg2', Math.PI / 4)
		//this.localMoveX('zg2',0.3)

		const canvas = this.canvas

		let rect = this.canvas.getBoundingClientRect()

		console.log("event=", event)

		// console.log(" canvas.clientHeight=",canvas.clientHeight)
		// console.log(" this.window.innerHeight=",this.window.innerHeight)
		// console.log(" canvas.getBoundingClientRect.height=",rect.height)

		let touch = event.touches[0];
		let raycaster = new THREE.Raycaster()
		let mouse = new THREE.Vector2()

		// 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
		mouse.x = (touch.clientX / this.window.innerWidth) * 2 - 1;

		mouse.y = -(touch.clientY / this.window.innerHeight / this.scaleHeight) * 2 + 1; //0.3 画布高度缩放比例

		// 通过摄像机和鼠标位置更新射线
		raycaster.setFromCamera(mouse, this.camera)

		let intersects = raycaster.intersectObjects(this.scene.children, false)
		
		if (intersects.length > 0) {
			// intersects[0].object.material.transparent = true
			// intersects[0].object.material.opacity = 0.3
			console.log("点击监控：",intersects[0].object)
			if(intersects[0].object.isSprite&&intersects[0].object.name&&intersects[0].object.name.indexOf('video')!=-1){
				
			
				let videoName=intersects[0].object.name
				intersects[0].object.material.map = this.texture_viodeo_active
				intersects[0].object.material.map.needsUpdate=true
				//console.log("点击监控：",intersects[0].object)
				this.activeObj=intersects[0].object
				
				
				
			}


		}

		/* if (intersects.length > 0) {

			if (intersects[0].object.name.indexOf('room') != -1 || intersects[0].object.name.indexOf('door') != -
				1) {
				intersects[0].object.material.transparent = true
				intersects[0].object.material.opacity = 0.8
				let mesh = intersects[0].object
			}

		}
	 */


	}

	onDocumentMouseMove(event) {



		// const canvas = this.canvas

		// let touch = event.touches[0];
		// let raycaster = new THREE.Raycaster()
		// let mouse = new THREE.Vector2()

		// // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
		// mouse.x = (touch.x / this.window.innerWidth) * 2 - 1;

		// mouse.y = -(touch.y / this.window.innerHeight) * 2 + 1; //0.3 画布高度缩放比例

		// // 通过摄像机和鼠标位置更新射线
		// raycaster.setFromCamera(mouse, this.camera)
		// let intersects = raycaster.intersectObjects(this.scene.children, true)

		// if (intersects.length > 0) {
		// 	intersects[0].object.material.transparent = true
		// 	intersects[0].object.material.opacity = 0.2


		// }

	}

	onDocumentMouseUp(event) {

     //console.log("MouseUp",this.activeObj.name)
   //    if(this.activeObj&&this.activeObj.isSprite&&this.activeObj.name&&this.activeObj.name.indexOf('video')!=-1)
	  // {
		 //  this.activeObj.material.map = this.texture_viodeo
		 //  this.activeObj.material.map.needsUpdate=true
	  // }
	  
	
	
	}

	onWindowResize() {

		const canvas = this.canvas
		this.camera.aspect = this.window.innerWidth / this.window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(this.window.innerWidth, this.window.innerHeight);

	}


	initRenderer() {

		const canvas = this.canvas

		this.renderer = new THREE.WebGLRenderer({
			canvas
		});
		
		/* wx.getSystemInfo({
		  success: function (res) {
		    //renderer.setPixelRatio(res.devicePixelRatio);
			console.log('devicePixelRatio 1=',res.devicePixelRatio)
		  }
		}) */
		
		this.renderer.setPixelRatio(this.window.devicePixelRatio);
		this.renderer.setSize(this.window.innerWidth, this.window.innerHeight * this.scaleHeight);
		//renderer.setSize(canvas.clientWidth,  canvas.clientHeight);

	}

	initScene() {

		const canvas = this.canvas

		this.scene = new THREE.Scene();
		//this.scene.fog = new THREE.Fog(0x000000, 100, 2100) //雾效
		this.scene.background = new THREE.Color(0xAAAAAA);



	}


	initCamera() {

		const canvas = this.canvas

		// const canvas = this.renderer.domElement;
		// const THREE = this.THREE


		let {
			width,
			height
		} = this.canvas.getBoundingClientRect()

		let aspect = width / height / 0.3;



		//camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 1, 2000);
		this.camera = new THREE.PerspectiveCamera(45, width / height * this.scaleHeight, 1, 2000);
		// camera.aspect = canvas.clientWidth / canvas.clientHeight;

		this.camera.position.z = -120;
		this.camera.position.y = 30;
		this.scene.add(this.camera);
	}

	initLight() {

		const canvas = this.canvas
		//半球光模拟室外 （天空光颜色，地面颜色，强度）
		var hemiLight = new THREE.HemisphereLight(0xddddff, 0xeeeeee, 0.5)
		hemiLight.position.set(0, 5, 0)
		this.scene.add(hemiLight)

		//平行光
	    let light = new THREE.DirectionalLight(0xFFFFff, 0.7)
	    light.position.set(0, 1, 0.7)
	    light.castShadow = true
	    this.scene.add(light)
		
		// let ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
		// this.scene.add(ambientLight); //加入环境光
		

		let pointLight = new THREE.PointLight(0xffffff, 0.8);

		this.camera.add(pointLight) //点光源加入到摄像机的位置


	}


	initOrbitControls() {

		const canvas = this.canvas
		this.orbitControls = new OrbitControls(this.camera, this.canvas);
		//this.orbitControls.enableRotate = false
		this.orbitControls.target.set(0, 0, 0);
		this.orbitControls.update();
		this.orbitControls.autoRotate = true


	}



	animate() {

		//const canvas=this.canvas
		const canvas = this.renderer.domElement;
		//this.canvas.requestAnimationFrame(this.animate);
		
		this.canvas.requestAnimationFrame(() => {
			this.animate()
		})
		this.render();

	}

	render() {
		if (this.resizeRendererToDisplaySize(this.renderer)) {
			const canvas = this.renderer.domElement;
			this.camera.aspect = canvas.clientWidth / canvas.clientHeight / this.scaleHeight;
			this.camera.updateProjectionMatrix();
		}


		this.camera.lookAt(this.scene.position);

		this.orbitControls.update()
		this.renderer.render(this.scene, this.camera);

		var T = this.clock.getDelta(); //返回时间单位：秒

		// window.addEventListener('resize', ()=>{this.onWindowResize()})


	}


	resizeRendererToDisplaySize(renderer) {


		const canvas = this.renderer.domElement;
		const width = this.canvas.clientWidth;
		const height = this.canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			renderer.setSize(width, height, false);
		}
		return needResize;
	}


	loadModel() {

		const canvas = this.canvas

		/* 
			let textureLoader = new THREE.TextureLoader();
			let texture = textureLoader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg');
			 */

		let loader = new this.OBJLoader();

		var modelUrl = 'http://1.15.131.41:8009/models/room3/room3.obj'
		var modelurl2 = 'https://threejs.org/examples/models/obj/male02/male02.obj'
		loader.load(modelUrl, (object) => {



			object.traverse((child) => {
				console.log('child', child)


				if (child.isMesh) {
					let colors = [0xf9d2cc, 0xdbcefb, 0xc5edee, 0xf7f7c9]
					// let index = random(0, colors.length)

					let index = Math.round(Math.random() * colors.length)

					child.material = new THREE.MeshLambertMaterial({
						color: colors[index]
					})
					child.material.needsUpdate = true
					//child.material.map = texture;
					//child.geometry.center()
					// child.material.needsUpdate = true
					// child.material.color.set(0x35d200)
					// child.material.needsUpdate = true
					var geometry = child.geometry
					geometry.computeBoundingBox();
					var centroid = new THREE.Vector3();
					centroid.addVectors(geometry.boundingBox.min, geometry.boundingBox.max);
					centroid.multiplyScalar(0.5);
					centroid.applyMatrix4(child.matrixWorld);

					//createText('1号展柜333',24, {x:centroid.x+3,y:centroid.y,z:centroid.z+3})
					
					

				}


			});


			this.scene.add(object);


			const box = new THREE.Box3().setFromObject(object);

			const boxSize = box.getSize(new THREE.Vector3()).length();
			const boxCenter = box.getCenter(new THREE.Vector3());

			// set the camera to frame the box
			this.frameArea(boxSize * 0.5, boxSize, boxCenter, this.camera);

			this.orbitControls.maxDistance = boxSize * 10;
			this.orbitControls.target.copy(boxCenter);

			this.orbitControls.update();

		}, null, null);

	}
	
	showLabels(child,center){
		
		let label=''
		if(child.name=='dapeng1'){
			label='1#大棚'
			this.createText(label, 28, {
				x: center.x,
				y: center.y,
				z: center.z
			})
		}
		if(child.name=='dapeng02'){
			label='2#大棚'
			this.createText(label, 28, {
				x: center.x,
				y: center.y,
				z: center.z
			})
		}
		
		
		
		if(child.name.indexOf('video')!=-1){
			console.log('child.name==',child.name)
			this.createMarkerSprite(child.name,center,-1,0)
		}
		
		
		
		
	}
	
	createMarkerSprite(devname,center,offsetX,offsetY) {
	
		// const textureLoader = new THREE.TextureLoader()
		// var url = "http://1.15.131.41:8009/textures/video2.png"
		
		// let texture1 = textureLoader.load(url)
		
		var spriteMaterial1 = new THREE.SpriteMaterial({
			map: this.texture_viodeo,
			sizeAttenuation: false, //不随精深改变大小
			rotation: 0, //弧度 Math.PI/2
			color: 0xffffff
	
		})
	
	
		let sprite = new THREE.Sprite(spriteMaterial1)
		console.log("devname=",devname)
		sprite.name=devname
		sprite.scale.set(0.1/2, 0.15/2, 0.1)
		sprite.center.set(0, 0)
		sprite.renderOrder = 10
		sprite.position.set(center.x+offsetX, center.y+offsetY, center.z)
		this.scene.add(sprite)
		
		
	
	}
	
	
	

	//将物体置于相机视野中心
	center(object) {
		const box = new THREE.Box3().setFromObject(object);

		const boxSize = box.getSize(new THREE.Vector3()).length();
		const boxCenter = box.getCenter(new THREE.Vector3());

		// set the camera to frame the box
		this.frameArea(boxSize * 0.5, boxSize, boxCenter, this.camera);

		this.orbitControls.maxDistance = boxSize * 10;
		this.orbitControls.target.copy(boxCenter);

		this.orbitControls.update();
	}

	//获取网格物体质心坐标
	getMeshCenter(mesh) {

		var geometry = mesh.geometry
		geometry.computeBoundingBox();
		var center = new THREE.Vector3();
		center.addVectors(geometry.boundingBox.min, geometry.boundingBox.max);
		center.multiplyScalar(0.5);
		center.applyMatrix4(mesh.matrixWorld);
		return center

	}


	//加载obj根式模型，模型与贴图是分别存于2个文件
	loadOBJ() {

		let manager = new THREE.LoadingManager();
		var mtlLoader = new this.MTLLoader(manager)
		/* let baseUrl = 'http://1.15.131.41:8009/models/room/'
		let objName = 'room.obj'
		let mtlName = 'room.mtl' */
		let baseUrl = 'http://1.15.131.41:8009/models/dapeng/'
		let objName = 'dapeng.obj'
		let mtlName = 'dapeng.mtl'

		mtlLoader.setPath(baseUrl)
		//mtlLoader.setTexturePath(baseUrl+"/maps")
		// mtlLoader.setCrossOrigin(true)
		mtlLoader.load(mtlName, materials => {
			materials.preload()
			var objLoader = new this.OBJLoader()
			objLoader.setPath(baseUrl)
			objLoader.setMaterials(materials)
			objLoader.load(objName, (object) => {
				
				// 发送自定义消息
				uni.$emit("loadok")

				//将场景置于相机视野中心
				this.center(object)

				object.traverse((child) => {
					
					console.log("child=", child)
					
					 if (child.isMesh) {
						 let center = this.getMeshCenter(child)
						 this.showLabels(child,center)
						 
						
						
						 // this.createText(child.name, 28, {
						 // 	x: center.x,
						 // 	y: center.y,
						 // 	z: center.z
						 // })
						// this.showAxis(center.x,center.y,center.z,3)
						
					
						 
					 }
					 
					 
										

					if (child.name.indexOf('zg2') != -1) {



						let colors = [0xf9d2cc, 0xdbcefb, 0xc5edee, 0xf7f7c9]
						// let index = random(0, colors.length)

						// let index = Math.round(Math.random() * colors.length)

						// child.material = new THREE.MeshLambertMaterial({
						// 	color: colors[index]
						// })
						// child.material.needsUpdate = true

						//中心位置显示文字标签
						let center = this.getMeshCenter(child)
						console.log("center=", center)
						this.createText(child.name, 28, {
							x: center.x,
							y: center.y,
							z: center.z
						})
						
						//this.showAxis(center.x,center.y,center.z,3)



					}
					if (child.name.indexOf('door') != -1) {

						child.material.color.set(0x00ff00)
						child.material.needsUpdate = true
						child.geometry.center()

					}
					child.castShadow = true
					child.receiveShadow = true

				})

				object.name = 'group_hot'
				// vm.group_scence.add(object)
				this.scene.add(object)

			})

		})
	}


showAxis(x,y,z,axisLength) {
	
    let org = new THREE.Group()
    let axisZ = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), axisLength, 0x0000ff)
    let axisX = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), axisLength, 0x00ff00)
    let axisY = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), axisLength, 0xff0000)
    org.add(axisZ).add(axisX).add(axisY)

    org.position.set(x, y, z)
    this.scene.add(org)

  }


	localRoateY(name, angle) {
		//geometry放到原点-旋转-放回原处-刷新显示的
		let obj = this.scene.getObjectByName(name)
		//先获取geometey的中心点位置并留存
		var center = this.getMeshCenter(obj)
		let x = center.x;
		let y = center.y
		let z = center.z
		
		// 把对象放到坐标原点 
		obj.geometry.center();
		obj.geometry.rotateY(angle)
		obj.geometry.translate(x, y, z);
		// this.renderer.render(this.scene, this.camera)

	}
	
	localMoveX(name, distance) {
		//geometry放到原点-旋转-放回原处-刷新显示的
		let obj = this.scene.getObjectByName(name)
		//先获取geometey的中心点位置并留存
		var center = this.getMeshCenter(obj)
		let x = center.x;
		let y = center.y
		let z = center.z
		
		// 把对象放到坐标原点 
		obj.geometry.center();
		obj.geometry.translate(distance,0,0)
		obj.geometry.translate(x, y, z);
		// this.renderer.render(this.scene, this.camera)
	
	}


	frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {

		const canvas = this.canvas

		const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
		const halfFovY = THREE.Math.degToRad(camera.fov * .5);
		const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
		// compute a unit vector that points in the direction the camera is now
		// in the xz plane from the center of the box
		const direction = (new THREE.Vector3())
			.subVectors(camera.position, boxCenter)
			.multiply(new THREE.Vector3(1, 1, 1))
			.normalize();

		// move the camera to a position distance units way from the center
		// in whatever direction the camera was from the center already
		camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
		//camera.position.y=20

		// pick some near and far values for the frustum that
		// will contain the box.
		camera.near = boxSize / 100;
		camera.far = boxSize * 100;

		camera.updateProjectionMatrix();

		// point the camera to look at the center of the box
		camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
	}


	/* 绘制圆角矩形 */
	roundRect(ctx, x, y, w, h, r) {


		ctx.beginPath()
		ctx.moveTo(x + r, y)
		ctx.lineTo(x + w - r, y)
		ctx.quadraticCurveTo(x + w, y, x + w, y + r)
		ctx.lineTo(x + w, y + h - r)
		ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
		ctx.lineTo(x + r, y + h)
		ctx.quadraticCurveTo(x, y + h, x, y + h - r)
		ctx.lineTo(x, y + r)
		ctx.quadraticCurveTo(x, y, x + r, y)
		ctx.closePath()
		ctx.fill()
		ctx.stroke()

	}


	// 利用canvas的属性，我们封装一个函数，根据数据的文字内容，创建一个canvas画布
	createText(text, fontsize, pos) {

		const canvas = this.canvas

		// let canvas = document.createElement('canvas');

		uni.createSelectorQuery().select('#txt')
			.node()
			.exec((res) => {

				const canvas = res[0].node


				canvas.width = 120; // 设置画布的宽度
				canvas.height = 120; // 设置画布的高度
				let context = canvas.getContext('2d'); // 设置画布内2D相关属性

				context.clearRect(0, 0, canvas.width, canvas.height);


				let fontface = ' Microsoft YaHei Arial'
				// context.font = 'bold ' + fontsize + 'px ' + fontface;
				context.font = fontsize + 'px ' + fontface;

				//let metrics = context.measureText(text)

				// var ratio = getPixelRatio(context);
				let padding = 0
				// let textWidth = metrics.width + fontsize + padding * 2
				let textWidth = canvas.width

				//context.fillStyle = 'rgba(255,255,255,1)';
				//context.fillRect(0, 0, textWidth, fontsize * 1.4);



				context.fillStyle = '#ffff00';
				context.textAlign = 'center';
				context.textBaseline = 'middle';


				//context.fillText(text, textWidth / 2, fontsize * 1.6 / 2);
				context.fillText(text, textWidth / 2, textWidth / 2);
				// context.fillText(text, borderThickness, fontsize + borderThickness)

				let picUrl = canvas.toDataURL("image/png"); // 将canvas转为图片格式
				const texture2 = new THREE.TextureLoader().load('../../static/6起点.png');

				const texture = new THREE.TextureLoader().load(picUrl);
				texture.needsUpdate = true //注意这句不能少
				var spriteMaterial = new THREE.SpriteMaterial({
					map: texture, //设置精灵纹理贴图
					sizeAttenuation: false, //不随精深改变大小
					rotation: 0, //弧度 Math.PI/2
					color: 0xffffff,
					// transparent: true,
					// opacity: 0.5,
				});
				// 创建精灵模型对象
				spriteMaterial.depthTest = false;

				//spriteMaterial.blending = THREE.AdditiveBlending;

				var sprite = new THREE.Sprite(spriteMaterial);
				sprite.scale.set(.2, .2, 1);
				sprite.position.set(pos.x, pos.y + 2, pos.z)

				//group.add(sprite);

				this.scene.add(sprite)


			})


	}



	onInit() {

	}




}
