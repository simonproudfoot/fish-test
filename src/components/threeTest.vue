<template>
<div>
    <div id="container"></div>
    <button @click="swimSpeed++">Speed+</button>
     <button @click="swimSpeed--">Speed-</button>
    {{swimSpeed}}
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
import { gsap, Power2 } from "gsap";
export default {
    name: 'ThreeTest',
    data() {
        return {
            output: {},
            clock: new Three.Clock(),
            camera: null,
            scene: null,
            renderer: null,
            fish: '',
            leftFin: '',
            rightFin: '',
            topFin: '',
            backFins: {
                top: '',
                bottom: ''
            },
            tail: {},
            head: '',
            fishUlr: require('@/assets/shark.glb'),
            //   fishUlr: 'https://threejs.org/examples/models/gltf/Soldier.glb',

            swimSpeed: 3,

        }
    },
    methods: {
        init: function () {
            let container = document.getElementById('container');

            // camera
            this.camera = new Three.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 0.01, 30);
            this.camera.position.z = 4;

            this.scene = new Three.Scene();

            // background
            this.scene.background = new Three.Color(0x096AB2);

            // LIGHT

            const ambientLight = new Three.AmbientLight('white', 2);

            const mainLight = new Three.DirectionalLight('white', 5);
            mainLight.position.set(10, 10, 10);

            const secondLight = new Three.DirectionalLight('aqua', 3)
            secondLight.position.set(10, 10, 10);

            this.scene.add(ambientLight);
            this.scene.add(mainLight);
            this.scene.add(secondLight);

            // Load object

            //  let loader = new OBJLoader();

            const gltfLoader = new GLTFLoader();

            gltfLoader.load(this.fishUlr, (gltf) => {
                this.fish = gltf.scene
                this.scene.add(this.fish);
                this.fish.rotation.x = 0.2;
                this.fish.rotation.y = -0.6;
                //  left fin
                this.leftFin = gltf.scene.getObjectByName('Bone015');
                gsap.fromTo(this.leftFin.rotation, this.swimSpeed, { y: this.leftFin.rotation.y, x: this.leftFin.rotation.x }, { y: this.leftFin.rotation.y + 0.1, x: this.leftFin.rotation.x + 0.1, yoyo: true, repeat: -1, ease: Power2.easeInOut })
                // right fin
                this.rightFin = gltf.scene.getObjectByName('Bone018');
                gsap.to(this.rightFin.rotation, this.swimSpeed, { y: this.rightFin.rotation.y - 0.1, x: this.rightFin.rotation.x - 0.1, yoyo: true, repeat: -1, ease: Power2.easeInOut })
                // head
                this.head = gltf.scene.getObjectByName('Bone001');
                gsap.fromTo(this.head.rotation, this.swimSpeed, { z: this.head.rotation.z - 0.1 }, { z: this.head.rotation.z + 0.1, yoyo: true, repeat: -1, ease: Power2.easeInOut })
                // back fins
                // top
                this.backFins.top = gltf.scene.getObjectByName('Bone008');
                gsap.fromTo(this.backFins.top.rotation, this.swimSpeed, { z: this.backFins.top.rotation.z + 0.3 }, { z: this.backFins.top.rotation.z - 0.3, yoyo: true, repeat: -1, ease: Power2.easeInOut })
                // bottom
                this.backFins.bottom = gltf.scene.getObjectByName('Bone010');
                gsap.fromTo(this.backFins.bottom.rotation, this.swimSpeed, { z: this.backFins.bottom.rotation.z + 0.3 }, { z: this.backFins.bottom.rotation.z - 0.3, yoyo: true, repeat: -1, ease: Power2.easeInOut })
                // tail
                this.tail = gltf.scene.getObjectByName('Bone004');
                gsap.fromTo(this.tail.rotation, this.swimSpeed, { z: this.tail.rotation.z + 0.2 }, { z: this.tail.rotation.z - 0.2, yoyo: true, repeat: -1, ease: Power2.easeInOut })
                // tail
                this.topFin = gltf.scene.getObjectByName('Bone014');
                gsap.fromTo(this.topFin.rotation, this.swimSpeed, { z: this.topFin.rotation.z + 0.3 }, { z: this.topFin.rotation.z - 0.3, yoyo: true, repeat: -1, ease: Power2.easeInOut })
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

            if (this.fish) {
                //this.fish.rotation.y += 0.001;
            }

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
