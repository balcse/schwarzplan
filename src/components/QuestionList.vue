<template>
  <div class="questionlist">
    <div v-for="(question, index) in gameStore.questionlist" :key="index">
      <i class="pi pi-eye" @click="selectQuestion(question)"></i>
      <i class="pi pi-trash" @click="gameStore.removeQuestion(question.counter)"></i>
      <p>Question {{ index + 1 }}: {{ question.correct }}</p>
      <p>{{ question }}</p>
      <!-- <p>Wrong Answers: {{ question.wrong.join(', ') }}</p> -->
    </div>
    <button @click="gameStore.downloadQuestions()">Download Questions</button>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { defineEmits } from 'vue';
import 'primeicons/primeicons.css'

const emit = defineEmits();

function selectQuestion(question: any) {
  emit('question:select', question);
}

const gameStore = useGameStore();
</script>

<style scoped></style>
