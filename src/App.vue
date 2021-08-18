<template>
<div id="app">
    <combo/>
    <!-- <div class="index">
        <button @click="version = 2">version 1</button>
        <button @click="version = 1">version 2</button>

    </div>
    <blenderanimation v-if="version ==1" />
    <morphtest v-if="version == 2" />
    <div v-if="version == 3" class="text">
        Maybe, another approach this would be a combination of both versions.
        <br><br>
        <ul>
            <li>Create muliple fishes within the same project and timeline(Cinema 4d, Blender etc) </li>
            <li>Create a fish for all possible scenerios. EXAMPLE: TopFin1_Backfin4_sideFin2</li>
            <li>Have each version playing in the same position, overlapping each other</li>
            <li>The relevant version plays based on user input</li>
        </ul>

    </div> -->
</div>
</template>
<script>
import combo from './components/combo.vue'
// import blenderanimation from './components/blenderanimation.vue'
// import morphtest from './components/morphtest.vue'

export default {
    name: 'App',
    components: {
        combo
      //  blenderanimation,
  //      morphtest
    },
    data() {
        return {
            version: 2,
        }
    }
}
</script>

<style>
body {
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
}

.text {
    margin: auto;
    max-width: 500px;
    padding-top: 100px;
    text-align: left;
}

.index {
    top: 0;
    left: 0;
    position: fixed;
    z-index: 100;
    background-color: black;

}
</style>
