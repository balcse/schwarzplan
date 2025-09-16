<template>
<div>
  <ul>
    <div v-for="game in games" :key="game.filename" class="game-item" @click="selectGame(game)">
      {{ game.name }}
    </div>
  </ul>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useGameStore } from '@/stores/game';
const selectedGame = ref<string | null>(null);
const gameStore = useGameStore();

const games = [
    { filename: 'eu_hauptstaedte.json', name: 'EU-Hauptstädte'},
    {filename: 'de_landeshauptstaedte.json', name: 'Deutsche Landeshauptstädte'},
    {filename: 'long_names.json', name: 'Allgemeinwissen'},
];

async function selectGame(game: { filename: string; name: string }) {
    selectedGame.value = game.filename;
    const response = await fetch(`https://raw.githubusercontent.com/balcse/schwarzplan/refs/heads/main/assets/games/${game.filename}`);
    const data = await response.json();
    gameStore.loadQuestions(data);
}

</script>

<style scoped>
.game-item {
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 5px;
    cursor: pointer;
    width: fit-content;
}
.game-item:hover {
    background-color: #f0f0f0;
}
</style>