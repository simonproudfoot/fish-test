<template>
<div id="container"></div>
</template>

<script>
import * as Three from 'three'
import { OBJLoader } from 'three-obj-mtl-loader'

export default {
    name: 'ThreeTest',
    data() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            mesh: null,
            fish: require('@/assets/fish4.obj')
        }
    },
    methods: {
        init: function () {
            let container = document.getElementById('container');

            // camera
            this.camera = new Three.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.01, 30);
            this.camera.position.z = 10;

            this.scene = new Three.Scene();

            // background
            this.scene.background = new Three.Color(0x096AB2);

            // LIGHT
            var spotLight = new Three.SpotLight(0xF87A36);
            spotLight.position.set(500, 1000, 100);
            spotLight.castShadow = true;
            spotLight.shadowMapWidth = 1024;
            spotLight.shadowMapHeight = 1024;
            spotLight.shadowCameraNear = 500;
            spotLight.shadowCameraFar = 4000;
            spotLight.shadowCameraFov = 30;
            this.scene.add(spotLight);

            var light = new Three.HemisphereLight(0xEEE, 0xF87A36, 0.3);
            this.scene.add(light);

            var dirLight = new Three.DirectionalLight(0xF87A36, 0.9);
            dirLight.position.set(1, 1, 1);
            this.scene.add(dirLight);

            // Load object
            let loader = new OBJLoader();

            loader.load(this.fish, (loadedObject) => {
                this.fish = loadedObject
                this.scene.add(this.fish);
                this.fish.position.z = -4;
                this.fish.position.y = -1.5;
                //   this.fish.material.flatShading = true;
                this.fish.material.castShadow = true;

                console.log(this.fish)
            })

            // set object material
            var material_flat = new Three.MeshPhongMaterial({
                color: 0xF87A36,
                shading: Three.FlatShading,
                shininess: 200,
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
            requestAnimationFrame(this.animate);

            this.fish ? this.fish.rotation.y += 0.01 : null
            // this.loadedObject.rotation.y += 0.02;

            this.renderer.render(this.scene, this.camera);
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
}
</style>
