<template>
<div class="" style="position: relative">
    <div id="container"></div>
    <div class="controls">
        <button @click="defaultPosition">RESET</button>
        <button @click="rotate('x', 0.5, 1, true)">Wobble X</button>
        <button @click="rotate('y', 0.5, 1, true)">Wobble Y </button>
        <button @click="rotate('z', 0.5, 1, true)">Wobble Z</button>
        <button @click="move('y', 1, 1, true)">Move up and down</button>
        <button @click="move('x', 1, 1, true)">Move left and right</button>
        <button :class="sideFin === 'side_fin_1' ? 'active' : null" @click="changeSideFin('side_fin_1')">Side fin 1</button>
        <button :class="sideFin === 'side_fin_2' ? 'active' : null" @click="changeSideFin('side_fin_2')">Side fin 2</button>
        <span style="padding: 0 10px">|</span>
        <button :class="backFin === 'back_fin_1' ? 'active' : null" @click="changeBackFin('back_fin_1')">Back fin 1</button>
        <button :class="backFin === 'back_fin_2' ? 'active' : null" @click="changeBackFin('back_fin_2')">Back fin 2</button>
        <span style="padding: 0 10px">|</span>
        <button @click="sink">Sink</button>
    </div>
</div>
</template>

<script>
import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { gsap, Linear } from "gsap";
export default {
    name: 'ThreeTest',
    data() {
        return {
            startAxis: {
                x: 0.2,
                y: 10,
                z: 0,
            },
            startPosition: {
                x: 0,
                y: 1,
                z: 0,
            },
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

        // Swim animations
        // axis, angle, speed, loop

        sink() {
            this.changeSpeed(10)
            this.rotate('x', 1, 3, false)
            this.rotate('z', 1, 1, true)
            this.move('y', -20, 5, false)
            setTimeout(() => {
                this.defaultPosition()
            }, 4000);
        },

        // movement functions
        changeSpeed(s) {
            this.mixer.timeScale = s
        },

        rotate(axis, angle, speed, loop) {
            angle = this.convertDecimal(angle, true)
            console.log(JSON.stringify(angle))
          //  gsap.killTweensOf(this.fishOne.rotation, axis);
            // gsap.set(this.fishOne.rotation, {
            //     [axis]: this.startAxis[axis]
            // })
            if (loop) {
                gsap.fromTo(this.fishOne.rotation, speed, {
                    [axis]: this.fishOne.rotation[axis] + angle.start
                }, {
                    [axis]: this.fishOne.rotation[axis] + angle.end,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    autoRound: false
                });
            } else {
                gsap.to(this.fishOne.rotation, speed, {
                    [axis]: this.fishOne.rotation[axis] + angle.end,
                    ease: "sine.inOut",
                });
            }

        },
        move(direction, distance, speed, loop) {
            distance = this.convertDecimal(distance, true)
            console.log(JSON.stringify(distance))
          //  gsap.killTweensOf(this.fishOne.position, direction);
            // gsap.set(this.fishOne.position, {
            //     [direction]: this.startPosition[direction]
            // })
            if (loop) {
                gsap.fromTo(this.fishOne.position, speed, {
                    [direction]: this.fishOne.position[direction] + distance.start
                }, {
                    [direction]: this.fishOne.position[direction] + distance.end,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    autoRound: false
                });
            } else {
                gsap.to(this.fishOne.position, speed, {
                    [direction]: this.fishOne.rotation[direction] + distance.end,
                    ease: "sine.inOut",
                });
            }
        },
        convertDecimal(num, removeDecimal) {
            let decimal = '0.' + num
            let converted = parseFloat(decimal)
            let x = converted + converted
            return !removeDecimal ? { start: x - decimal - decimal - decimal, end: converted } : { start: num - num - num, end: num }
        },
        defaultPosition() {
            this.changeSpeed(1)
            gsap.killTweensOf(this.fishOne.position, 'x,y,z');
            gsap.killTweensOf(this.fishOne.rotation, 'x,y,z');
            this.fishOne.rotation.y = this.startAxis.y
            this.fishOne.rotation.x = this.startAxis.x
            this.fishOne.rotation.z = this.startAxis.z
            this.fishOne.position.y = this.startPosition.y
            this.fishOne.position.x = this.startPosition.x
            this.fishOne.position.z = this.startPosition.z
            this.rotate('x', 0.1, 2, true)
            this.rotate('z', 0.1, 2, true)
            this.move('y', 0.1, 3, true)
        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        changeBackFin(val) {
            this.backFin = val

            if (val == 'back_fin_2') {
                //   this.moveY(-0.5, 0.5, 1)
                // this.moveX(0, 0, 0)
                //  this.rotateY(0, 0, 0)
                //   this.rotateX(-0.1, 0.1, 0.6)
                this.fishOne.getObjectByName('back_fin_2').visible = true
                this.fishOne.getObjectByName('back_fin_1').visible = false
            }
            if (val == 'back_fin_1') {
                //     this.rotateX(0, 0, 0)
                //   this.rotateY(-0.1, 0.1, 0.6)
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
                // this.moveY(-0.5, 0.5, 1)
                this.fishOne.getObjectByName('side_fin_2').visible = true
                this.fishOne.getObjectByName('side_fin_1').visible = false
            }
            if (val == 'side_fin_1') {
                // this.moveY(-0.1, 0.1, 0.5)
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
                gltf.animations.forEach((clip) => {
                    this.mixer.clipAction(clip).play();
                });

                this.fishOne = gltf.scene
                this.scene.add(this.fishOne);
                this.fishOne.rotation.y = this.startAxis.y
                this.fishOne.rotation.x = this.startAxis.x
                this.fishOne.rotation.z = this.startAxis.z
                this.fishOne.getObjectByName('body').rotation.y = 0
                this.fishOne.getObjectByName(this.backFin).visible = true
                this.fishOne.getObjectByName('back_fin_2').visible = false
                this.fishOne.getObjectByName(this.sideFin).visible = true
                this.fishOne.getObjectByName('side_fin_2').visible = false
                this.defaultPosition()

            })
            // RENDER
            this.renderer = new Three.WebGLRenderer({ antialias: true });
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(this.renderer.domElement);
        }
    },
    watch: {
        swimSpeed() {}
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
