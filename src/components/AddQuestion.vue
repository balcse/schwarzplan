<template>
    <div>
        <p>Neue Frage erstellen</p>
        <p>Welche Stadt sieht man hier?</p>
        <InputText placeholder="Richtig" v-model="correct" />
        <InputText placeholder="Falsch" v-model="wrong1" />
        <InputText placeholder="Falsch" v-model="wrong2" />
        <InputText placeholder="Falsch" v-model="wrong3" />
        <button @click="submitAnswers">Frage erstellen</button>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';
import { useGameStore } from '@/stores/game';
import InputText from 'primevue/inputtext';

const gameStore = useGameStore();

const correct = ref('');
const wrong1 = ref('');
const wrong2 = ref('');
const wrong3 = ref('');

const emit = defineEmits<{
    (e: 'submit', payload: { correct: string; wrong: string[] }): void;
}>();

function submitAnswers() {
    emit('submit', {
        correct: correct.value,
        wrong: [wrong1.value, wrong2.value, wrong3.value],
    });
    correct.value = '';
    wrong1.value = '';
    wrong2.value = '';
    wrong3.value = '';
}

</script>


<style scoped></style>
