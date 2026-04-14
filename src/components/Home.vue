<template>
    <body>
    <div v-if="currentView === 'home'">
    <h1>Schwarzplan: Städte und Bauepochen erkennen</h1>
    <p class="footer">Erstellt von Balázs Cserpes und Veronika Halbert | <a href="https://github.com/balcse/schwarzplan/blob/5e65aea365c4e9832057664a7424746d29e66df9/LICENSE" target="_blank">Lizenz</a>
    </p>
    <Button @click="currentView = 'setup'">Spiel erstellen</Button>
    <br/>
    <Button @click="currentView = 'play'">Spiel starten</Button>
    </div>
    <Button v-if="currentView !== 'home'" @click="goToHome"><i class="pi pi-home"></i></Button>
    <Setup v-if="currentView === 'setup'" />
    <Play v-if="currentView === 'play'" />
    </body>
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

<style>
body {
padding: 1em;
}

button {
margin-right: 1em;
margin-bottom: 1em;
background-color: rgb(255, 255, 255) !important;
border-color: rgb(39, 39, 39) !important;
border: 2pt solid !important;
color: rgb(0, 0, 0) !important;
}

button:hover {
    background-color: rgb(218, 218, 218) !important;
    transition: 50ms !important;
}

.footer {
    position: absolute;
    bottom: 0;
    right: 15;
}

.footer > a {
    color: black;
}

</style>