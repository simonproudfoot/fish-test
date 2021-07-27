<template>
<div>
    <div id="container"></div>
    <div class="controls">
        Speed
        <button v-if="swimSpeed>=1" @click="swimSpeed--">-</button>
        <button v-if="swimSpeed<10" @click="swimSpeed++">+</button>
        {{swimSpeed}}
    </div>
</div>
</template>

<script>
import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Power2, TimelineMax } from "gsap";
export default {
    name: 'ThreeTest',
    data() {
        return {
            ready: false,
            output: {},
            tl: new TimelineMax({ paused: true, reversed: true }),
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

            swimSpeed: 1,
            // movments
            movments: {
                tail: 0.2
            }

        }
    },
    methods: {
        init: function () {
            let container = document.getElementById('container');

            // camera
            this.camera = new Three.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 1, 30);
            this.camera.position.z = 4;

            this.scene = new Three.Scene();

            // background
            this.scene.background = new Three.Color(0x096AB2);

            // LIGHT
            const ambientLight = new Three.AmbientLight('lightBlue', 2);

            const mainLight = new Three.DirectionalLight('lightGreen', 4);
            mainLight.position.set(10, 10, 10);

            const secondLight = new Three.DirectionalLight('aqua', 3)
            secondLight.position.set(10, 10, 10);

            this.scene.add(ambientLight);
            this.scene.add(mainLight);
            this.scene.add(secondLight);

            const color = 'lightBlue';
            const density = 0.1;
            this.scene.fog = new Three.FogExp2(color, density);

            // Load object

            //  let loader = new OBJLoader();

            const gltfLoader = new GLTFLoader();

            gltfLoader.load(this.fishUlr, (gltf) => {
                this.fish = gltf.scene
                this.scene.add(this.fish);
                this.fish.rotation.x = 0.2;
                this.fish.rotation.y = -0.6;
                this.moveIt()
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

        moveIt() {
            //  left fin
           
                this.leftFin = this.scene.getObjectByName('Bone015');
                this.tl.fromTo(this.leftFin.rotation, this.swimSpeed, { y: this.leftFin.rotation.y, x: this.leftFin.rotation.x }, { y: this.leftFin.rotation.y + 0.1, x: this.leftFin.rotation.x + 0.1, yoyo: true, repeat: -1, ease: Power2.easeInOut }).add("end", this.swimSpeed)
                // right fin
                this.rightFin = this.scene.getObjectByName('Bone018');
                this.tl.to(this.rightFin.rotation, this.swimSpeed, { y: this.rightFin.rotation.y - 0.1, x: this.rightFin.rotation.x - 0.1, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // head
                this.head = this.scene.getObjectByName('Bone001');
                this.tl.fromTo(this.head.rotation, this.swimSpeed, { z: this.head.rotation.z - 0.1 }, { z: this.head.rotation.z + 0.1, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // back fins
                // top
                this.backFins.top = this.scene.getObjectByName('Bone008');
                this.tl.fromTo(this.backFins.top.rotation, this.swimSpeed, { z: this.backFins.top.rotation.z + 0.3 }, { z: this.backFins.top.rotation.z - 0.3, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // bottom
                this.backFins.bottom = this.scene.getObjectByName('Bone010');
                this.tl.fromTo(this.backFins.bottom.rotation, this.swimSpeed, { z: this.backFins.bottom.rotation.z + 0.3 }, { z: this.backFins.bottom.rotation.z - 0.3, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // tail
                this.tail = this.scene.getObjectByName('Bone004');
                this.tl.fromTo(this.tail.rotation, this.swimSpeed, { z: this.tail.rotation.z + this.movments.tail }, { z: this.tail.rotation.z - this.movments.tail, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // tail
                this.topFin = this.scene.getObjectByName('Bone014');
                this.tl.fromTo(this.topFin.rotation, this.swimSpeed, { z: this.topFin.rotation.z + 0.3 }, { z: this.topFin.rotation.z - 0.3, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')

                this.tl.play()
            
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
    watch: {
        swimSpeed(val) {
            //  this.tl.stop()

            this.tl.timeScale(val);
        }
    },
    mounted() {
        this.init();
        this.animate();
        this.moveIt()

    }
}
</script>

<style scoped>
#container {
    width: 100vw;
    height: 100vh;
    color: rgb(112, 207, 207);
}

.controls {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: black;
    color: #fff;
    padding: 10px;
    width: 100%;
}
</style>
