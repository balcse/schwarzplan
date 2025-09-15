<template>
    <div v-if="currentView === 'home'">
    <Button @click="currentView = 'setup'">Spiel erstellen</Button>
    <Button @click="currentView = 'play'">Spiel starten</Button>
    </div>
    <Button v-if="currentView !== 'home'" @click="goToHome"><i class="pi pi-home"></i></Button>
    <Setup v-if="currentView === 'setup'" />
    <Play v-if="currentView === 'play'" />
</template>

<script lang="ts" setup>
import Setup from './Setup.vue';
import Play from './Play.vue';
import {ref,onMounted, onUpdated, onActivated} from 'vue';
import { useGameStore } from '@/stores/game';
import { Button } from 'primevue';
import 'primeicons/primeicons.css'

const gameStore = useGameStore();

const currentView = ref('home');

function goToHome() {
    currentView.value = 'home';
    gameStore.clearQuestions();
}

</script>