<template>
  <div class="questionlist">
    <Accordion value="0">
      <AccordionPanel v-for="(question, index) in gameStore.questionlist" :key="index" :value="index" @click="selectQuestion(question)">
        <AccordionHeader>
          Frage {{ index + 1 }}: {{ question.correct }}
        </AccordionHeader>
        <AccordionContent>
          <AddQuestion :correct="question.correct" :wrong="question.wrong" :questionCounter="question.counter" @submit="handleSubmit" />
          <Button icon="pi pi-trash" @click="gameStore.removeQuestion(question.counter)"></Button>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
  <Button @click="gameStore.downloadQuestions()">Fragen herunterladen</Button>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { defineEmits } from 'vue';
import Button from 'primevue/button';
import 'primeicons/primeicons.css'
import AddQuestion from './AddQuestion.vue';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

const emit = defineEmits();

function selectQuestion(question: any) {
  emit('question:select', question);
}

const gameStore = useGameStore();

function handleSubmit(payload: { correct: string; wrong: string[], questionCounter: number }) {
  gameStore.updateQuestion(payload.questionCounter, payload.correct, payload.wrong);
}

</script>

<style scoped>
.questionlist {
  margin-bottom: 1rem;
}
</style>
