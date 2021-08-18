<template>
<div class="" style="position: relative">
    <div id="container"></div>
    <div class="controls">
        <button @click="rotateY(-0.1, 0.1)">Wobble Y</button>
        <button @click="rotateX(-0.1, 0.1)">Wobble X</button>
        <button @click="rotateZ(-0.2, 0.2)">Wobble Z</button>
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
import { gsap, Linear } from "gsap";

export default {
    name: 'ThreeTest',
    components: { VueEasyLightbox },
    data() {
        return {
            startY: 10,
            startX: 0.2,
            startZ: 0,
            visible: false,
            imageTwo: require('@/assets/fish-guide2.jpg'),
            clock: new Three.Clock(),
            mixer: null,
            showFish: 'fishOne',
            ready: false,
            fishOne: '',
            scene: '',
            fishOneUlr: require('@/assets/minecraft-still.glb'),
            backFin: 'back_fin_1',
            sideFin: 'side_fin_1',
            swimSpeed: 0.2
        }
    },
    methods: {
        rotateX(start, end, speed) {
            gsap.set(this.fishOne.rotation, { x: this.startX })
            if (end) {
                gsap.fromTo(this.fishOne.rotation, speed, { x: this.fishOne.rotation.x + start }, {
                    x: this.fishOne.rotation.x + end,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    autoRound: false
                });
            } else {
                gsap.to(this.fishOne.rotation, 5, {
                    x: 50,
                    repeat: -1,
                    ease: "sine.inOut",
                    autoRound: false
                });
            }

        },

        rotateY(start, end) {

            gsap.set(this.fishOne.rotation, { y: this.startY })
            if (end) {
                gsap.fromTo(this.fishOne.rotation, 1, { y: this.fishOne.rotation.y + start }, {
                    y: this.fishOne.rotation.y + end,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    autoRound: false
                });
            } else {
                gsap.to(this.fishOne.rotation, 5, {
                    y: 50,
                    repeat: -1,
                    ease: "sine.inOut",
                    autoRound: false
                });
            }

        },
        rotateZ(start, end) {
            gsap.set(this.fishOne.rotation, { z: this.startZ })
            if (end) {
                gsap.fromTo(this.fishOne.rotation, 1, { z: this.fishOne.rotation.z + start }, {
                    z: this.fishOne.rotation.z + end,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    autoRound: false
                });
            } else {
                gsap.to(this.fishOne.rotation, 5, { z: 50, repeat: -1, ease: false });
            }

        },

        moveY(start, end) {
            gsap.set(this.fishOne.position, { y: 0 })
            if (end) {
                gsap.fromTo(this.fishOne.position, 1, { z: this.fishOne.position.y + start }, {
                    y: this.fishOne.position.y + end,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    autoRound: false
                });
            } else {
                gsap.to(this.fishOne.rotation, 5, { z: 50, repeat: -1, ease: false });
            }

        },

        moveX(start, end) {
            //   gsap.set(this.fishOne.position, { x: this.startZ })
            if (end) {
                gsap.fromTo(this.fishOne.position, 1, { z: this.fishOne.position.x + start }, {
                    x: this.fishOne.position.x + end,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    autoRound: false
                });
            } else {
                gsap.to(this.fishOne.rotation, 5, { z: 50, repeat: -1, ease: false });
            }
        },

        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },

        changeBackFin(val) {
            this.backFin = val
            console.log(this.mixer._actions)
            //   console.log(  this.mixer.timeScale = 1)
              this.mixer.duration = 0.1
            if (val == 'back_fin_2') {
                //   this.moveY(-0.5, 0.5, 1)
                // this.moveX(0, 0, 0)
              //  this.rotateY(0, 0, 0)
                this.rotateX(-0.1, 0.1, 0.6)

                this.fishOne.getObjectByName('back_fin_2').visible = true
                this.fishOne.getObjectByName('back_fin_1').visible = false
            }
            if (val == 'back_fin_1') {
           //     this.rotateX(0, 0, 0)
                this.rotateY(-0.1, 0.1, 0.6)
                //   this.moveY(0, 0, 0)
                //    this.moveX(-0.5, 0.5, 1)
                this.fishOne.getObjectByName('back_fin_1').visible = true
                this.fishOne.getObjectByName('back_fin_2').visible = false
                //this.fishOne.rotation.y = 0
            }

        },

        changeSideFin(val) {
            this.sideFin = val
            if (val == 'side_fin_2') {
                this.moveY(-0.5, 0.5, 1)
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
        },

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

                    this.mixer.clipAction(clip).play();

                });
                this.fishOne = gltf.scene
                this.fishOne.rotation.y = this.startY
                this.scene.add(this.fishOne);
                this.fishOne.rotation.x = this.startX
                this.fishOne.getObjectByName('body').rotation.y = 0
                this.fishOne.getObjectByName(this.backFin).visible = true
                this.fishOne.getObjectByName('back_fin_2').visible = false
                this.fishOne.getObjectByName(this.sideFin).visible = true
                this.fishOne.getObjectByName('side_fin_2').visible = false

                this.moveY(-0.1, 0.1, 2)

            })

            // RENDER
            this.renderer = new Three.WebGLRenderer({ antialias: true });
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(this.renderer.domElement);

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
