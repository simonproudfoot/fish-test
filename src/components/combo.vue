<template>
<div class="" style="position: relative">
    <!-- <img class="guide" :src="require('@/assets/guide.png')" /> -->
    <div id="container"></div>
    <!-- <div class="controls"> -->
    <!-- <button @click="rotate('x', 0.5, 1, true)">Wobble X</button>
        <button @click="rotate('y', 0.5, 1, true)">Wobble Y </button>
        <button @click="rotate('z', 0.5, 1, true)">Wobble Z</button>
        <button @click="move('y', 1, 1, true)">Move up and down</button>
        <button @click="move('x', 1, 1, true)">Move left and right</button> -->

    <!-- <input type="text" v-model="yaw" placeholder="">
        <span :class="playing ? 'inactive' : null">
            <button :class="sideFin === 'side_fin_1' ? 'active' : null" @click="changeSideFin('side_fin_1')">
                Side fin 1
            </button>
            <button :class="sideFin === 'side_fin_2' ? 'active' : null" @click="changeSideFin('side_fin_2')">
                Side fin 2
            </button>
            <span style="padding: 0 10px">|</span>
            <button :class="backFin === 'back_fin_1' ? 'active' : null" @click="changeBackFin('back_fin_1')">
                Back fin 1
            </button>
            <button :class="backFin === 'back_fin_2' ? 'active' : null" @click="changeBackFin('back_fin_2')">
                Back fin 2
            </button>
        </span>
        <span style="padding: 0 10px">|</span>
        <button @click="playing = !playing">
            {{ playing ? "STOP" : "TEST" }}
        </button> -->

    <footer>
        <div :class="playing ? 'inactive' : null">
            <div class="fin">
                <p>Tail fin</p>
                <div class="fin__select" :class="backFin === 'back_fin_1' ? 'active' : null" @click="changeBackFin('back_fin_1')">
                    <img src="../assets/fins/back_fin_1.png" alt="">
                </div>
                <div class="fin__select" :class="backFin === 'back_fin_2' ? 'active' : null" @click="changeBackFin('back_fin_2')">
                    <img src="../assets/fins/back_fin_2.png" alt="">
                </div>
            </div>
            <div class="fin">
                <p>Top fin</p>
                <div class="fin__select" :class="topFin === 'top_fin_1' ? 'active' : null" @click="changeTopFin('top_fin_1')">
                    <img src="../assets/fins/top_fin_1.png" alt="">
                </div>
                <div class="fin__select" :class="topFin === 'top_fin_2' ? 'active' : null" @click="changeTopFin('top_fin_2')">
                    <img src="../assets/fins/top_fin_2.png" alt="">
                </div>
            </div>
            <div class="fin">
                <p>Side fin</p>
                <div class="fin__select" :class="sideFin === 'side_fin_1' ? 'active' : null" @click="changeSideFin('side_fin_1')">
                    <img src="../assets/fins/side_fin_1.png" alt="">
                </div>
                <div class="fin__select" :class="sideFin === 'side_fin_2' ? 'active' : null" @click="changeSideFin('side_fin_2')">
                    <img src="../assets/fins/side_fin_2.png" alt="">
                </div>
            </div>
        </div>
        <div class="fin">
            <div class="fin__select test" @click="playing = !playing">
                {{ playing ? "STOP" : "TEST" }}
            </div>
        </div>
    </footer>
    <!-- <button @click="sink">Sink</button> -->
</div>
</template>

