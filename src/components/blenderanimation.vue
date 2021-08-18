<template>
<div style="position: relative">
    <div id="container"></div>
    <div class="infoBox"><strong>Test #2 - Fin swap</strong>
        <button @click="visible = true">DETAILS</button>
        <p>Create an animation in 3D software featuring all fin actions running together but making only one fin visible at a time </p>
        <p>This way we only import one object and animaton</p>
        <hr>
        <p>Cons: If we use bones, each bone will pull and distort the rest of the body if attached. <br>Less control over animaton within the code. It all needs to be made in the 3d software </p>
    </div>
    <div class="controls">
        <button :class="sideFin === 'side_fin_1' ? 'active' : null" @click="changeSideFin('side_fin_1')">Side fin 1</button>
        <button :class="sideFin === 'side_fin_2' ? 'active' : null" @click="changeSideFin('side_fin_2')">Side fin 2</button>
        <span style="padding: 0 10px">|</span>
        <button :class="backFin === 'back_fin_1' ? 'active' : null" @click="changeBackFin('back_fin_1')">Back fin 1</button>
        <button :class="backFin === 'back_fin_2' ? 'active' : null" @click="changeBackFin('back_fin_2')">Back fin 2</button>
        <vue-easy-lightbox :visible="visible" :imgs="imageTwo" @hide="visible = false"></vue-easy-lightbox>
    </div>
</div>
</template>

<script>
import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import VueEasyLightbox from 'vue-easy-lightbox'
export default {
    name: 'ThreeTest',
    components: { VueEasyLightbox },
    data() {
        return {
            visible: false,
            imageTwo: require('@/assets/fish-guide2.jpg'),
            clock: new Three.Clock(),
            mixer: null,
            showFish: 'fishOne',
            ready: false,
            fishOne: '',
            scene: '',
            fishOneUlr: require('@/assets/minecraft.glb'),
            backFin: 'back_fin_1',
            sideFin: 'side_fin_1'
        }
    },
    methods: {
        init() {
            let container = document.getElementById('container');

            // camera
            this.camera = new Three.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 1, 30);
            this.camera.position.z = 17;

            this.scene = new Three.Scene();
            // background
            this.scene.background = new Three.Color(0x096AB2);

            // LIGHT
            const ambientLight = new Three.AmbientLight('yellow', 3);
            ambientLight.position.set(-10, 10, 10);

            const mainLight = new Three.DirectionalLight('orange', 2);
            mainLight.position.set(-10, 10, 10);

            const secondLight = new Three.DirectionalLight('yellow', 1)
            secondLight.position.set(11, -10, 1);

            this.scene.add(ambientLight, mainLight, secondLight);

            // Load object
            const gltfLoader = new GLTFLoader();
            gltfLoader.load(this.fishOneUlr, (gltf) => {
                this.mixer = new Three.AnimationMixer(gltf.scene);
                console.log(this.mixer)
                gltf.animations.forEach((clip) => {
                    console.log(clip)
                    this.mixer.clipAction(clip).play();

                });
                this.fishOne = gltf.scene
                this.fishOne.rotation.y = 10
                this.scene.add(this.fishOne);
                this.fishOne.rotation.x = 0.2
                this.fishOne.getObjectByName('body').rotation.y = 0
                this.fishOne.getObjectByName(this.backFin).visible = true
                this.fishOne.getObjectByName('back_fin_2').visible = false
                this.fishOne.getObjectByName(this.sideFin).visible = true
                this.fishOne.getObjectByName('side_fin_2').visible = false

            })

            // RENDER
            this.renderer = new Three.WebGLRenderer({ antialias: true });
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(this.renderer.domElement);

        },

        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },

        changeBackFin(val) {
            this.backFin = val
            if (val == 'back_fin_2') {
                this.fishOne.getObjectByName('back_fin_2').visible = true
                this.fishOne.getObjectByName('back_fin_1').visible = false
            }
            if (val == 'back_fin_1') {
                this.fishOne.getObjectByName('back_fin_1').visible = true
                this.fishOne.getObjectByName('back_fin_2').visible = false
                //this.fishOne.rotation.y = 0
            }

        },

        changeSideFin(val) {
            this.sideFin = val
            if (val == 'side_fin_2') {
                this.fishOne.getObjectByName('side_fin_2').visible = true
                this.fishOne.getObjectByName('side_fin_1').visible = false
            }
            if (val == 'side_fin_1') {
                this.fishOne.getObjectByName('side_fin_1').visible = true
                this.fishOne.getObjectByName('side_fin_2').visible = false
                //this.fishOne.rotation.y = 0
            }

        },

        animate() {
            requestAnimationFrame(this.animate);
            var delta = this.clock.getDelta();

            if (this.mixer && this.fishOne) this.mixer.update(delta);

            this.renderer.render(this.scene, this.camera);
        }
    },
    watch: {

        swimSpeed() {

        }
    },
    mounted() {
        this.init();
        this.animate();

        window.addEventListener('resize', this.onWindowResize, false);

    }
}
</script>

<style scoped>
.infoBox button {
    background-color: red;
    display: block;
    width: 100%;
    padding: 1em;
    color: #fff;
    border: none !important
}

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
    cursor: none;
    opacity: 0.3;
}
</style>
