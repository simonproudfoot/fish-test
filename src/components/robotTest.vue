<template>
<div>
    <div id="container"></div>
</div>
</template>

<script>
// To point nose up and down
// rotateX between -0.2 / 0.2

// rotate nose left and right 
// RotateY -1 / -2
// .gltf recommended file
import * as Three from 'three'
import * as dat from 'dat.gui';
import gsap from "gsap";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default {
    name: 'ThreeTest',
    data() {
        return {
            tl: gsap.timeline(),
            scene: new Three.Scene(),
            gui: new dat.GUI(),
            time: 0,
            modelUrl: require('@/assets/RobotExpressive.glb'),
            model: '',
            swimSpeed: 0.001,

        }
    },
    methods: {
        camera() {
            // camera
            var container = document.getElementById('container');
            this.camera = new Three.PerspectiveCamera(10, container.clientWidth / container.clientHeight, 1, 10);
            //this.camera.position.z = 1;
            // this.camera.position.y = 1;
        },
        lights() {
            this.scene.background = new Three.Color(0x096AB2);
            light = new Three.DirectionalLight(0xefefff, 3);
            light.position.set(1, 1, 1).normalize();
            this.scene.add(light);
            var light = new Three.DirectionalLight(0xffefef, 3);
            light.position.set(-1, -1, -1).normalize();
            this.scene.add(light);
        },
        loadModel: function () {
            var container = document.getElementById('container');

            // Load object
            const gltfLoader = new GLTFLoader();

            gltfLoader.load(this.modelUrl, (gltf) => {
                this.model = gltf.scene;
                this.scene.add(this.model);

                this.gui.add(gltf.scene.rotation, 'x').min(0).max(9)
                this.gui.add(gltf.scene.rotation, 'y').min(0).max(9)
                this.gui.add(gltf.scene.rotation, 'z').min(0).max(9)

                 this.model.position.y = 0
                // this.model.scale.y = 0.1
                // console.log(this.model)

            });

            // set object material
            var material_flat = new Three.MeshPhongMaterial({
                color: 0xF87A36,
                //  flatShading: Three.FlatShading,
                shininess: 100,
                //  specularity: 10,
                specular: 0xF2B06C,
            });

            var world_mesh = new Three.Mesh(this.model, material_flat);
            world_mesh.castShadow = true;
            world_mesh.receiveShadow = true;

            // RENDER
            this.renderer = new Three.WebGLRenderer({ antialias: true });
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(this.renderer.domElement);

        },

        animate() {

            console.log('dsas')
            this.tl.to(this.model.rotation, { y: 45, duration: 2, delay: 5 })

        }
    },
    mounted() {

        this.lights()
        this.camera()
        this.loadModel();

        this.renderer.render(this.scene, this.camera);

        this.animate();

    }
}
</script>

<style scoped>
#container {
    width: 100vw;
    height: 100vh;
}
</style>
