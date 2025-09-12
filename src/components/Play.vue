<template>
    <div v-if="gameStore.questionlist.length">
        <div v-for="question in gameStore.questionlist" :key="question.counter">
            <div v-if="question.counter == currentQuestion && !finished"
                style="display: flex; flex-direction: row; gap: 2rem; align-items: flex-start;">
                <div style="flex: 1 1 0; min-width: 0;">
                    <Map :mapextent="GetMapextent()" :basemapVisible="basemapVisible"
                        style="height: 300px; width: 100%; margin-bottom: 1rem;" />
                </div>
                <div style="flex: 1 1 0; min-width: 0;">
                    <div v-if="showAnswer">
                        <p v-if="correctAnswer">Die richtige Antwort ist: {{ correctAnswer }}</p>
                        <button @click="nextQuestion(); showAnswer = false;">Nächste Frage</button>
                    </div>
                    <QuestionCard v-else :question="question" @answer:submit="handleAnswerSubmit" />
                </div>
            </div>
            <div v-else-if="question.counter == currentQuestion && finished">
                <h2>Quiz Fertig!</h2>
                {{ correct }} von {{ correct + wrong }} richtig.
                <button @click="currentQuestion = 1; finished = false; correct = 0; wrong = 0;">Nochmal Spielen</button>
                <button
                    @click="currentQuestion = 1; finished = false; correct = 0; wrong = 0; gameStore.clearQuestions()">Neues
                    Spiel</button>
            </div>
        </div>
    </div>
    <UploadQuestions v-else />
</template>

<script setup lang="ts">
import UploadQuestions from './UploadQuestions.vue';
import QuestionCard from './QuestionCard.vue';
import { useGameStore } from '@/stores/game';
import { ref, computed, watch } from 'vue';
import Map from './Map.vue';

const currentQuestion = ref(1);
const correctAnswer = ref<string | null>(null);
const basemapVisible = ref(false);
const finished = ref(false);
const correct = ref(0);
const wrong = ref(0);
const showAnswer = ref(false);

const gameStore = useGameStore();
const questions = computed(() => gameStore.questionlist);


function GetMapextent() {
    const question = gameStore.questionlist.find(q => q.counter === currentQuestion.value);
    if (question) {
        return { lat: question.center[0], lon: question.center[1], zoom: question.zoomlevel };
    }
    // Provide a default value to satisfy the type requirement
    return { lat: 0, lon: 0, zoom: 1 };
}



function handleAnswerSubmit(payload: { counter: number; selected: string | null }) {
    correctAnswer.value = questions.value.find(q => q.counter === payload.counter)?.correct || null;
    showAnswer.value = true;
    basemapVisible.value = true;
    if (payload.selected === correctAnswer.value) {
        console.log('Correct answer!');
        correct.value += 1;
    } else {
        console.log('Wrong answer. Correct was:', correctAnswer.value);
        wrong.value += 1;
    }
}

function nextQuestion() {
    showAnswer.value = false;
    basemapVisible.value = false;
    if (currentQuestion.value < gameStore.questionlist.length) {
        currentQuestion.value += 1;
    } else {
        console.log('Quiz completed!');
        finished.value = true;
    }
}

</script>