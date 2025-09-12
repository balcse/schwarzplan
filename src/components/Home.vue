<template>
    <div v-if="currentView === 'home'">
        <p>Select an option to get started:</p>
    <button @click="currentView = 'setup'">Setup</button>
    <button @click="currentView = 'play'">Play</button>
    </div>
    <button v-if="currentView !== 'home'" @click="goToHome">Back to Home</button>
    <Setup v-if="currentView === 'setup'" />
    <Play v-if="currentView === 'play'" />
</template>

<script lang="ts" setup>
import Setup from './Setup.vue';
import Play from './Play.vue';
import {ref,onMounted, onUpdated, onActivated} from 'vue';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();

const currentView = ref('home');

function goToHome() {
    currentView.value = 'home';
    gameStore.clearQuestions();
}

</script>