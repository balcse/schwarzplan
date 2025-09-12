<template>
    <div class="container-fluid h-100">
        <div class="row h-100">
            <div class="col-6 d-flex flex-column h-100 p-0">
                <Map ref="mapRef" class="flex-fill w-100" :mapextent="mapextent" :basemap-visible="true" />
            </div>
            <div class="col-6 d-flex flex-column h-100 p-0 align-items-start">
                <Setup class="w-100" @submit="handleSubmit" />
                <div class="w-100" style="max-height: 30vh; overflow-y: auto;">
                    <QuestionList @question:select="handleQuestionSelect" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Map from './Map.vue';
import Setup from './AddQuestion.vue';
import QuestionList from './QuestionList.vue';
import { ref } from 'vue';
import { useGameStore } from '../stores/game.ts';


const gameStore = useGameStore();
const mapextent = ref({
    zoom: 5.33,
    lat: 51.666305041908316,
    lon: 10.172657751668567,
});
const mapRef = ref();

function handleMapExtentUpdate(newExtent: { lat: number; lon: number; zoom: number; }) {
    mapextent.value = {
        zoom: newExtent.zoom,
        lat: newExtent.lat,
        lon: newExtent.lon,
    };
}

function handleQuestionSelect(question: any) {
    console.log('Selected question:', question);
    mapextent.value = {
        lat: question.center[0],
        lon: question.center[1],
        zoom: question.zoomlevel
    };
    // Handle the selected question as needed
}

function handleSubmit(payload: { correct: string; wrong: string[] }) {
    // Get the latest map extent from the Map component
    const currentExtent = mapRef.value?.getMapExtent?.() || mapextent.value;
    gameStore.addQuestion(
        currentExtent.zoom,
        [currentExtent.lat, currentExtent.lon],
        payload.correct,
        payload.wrong
    );
    // Handle the submitted answers as needed
}
</script>
<style>
html,
body,
#app {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
}
</style>
