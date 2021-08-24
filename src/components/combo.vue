<template>
<div class="" style="position: relative">
    <div class="guide">
        <img :src="require('@/assets/guide.png')" />
        <h3>Pitch force: {{pitch}}</h3>
        <h3>Yaw force: {{yaw}}</h3>
        <h3>Roll force: {{roll}}</h3>

    </div>
    <div id="container">

    </div>

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
            <div class="fin__select test" @click="playing = !playing" :class="hidePlay ? 'inactive' : null">
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
                z: 90,
            },
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            visible: false,
            hidePlay: false,
            imageTwo: require("@/assets/fish-guide2.jpg"),
            clock: new Three.Clock(),
            mixer: null,
            showFish: "fishObject",
            ready: false,
            fishObject: "",
            scene: "",
            fishObjectUlr: require("@/assets/flatfish.glb"),
            backgroundImage: require("@/assets/touchscreen_background.jpg"),
            backFin: "back_fin_1",
            sideFin: "",
            topFin: "",
            swimSpeed: 3,
            sinking: false,
            fins: {
                top_fin_1: {
                    rollForce: 3,
                    pitchForce: 1,
                    yawForce: -2,
                    topForce: 0,
                    sideForce: 0,
                },
                top_fin_2: {
                    rollForce: -3,
                    pitchForce: 2,
                    yawForce: 0,
                    topForce: 0,
                    sideForce: 0,
                },
                side_fin_1: {
                    rollForce: 1,
                    pitchForce: -2,
                    yawForce: 1,
                    topForce: 0,
                    sideForce: 0,
                },
                side_fin_2: {
                    rollForce: 1,
                    pitchForce: 2,
                    yawForce: 2,
                    topForce: 0,
                    sideForce: 0,
                },
                back_fin_1: {
                    rollForce: 3,
                    pitchForce: 1,
                    yawForce: 2,
                    topForce: 0,
                    sideForce: 0,
                },
                back_fin_2: {
                    rollForce: 3,
                    pitchForce: 0,
                    yawForce: 3,
                    topForce: 0,
                    sideForce: 0,
                },
            }
        }
    },
    watch: {
        fishObject: {
            deep: true,
            handler(v) {
                if (this.playing && !this.sinking) {
                    var dir_y = v.rotation._z
                    var dir_z = v.rotation._y
                    gsap.to(this.fishObject.position, 3, {
                        y: dir_y < 0 && dir_y ? this.fishObject.position.y - 50 : dir_y > 0 && dir_y ? this.fishObject.position.y + 50 : this.fishObject.position.y,
                        z: dir_z < 0 && dir_z ? this.fishObject.position.z + 100 : dir_z > 0 && dir_z ? this.fishObject.position.z - 100 : this.fishObject.position.z,
                        ease: "sine.inOut",
                    });

                }
            }

        },
        playing(val) {

            if (val == true) {
                if (this.topFin && this.sideFin) {
                    this.changeSpeed(1)
                    // pitch control (x)
                    if (this.pitch < 5) {
                        if (this.pitch > 0) {
                            this.rotate("z", this.pitch, this.swimSpeed, true); // pitch
                        }
                    } else {
                        this.rotate("z", 8, this.swimSpeed, true); // pitch
                    }

                    // Roll control (X)
                    if (this.roll < 5) {
                        this.rotate("x", this.roll, this.swimSpeed, true);
                    } else {
                        this.rotate("z", 8, this.swimSpeed, true);
                    }
                    // Yaw control (Y)
                    if (this.yaw < 5) {
                        this.rotate("y", this.yaw, this.swimSpeed, true);
                    } else {
                        this.rotate("y", 8, this.swimSpeed, true);
                    }

                } else {
                    this.sinking = true
                    this.sink()
                }

            } else {
                this.changeBackFin('back_fin_1')
                this.changeSideFin('')
                this.changeTopFin('')
                this.changeSpeed(0)
                this.defaultPosition();
            }
        },
    },
    computed: {
        // IF GREATER THAN 6, SPIN IT

        pitch() {
            let top = 0
            let side = 0
            let tail = 0
            let total = 0
            this.topFin ? top = this.fins[this.topFin].pitchForce : top = 0
            this.sideFin ? side = this.fins[this.sideFin].pitchForce : side = 0
            this.backFin ? tail = this.fins[this.backFin].pitchForce : tail = 0
            total = top + side + tail
            if (total <= 0) {
                return 0
            } else if (total >= 3) {
                return 3
            } else {
                return 0
            }

        },
        yaw() {
            let top = 0
            let side = 0
            let tail = 0
            let total = 0
            this.topFin ? top = this.fins[this.topFin].yawForce : top = 0
            this.sideFin ? side = this.fins[this.sideFin].yawForce : side = 0
            this.backFin ? tail = this.fins[this.backFin].yawForce : tail = 0
            total = top + side + tail
            if (total <= 0) {
                return 0
            } else if (total >= 3) {
                return 3
            } else {
                return 0
            }
        },

        roll() {
            let top = 0
            let side = 0
            let tail = 0
            let total = 0
            this.topFin ? top = this.fins[this.topFin].rollForce : top = 0
            this.sideFin ? side = this.fins[this.sideFin].rollForce : side = 0
            this.backFin ? tail = this.fins[this.backFin].rollForce : tail = 0
            total = top + side + tail
            if (total <= 0) {
                return 0
            } else if (total >= 3) {
                return 3
            } else {
                return 0
            }
        },
        // sideForce()
    },

    methods: {
        // Swim animations
        // axis, angle, speed, loop
        sink() {

            this.hidePlay = true

            this.move("y", -60, 5, false);
            this.rotate("y", 100, 5, false);
            this.rotate("z", 100, 2, false);
            this.rotate("x", 100, 2, false);
            setTimeout(() => {
                this.changeSpeed(0)
                this.hidePlay = false
                this.defaultPosition();
                this.playing = false
                this.sinking = false

            }, 5000);
        },
        // movement functions
        changeSpeed(s) {
            this.mixer.timeScale = s;
        },
        rotate(axis, angle, speed, loop) {
            angle = this.convertDecimal(angle, false);
            //   console.log(JSON.stringify(angle));
            gsap.killTweensOf(this.fishObject.rotation, axis);
            gsap.set(this.fishObject.rotation, {
                [axis]: this.startAxis[axis],
            });
            if (loop) {
                gsap.fromTo(
                    this.fishObject.rotation,
                    speed, {
                        [axis]: this.fishObject.rotation[axis] + angle.start,
                    }, {
                        [axis]: this.fishObject.rotation[axis] + angle.end,
                        yoyo: true,
                        repeat: -1,
                        ease: "sine.inOut",

                    }
                );
            } else {
                gsap.to(this.fishObject.rotation, speed, {
                    [axis]: this.fishObject.rotation[axis] + angle.end,
                    ease: "sine.inOut",
                });
            }
        },
        move(direction, distance, speed, loop) {
            distance = this.convertDecimal(distance, true);
            console.log(JSON.stringify(distance));
            gsap.killTweensOf(this.fishObject.position, direction);
            // gsap.set(this.fishObject.position, {
            //     [direction]: this.startPosition[direction]
            // })
            if (loop) {
                gsap.fromTo(
                    this.fishObject.position,
                    speed, {
                        [direction]: this.fishObject.position[direction] + distance.start,
                    }, {
                        [direction]: this.fishObject.position[direction] + distance.end,
                        yoyo: true,
                        repeat: -1,
                        ease: "sine.inOut",

                    }
                );
            } else {
                gsap.to(this.fishObject.position, speed, {
                    [direction]: this.fishObject.rotation[direction] + distance.end,
                    ease: "sine.inOut",
                    //   delay: 0.5
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
                (this.fishObject[rotationPosition].val = this.startAxis[val]) :
                (this.fishObject[rotationPosition].val = this.startPosition[val]);
        },
        defaultPosition() {
            gsap.killTweensOf(this.fishObject.position, "x,y,z");
            gsap.killTweensOf(this.fishObject.rotation, "x,y,z");
            this.fishObject.rotation.y = this.startAxis.y;
            this.fishObject.rotation.x = this.startAxis.x;
            this.fishObject.rotation.z = this.startAxis.z;
            this.fishObject.position.y = this.startPosition.y;
            this.fishObject.position.x = this.startPosition.x;
            this.fishObject.position.z = this.startPosition.z;
        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        changeBackFin(val) {
            this.backFin = val;
            if (val == "back_fin_2") {
                this.fishObject.getObjectByName("back_fin_2").visible = true;
                this.fishObject.getObjectByName("back_fin_1").visible = false;
            }
            if (val == "back_fin_1") {
                this.fishObject.getObjectByName("back_fin_1").visible = true;
                this.fishObject.getObjectByName("back_fin_2").visible = false;
            }
            if (!val) {
                this.fishObject.getObjectByName("back_fin_1").visible = false;
                this.fishObject.getObjectByName("back_fin_2").visible = false;
            }
        },
        changeSideFin(val) {
            this.sideFin = val;
            if (val == "side_fin_2") {
                this.fishObject.getObjectByName("side_fin_2").visible = true;
                this.fishObject.getObjectByName("side_fin_1").visible = false;
            }
            if (val == "side_fin_1") {
                this.fishObject.getObjectByName("side_fin_1").visible = true;
                this.fishObject.getObjectByName("side_fin_2").visible = false;
            }
            if (!val) {
                this.fishObject.getObjectByName("side_fin_1").visible = false;
                this.fishObject.getObjectByName("side_fin_2").visible = false;
            }
        },
        changeTopFin(val) {
            this.topFin = val;
            if (val == "top_fin_2") {
                this.fishObject.getObjectByName("top_fin_2").visible = true;
                this.fishObject.getObjectByName("top_fin_1").visible = false;
            }
            if (val == "top_fin_1") {
                this.fishObject.getObjectByName("top_fin_1").visible = true;
                this.fishObject.getObjectByName("top_fin_2").visible = false;
            }
            if (!val) {
                this.fishObject.getObjectByName("top_fin_1").visible = false;
                this.fishObject.getObjectByName("top_fin_2").visible = false;
            }
        },
        animate() {
            requestAnimationFrame(this.animate);
            var delta = this.clock.getDelta();
            if (this.mixer && this.fishObject) this.mixer.update(delta);
            this.renderer.render(this.scene, this.camera);
        },
        init() {
            let container = document.getElementById("container");
            // camera
            this.camera = new Three.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
            this.camera.position.z = 200;
            // TOP VIEWcomment out in productipn
            // this.camera.rotation.x = 125;
            // this.camera.position.y = 40;

            this.scene = new Three.Scene();
            // background
            this.scene.background = new Three.Color(0x096ab2);
            // LIGHT
            const ambientLight = new Three.AmbientLight("#fff", 1.3);
            ambientLight.position.set(-10, 10, 10);
            const mainLight = new Three.DirectionalLight("green", 4);
            mainLight.position.set(0, -0, 0);
            const secondLight = new Three.DirectionalLight("#fff", 0.3);
            secondLight.position.set(0, 0, 1);
            this.scene.add(mainLight, ambientLight);
            const loader = new Three.TextureLoader();
            loader.load(this.backgroundImage, (texture) => {
                this.scene.background = texture;

            });
            // Load object
            const gltfLoader = new GLTFLoader();
            gltfLoader.load(this.fishObjectUlr, (gltf) => {
                this.mixer = new Three.AnimationMixer(gltf.scene);
                gltf.animations.forEach((clip) => {
                    this.mixer.clipAction(clip).play();
                });
                this.mixer.timeScale = 0;
                this.fishObject = gltf.scene;
                this.scene.add(this.fishObject);
                // this.fishObject.rotation.x = this.startAxis.x;
                // this.fishObject.rotation.z = this.startAxis.z;
                this.fishObject.getObjectByName("fish").rotation.y = 0;
                this.fishObject.getObjectByName("fish").position.y = 0;
                this.fishObject.getObjectByName("fish").position.x = 0;
                this.fishObject.getObjectByName("back_fin_1").visible = true;
                // this.fishObject.getObjectByName("body").visible = true;
                this.fishObject.getObjectByName("back_fin_2").visible = false;
                this.fishObject.getObjectByName("side_fin_1").visible = false;
                this.fishObject.getObjectByName("side_fin_2").visible = false;
                this.fishObject.getObjectByName("top_fin_1").visible = false;
                this.fishObject.getObjectByName("top_fin_2").visible = false;
                this.defaultPosition();
            });
            // RENDER
            this.renderer = new Three.WebGLRenderer({ antialias: true });
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(this.renderer.domElement);

            setTimeout(() => {
                this.changeSpeed(0)

            }, 1000);
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
    height: auto;
    top: 10px;
    right: 10px;
    text-align: right;
    background-color: #fff;
    padding: 1em;
    width: 200px;
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