<script>
import * as Three from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
export default {
    name: "ThreeTest",
    data() {
        return {
            role: 0,
            pitch: 0,
            yaw: 0.1,
            playing: false,
            // default position
            startAxis: {
                x: 0,
                y: 0,
                z: 0,
            },
            startPosition: {
                x: 0,
                y: 0,
                z: 0,
            },
            position: {
                x: 0,
                y: 0,
                z: 0,
            },

            visible: false,
            imageTwo: require("@/assets/fish-guide2.jpg"),
            clock: new Three.Clock(),
            mixer: null,
            showFish: "fishOne",
            ready: false,
            fishOne: "",
            scene: "",
            fishOneUlr: require("@/assets/simplefish3.glb"),
            backgroundImage: require("@/assets/touchscreen_background.jpg"),
            backFin: "",
            sideFin: "",
            topFin: "",
            swimSpeed: 1,
        };
    },
    watch: {
        playing(val) {
            if (val == true) {

                if (!this.sideFin || !this.backFin) {
                    this.sink()
                }

                if (!this.topFin) {

                    this.rotate("x", 0.4, 5, true);

                }

                if (this.sideFin == "side_fin_1") {
                    this.move("x", this.yaw + 0.5, 0.4, true); // spin
                    this.move("y", this.yaw + 0.5, 1, true); // spin
                    this.changeSpeed(this.swimSpeed)

                }
                if (this.sideFin == "side_fin_2") {
                    this.move("x", 1, 3, true); // spin
                    this.move("y", 0.5, 3, true); // spin
                    this.changeSpeed(this.swimSpeed - 0.4)
                }

                //  this.changeSpeed(this.swimSpeed)

                // create a point system 
                // create sepearate moving background to control speed seperately 

                // contol the spin 
                // if (this.sideFin == "side_fin_1") {
                //     this.rotate("z", 0.2, 3, true); // spin
                // }

                // if (this.sideFin == "side_fin_2") {
                //     //this.rotate("z", 0, 3, true); // spin
                // }

                // if (this.backFin == "back_fin_2" && this.sideFin == "side_fin_2") {
                //     this.rotate("x", 0.2, 1, true);
                //     this.move("y", 1, 3, true);
                // }

                // if (this.backFin == "back_fin_2" && this.sideFin == "side_fin_1") {

                //     this.rotate("x", 0.2, 1, true);
                //     this.move("y", 0.2, 3, true);
                // }

                // if (this.backFin == "back_fin_2" && this.sideFin == "sidside_fin_2") {

                //     this.rotate("x", 0.2, 1, true);
                //     this.move("y", 3, 3, true);
                // }

                // if (this.backFin == "back_fin_1") {
                //     this.rotate("y", 0.2, 1, true);
                //     this.move("x", 0.3, 1, true);
                // }
            } else {
                this.changeBackFin('')
                this.changeSideFin('')
                this.changeTopFin('')
                this.changeSpeed(0)
                this.defaultPosition();
            }
        },
    },
    methods: {
        // Swim animations
        // axis, angle, speed, loop
        sink() {
            this.changeSpeed(10);
            this.rotate("x", 0.3, 3, false);
            this.rotate("z", 0.3, 1, true);
            this.move("y", -60, 5, false);
            setTimeout(() => {
                this.defaultPosition();
            }, 4000);
        },
     
        // movement functions
        changeSpeed(s) {
            this.mixer.timeScale = s;
        },
        rotate(axis, angle, speed, loop) {
            angle = this.convertDecimal(angle, true);
            console.log(JSON.stringify(angle));
            // gsap.killTweensOf(this.fishOne.rotation, axis);
            gsap.set(this.fishOne.rotation, {
                [axis]: this.startAxis[axis],
            });
            if (loop) {
                gsap.fromTo(
                    this.fishOne.rotation,
                    speed, {
                        [axis]: this.fishOne.rotation[axis] + angle.start,
                    }, {
                        [axis]: this.fishOne.rotation[axis] + angle.end,
                        yoyo: true,
                        repeat: -1,
                        ease: "sine.inOut",
                        autoRound: false,
                    }
                );
            } else {
                gsap.to(this.fishOne.rotation, speed, {
                    [axis]: this.fishOne.rotation[axis] + angle.end,
                    ease: "sine.inOut",
                });
            }
        },
        move(direction, distance, speed, loop) {
            distance = this.convertDecimal(distance, true);
            console.log(JSON.stringify(distance));
            // gsap.killTweensOf(this.fishOne.position, direction);
            // gsap.set(this.fishOne.position, {
            //     [direction]: this.startPosition[direction]
            // })
            if (loop) {
                gsap.fromTo(
                    this.fishOne.position,
                    speed, {
                        [direction]: this.fishOne.position[direction] + distance.start,
                    }, {
                        [direction]: this.fishOne.position[direction] + distance.end,
                        yoyo: true,
                        repeat: -1,
                        ease: "sine.inOut",
                        autoRound: false,
                    }
                );
            } else {
                gsap.to(this.fishOne.position, speed, {
                    [direction]: this.fishOne.rotation[direction] + distance.end,
                    ease: "sine.inOut",
                });
            }
        },
        convertDecimal(num, removeDecimal) {
            let decimal = "0." + num;
            let converted = parseFloat(decimal);
            let x = converted + converted;
            return !removeDecimal ? { start: x - decimal - decimal - decimal, end: converted } : { start: num - num - num, end: num };
        },
        killPosition(rotationPosition, val) {
            rotationPosition == "axis" ?
                (this.fishOne[rotationPosition].val = this.startAxis[val]) :
                (this.fishOne[rotationPosition].val = this.startPosition[val]);
        },
        defaultPosition() {
            gsap.killTweensOf(this.fishOne.position, "x,y,z");
            gsap.killTweensOf(this.fishOne.rotation, "x,y,z");
            this.fishOne.rotation.y = this.startAxis.y;
            this.fishOne.rotation.x = this.startAxis.x;
            this.fishOne.rotation.z = this.startAxis.z;
            this.fishOne.position.y = this.startPosition.y;
            this.fishOne.position.x = this.startPosition.x;
            this.fishOne.position.z = this.startPosition.z;
        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
           changeBackFin(val) {
            this.backFin = val;
            if (val == "back_fin_2") {
                this.fishOne.getObjectByName("back_fin_2").visible = true;
                this.fishOne.getObjectByName("back_fin_1").visible = false;
            }
            if (val == "back_fin_1") {
                this.fishOne.getObjectByName("back_fin_1").visible = true;
                this.fishOne.getObjectByName("back_fin_2").visible = false;
            } 
            
            if(!val){
                this.fishOne.getObjectByName("back_fin_1").visible = false;
                this.fishOne.getObjectByName("back_fin_2").visible = false;
            }
        },
        changeSideFin(val) {
            this.sideFin = val;
            if (val == "side_fin_2") {
                this.fishOne.getObjectByName("side_fin_2").visible = true;
                this.fishOne.getObjectByName("side_fin_1").visible = false;
            }
            if (val == "side_fin_1") {
                this.fishOne.getObjectByName("side_fin_1").visible = true;
                this.fishOne.getObjectByName("side_fin_2").visible = false;
            } if(!val) {
                this.fishOne.getObjectByName("side_fin_1").visible = false;
                this.fishOne.getObjectByName("side_fin_2").visible = false;
            }
        },

        changeTopFin(val) {
            this.topFin = val;
            if (val == "top_fin_2") {
                this.fishOne.getObjectByName("top_fin_2").visible = true;
                this.fishOne.getObjectByName("top_fin_1").visible = false;
            }
            if (val == "top_fin_1") {
                this.fishOne.getObjectByName("top_fin_1").visible = true;
                this.fishOne.getObjectByName("top_fin_2").visible = false;
            } if(!val) {
                this.fishOne.getObjectByName("top_fin_1").visible = false;
                this.fishOne.getObjectByName("top_fin_2").visible = false;
            }
        },
        animate() {
            requestAnimationFrame(this.animate);
            var delta = this.clock.getDelta();
            if (this.mixer && this.fishOne) this.mixer.update(delta);
            this.renderer.render(this.scene, this.camera);
        },
        init() {
            let container = document.getElementById("container");
            // camera
            this.camera = new Three.PerspectiveCamera(100, container.clientWidth / container.clientHeight, 1, 90);
            this.camera.position.z = 50;
            this.scene = new Three.Scene();
            // background
            this.scene.background = new Three.Color(0x096ab2);
            // LIGHT
            const ambientLight = new Three.AmbientLight("#fff", 0.4);
            ambientLight.position.set(-10, 10, 10);
            const mainLight = new Three.DirectionalLight("#fff", 0.2);
            mainLight.position.set(0, -10, 10);
            const secondLight = new Three.DirectionalLight("#fff", 0.3);
            secondLight.position.set(0, 0, 1);
            this.scene.add(mainLight, secondLight, ambientLight);

            const loader = new Three.TextureLoader();
            loader.load(this.backgroundImage, (texture) => {
                this.scene.background = texture;
            });

            // Load object
            const gltfLoader = new GLTFLoader();
            gltfLoader.load(this.fishOneUlr, (gltf) => {
                this.mixer = new Three.AnimationMixer(gltf.scene);
                gltf.animations.forEach((clip) => {
                    this.mixer.clipAction(clip).play();
                });
                this.fishOne = gltf.scene;
                this.scene.add(this.fishOne);

                // this.fishOne.rotation.x = this.startAxis.x;
                // this.fishOne.rotation.z = this.startAxis.z;
                this.fishOne.getObjectByName("fish").rotation.y = 0;
                this.fishOne.getObjectByName("back_fin_1").visible = false;
                this.fishOne.getObjectByName("back_fin_2").visible = false;
                this.fishOne.getObjectByName("side_fin_1").visible = false;
                this.fishOne.getObjectByName("side_fin_2").visible = false;
                this.fishOne.getObjectByName("top_fin_1").visible = false;
                this.fishOne.getObjectByName("top_fin_2").visible = false;
                this.defaultPosition();
            });

            // RENDER
            this.renderer = new Three.WebGLRenderer({ antialias: true });
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(this.renderer.domElement);

            setTimeout(() => {
                this.changeSpeed(0)
            }, 100);

        },
    },
    mounted() {
        this.init();
        this.animate();
        window.addEventListener("resize", this.onWindowResize, false);
    },
};
</script>

<style scoped>
.infoBox button {
    background-color: red;
    display: block;
    width: 100%;
    padding: 1em;
    color: #fff;
    border: none !important;
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

.inactive {
    opacity: 0.3;
    pointer-events: none;
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

.guide {
    position: fixed;
    height: 190px;
    top: 10px;
    right: 10px;
}

footer {
    position: absolute;
    bottom: 0;
    width: 100%;
}

.fin {
    display: inline-block;
    width: 300px;
    vertical-align: bottom;
    cursor: pointer;
}

.fin p {
    margin: 0;
}

.test {
    background-color: rgb(19, 28, 33) !important;
    color: #fff;
    width: 100px !important;
    line-height: 60px;
}

.fin__select img {
    width: 80%;
    height: 80%;
    object-fit: contain;
}

.fin__select {
    width: 60px;
    height: 60px;
    display: inline-block;
    background-color: #fff;
    border: rgb(19, 28, 33) 2px solid;
    border-radius: 16px;
    margin: 10px
}
</style>
