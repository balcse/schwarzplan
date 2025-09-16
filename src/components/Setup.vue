<template>
    <div class="setup-flex-container">
        <div class="setup-flex-item setup-map-wrapper">
            <Map ref="mapRef" :mapextent="mapextent" :basemapVisible="basemapVisible" />
            <Button @click="basemapVisible = !basemapVisible">
                {{ basemapVisible ? 'Basemap ausblenden' : 'Basemap einblenden' }}
            </Button>
        </div>
        <div class="setup-flex-item">
            <Button v-if="!ShowUpload" @click="ShowUpload = !ShowUpload">{{ 'Fragen hochladen' }}</Button>
            <UploadQuestions v-if="ShowUpload && gameStore.questionlist.length === 0" />
            <p>Neue Frage erstellen</p>
            <Setup
                @submit="handleSubmit"
                :newQuestion="true"
                :correct="''"
                :wrong="[]"
            />
            <div class="setup-question-list">
                <QuestionList @question:select="handleQuestionSelect" />
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
import { Button } from 'primevue';
import UploadQuestions from './UploadQuestions.vue';


const gameStore = useGameStore();
const mapextent = ref({
    zoom: 5.33,
    lat: 51.666305041908316,
    lon: 10.172657751668567,
});

const mapRef = ref();
const basemapVisible = ref(true);
const ShowUpload = ref(false);

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
<style scoped>
.vorschau-btn {
    display: block;
    margin: 1rem auto 0 auto;
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #888;
    background: #f7f7f7;
    cursor: pointer;
    transition: background 0.2s;
}
.vorschau-btn:hover {
    background: #e0e0e0;
}
.setup-flex-container {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: stretch;
    box-sizing: border-box;
}
.setup-flex-item {
    min-width: 0;
    box-sizing: border-box;
}
.setup-map-wrapper {
    width: 90vh;
    min-height: 350px;
    aspect-ratio: 1 / 1;
    margin-bottom: 1rem;
    display: block;
}
.setup-question-list {
    width: 100%;
    /* max-height: 30vh; */
    overflow-y: scroll;
    max-height: 80vh;
}
@media (max-width: 1050px) {
    .setup-flex-container {
        flex-direction: column;
        gap: 1.5rem;
    }
    .setup-flex-item {
        width: 100%;
        min-width: 0;
        max-width: 100vw;
    }
    .setup-map-wrapper {
        min-height: 250px;
    }
}
</style>
