<template>
<div>
    <div id="container"></div>
    <div class="infoBox"><strong>Test #1 - Three.js and GSAP</strong>
    <p><i>Movements for example only!</i></p>
        <p>Import each model with each possible fin selection and move each bone using gsap</p>
        <p>Then hide/show relevent models</p>
        <hr>
        <p>Pro: Importing each variation with all anmations could use a lot of memory</p>
        <p>Cons: Each bone has to be manually animated using gsap fromTo etc</p>

    </div>
    <div class="controls">
        Speed
        <button v-if="swimSpeed>=1" @click="swimSpeed--">-</button>
        <button v-if="swimSpeed<10" @click="swimSpeed++">+</button>
        {{swimSpeed}}
        <span style="padding: 0 10px">|</span>
        <button :class="showFish == 'fishOne' ? 'active' : null" @click="changeModel('fishOne')">Pectoral fins A</button>
        <button :class="showFish == 'fishTwo' ? 'active' : null" @click="changeModel('fishTwo')">Pectoral fin B</button>

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
            showFish: 'fishOne',
            ready: false,
            output: {},
            tlOne: new TimelineMax({ paused: true, reversed: true }),
            tlTwo: new TimelineMax({ paused: true, reversed: true }),
            clock: new Three.Clock(),
            camera: null,
            scene: null,
            renderer: null,
            fishOne: '',
            fishTwo: '',
            leftFin: '',
            rightFin: '',
            topFin: '',
            backFins: {
                top: '',
                bottom: ''
            },
            tail: {},
            head: '',
            fishOneUlr: require('@/assets/shark.glb'),
            fishTwoUrl: require('@/assets/sharkfin3.glb'),
            swimSpeed: 2,
            // movments
            movments: {
                tail: 0.2
            }

        }
    },
    methods: {
        init() {
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

            gltfLoader.load(this.fishOneUlr, (gltf) => {
                this.fishOne = gltf.scene
                this.scene.add(this.fishOne);
                this.fishOne.rotation.x = 0.2;
                this.fishOne.rotation.y = -0.6;
                this.fishOne.visible = true
                this.moveFishOne()
            })

            gltfLoader.load(this.fishTwoUrl, (gltf) => {
                this.fishTwo = gltf.scene
                this.scene.add(this.fishTwo);
                this.fishTwo.rotation.x = 0.2;
                this.fishTwo.rotation.y = -0.6;
                this.fishTwo.position.y = 0.05;
                this.fishTwo.visible = false
                this.moveFishTwo()

            })

            // RENDER
            this.renderer = new Three.WebGLRenderer({ antialias: true });
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(this.renderer.domElement);

            // resize

        

        },

        onWindowResize(){
                this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },

        moveFishOne() {
            //  left fin
            if (this.fishOne) {
                this.leftFin = this.fishOne.getObjectByName('Bone015');
                this.tlOne.fromTo(this.leftFin.rotation, this.swimSpeed, { y: this.leftFin.rotation.y, x: this.leftFin.rotation.x }, { y: this.leftFin.rotation.y + 0.1, x: this.leftFin.rotation.x + 0.1, yoyo: true, repeat: -1, ease: Power2.easeInOut }).add("end", this.swimSpeed)
                // right fin
                this.rightFin = this.fishOne.getObjectByName('Bone018');
                this.tlOne.to(this.rightFin.rotation, this.swimSpeed, { y: this.rightFin.rotation.y - 0.1, x: this.rightFin.rotation.x - 0.1, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // head
                this.head = this.fishOne.getObjectByName('Bone001');
                this.tlOne.fromTo(this.head.rotation, this.swimSpeed, { z: this.head.rotation.z - 0.1 }, { z: this.head.rotation.z + 0.1, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // back fins
                // top
                this.backFins.top = this.fishOne.getObjectByName('Bone008');
                this.tlOne.fromTo(this.backFins.top.rotation, this.swimSpeed, { z: this.backFins.top.rotation.z + 0.3 }, { z: this.backFins.top.rotation.z - 0.3, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // bottom
                this.backFins.bottom = this.fishOne.getObjectByName('Bone010');
                this.tlOne.fromTo(this.backFins.bottom.rotation, this.swimSpeed, { z: this.backFins.bottom.rotation.z + 0.3 }, { z: this.backFins.bottom.rotation.z - 0.3, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // tail
                this.tail = this.fishOne.getObjectByName('Bone004');
                this.tlOne.fromTo(this.tail.rotation, this.swimSpeed, { z: this.tail.rotation.z + this.movments.tail }, { z: this.tail.rotation.z - this.movments.tail, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // tail
                this.topFin = this.fishOne.getObjectByName('Bone014');
                this.tlOne.fromTo(this.topFin.rotation, this.swimSpeed, { z: this.topFin.rotation.z + 0.3 }, { z: this.topFin.rotation.z - 0.3, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')

                this.tlOne.play()
            }

        },
        moveFishTwo() {
            //  left fin
            if (this.fishTwo) {
                // this.leftFin = this.fishTwo.getObjectByName('Bone015');
                //this.tlOne.fromTo(this.leftFin.rotation, this.swimSpeed, { y: this.leftFin.rotation.y, x: this.leftFin.rotation.x }, { y: this.leftFin.rotation.y + 0.1, x: this.leftFin.rotation.x + 0.1, yoyo: true, repeat: -1, ease: Power2.easeInOut }).add("end", this.swimSpeed)
                // // right fin
                this.rightFin = this.fishTwo.getObjectByName('Bone018');
                this.tlOne.fromTo(this.rightFin.rotation, this.swimSpeed, { y: 0.3 }, { y: 0.1, yoyo: true, repeat: -1 })
                this.tlOne.to(this.rightFin.position, this.swimSpeed, { y: this.rightFin.position.y - 0.1, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // head
                this.head = this.fishTwo.getObjectByName('Bone001');
                this.tlTwo.fromTo(this.head.rotation, this.swimSpeed, { y: this.head.rotation.z - 0.03 }, { y: this.head.rotation.z + 0.03, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // back fins
                // top
                this.backFins.top = this.fishTwo.getObjectByName('Bone008');
                this.tlTwo.fromTo(this.backFins.top.rotation, this.swimSpeed, { z: this.backFins.top.rotation.z + 0.3 }, { z: this.backFins.top.rotation.z - 0.3, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // bottom
                this.backFins.bottom = this.fishTwo.getObjectByName('Bone010');
                this.tlTwo.fromTo(this.backFins.bottom.rotation, this.swimSpeed, { z: this.backFins.bottom.rotation.z + 0.3 }, { z: this.backFins.bottom.rotation.z - 0.3, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // tail
                this.tail = this.fishTwo.getObjectByName('Bone004');
                this.tlTwo.fromTo(this.tail.rotation, this.swimSpeed, { z: this.tail.rotation.z + 0.02 }, { z: this.tail.rotation.z - 0.02, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                // tail
                this.topFin = this.fishTwo.getObjectByName('Bone014');
                this.tlTwo.fromTo(this.topFin.rotation, this.swimSpeed, { z: this.topFin.rotation.z + 0.05 }, { z: this.topFin.rotation.z - 0.05, yoyo: true, repeat: -1, ease: Power2.easeInOut }, 'end')
                this.tlTwo.play()
            }
        },

        changeModel(v) {
            this.showFish = v
            if (v == 'fishOne') {
                this.fishOne.visible = true
                this.fishTwo.visible = false

            }
            if (v == 'fishTwo') {
                this.fishOne.visible = false
                this.fishTwo.visible = true

            }
        },

        animate() {

            this.renderer.render(this.scene, this.camera);
            this.camera.lookAt(this.scene.position);
            if (this.fishOne && this.fishTwo) {
                this.fishOne.rotation.y -= 0.001;
                this.fishTwo.rotation.y -= 0.001;
            }
            requestAnimationFrame(() => {
                this.animate();

            });
        }
    },
    watch: {

        swimSpeed(val) {

            this.tlOne.timeScale(val);
            this.tlTwo.timeScale(val);
        }
    },
    mounted() {
        this.init();
        this.animate();

        window.addEventListener( 'resize', this.onWindowResize, false );

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

.infoBox {
    position: fixed;
    right: 5px;
    top: 5px;
    background-color: #fff;
    padding: 1em;
    text-align: left;
    width: 250px;
}

.active {

    opacity: 0.3;
}
</style>
