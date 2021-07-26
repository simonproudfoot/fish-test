<template>
<div>
    <div id="container"></div>
    <!-- <label for="">Rotate x</label>
    <input type="number" v-model="rotationX.min" name="" id="">
    <br>
    <label for="">Rotate y</label>
    <input type="number" v-model="rotationY" name="" id="">
    <input type="number" v-model="swimSpeed" name="" id=""> -->
</div>
</template>

<script>
// To point nose up and down
// rotateX between -0.2 / 0.2

// rotate nose left and right 
// RotateY -1 / -2
// .gltf recommended file
import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap'
export default {
    name: 'ThreeTest',
    data() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            fish: {},
        
            fishUlr: require('@/assets/shark.glb'),
            swimSpeed: 0.001,
            rotationX: {
                min: -0.2,
                max: -0.2
            },
            rotationY: -1,
        }
    },
    methods: {
        init: function () {
            let container = document.getElementById('container');

            // camera
            this.camera = new Three.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 0.01, 30);
            this.camera.position.z = 10;

            this.scene = new Three.Scene();

            // background
            this.scene.background = new Three.Color(0x096AB2);

            // LIGHT
            var spotLight = new Three.SpotLight(0x2dc3d7);
            spotLight.position.set(100, 1000, 100);
            spotLight.castShadow = true;
            spotLight.shadowMapWidth = 1024;
            spotLight.shadowMapHeight = 1024;
            spotLight.shadowCameraNear = 900;
            spotLight.shadowCameraFar = 4000;
            spotLight.shadowCameraFov = 10;
            this.scene.add(spotLight);

            var light = new Three.HemisphereLight(0x2dc3d7, 0xF87A36, 1.9);
            this.scene.add(light);

            var dirLight = new Three.DirectionalLight(0x2dc3d7, 0.9);
            dirLight.position.set(1, 1, 1);
            this.scene.add(dirLight);

            // Load object
            //  let loader = new OBJLoader();

            const gltfLoader = new GLTFLoader();

            gltfLoader.load(this.fishUlr, (gltf) => {

                this.scene.add(gltf.scene);

        
        
             

                gsap.fromTo(gltf.scene.rotation, 3, { y: -0.5, }, { y: 0.5, yoyo: true, repeat: -1, ease: 'easeInOut', delay: 1 })
                // gsap.fromTo(gltf.scene.skeleton.bones[1].position, 3, { y: -0.5, }, { y: 0.5, yoyo: true, repeat: -1, ease: 'easeInOut', delay: 1 })

            })

            // set object material
            var material_flat = new Three.MeshPhongMaterial({
                color: 0xF87A36,
                shading: Three.FlatShading,
                shininess: 400,
                specularity: 10,
                specular: 0xF2B06C,
            });

            var world_mesh = new Three.Mesh(this.fish, material_flat);
            world_mesh.castShadow = true;
            world_mesh.receiveShadow = true;

            // RENDER
            this.renderer = new Three.WebGLRenderer({ antialias: true });
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(this.renderer.domElement);

        },
        animate() {
            this.renderer.render(this.scene, this.camera);
            this.camera.lookAt(this.scene.position);

            requestAnimationFrame(() => {
                this.animate();
            });
        }
    },
    mounted() {
        this.init();
        this.animate();

    }
}
</script>

<style scoped>
#container {
    width: 100vw;
    height: 100vh;
color: rgb(112, 207, 207);
}
</style>
