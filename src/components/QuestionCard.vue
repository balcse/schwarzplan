<template>
    <div v-if="question">
        <p>Frage {{ question.counter }}</p>
        <h2>Welche Stadt sieht man hier?</h2>
        <p>{{ question.correct }}</p>
        <div class="flex flex-column gap-2">
            <div v-for="answer in allAnswers" :key="answer" class="flex align-items-center">
                <RadioButton :value="answer" v-model="selectedAnswer" :input-id="answer" />
                <label :for="answer" class="ml-2">{{ answer }}</label>
            </div>
        </div>
        <button @click="submitAnswer">Absenden</button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";
import RadioButton from 'primevue/radiobutton';
import RadioButtonGroup from 'primevue/radiobuttongroup';

const selectedAnswer = ref<string | null>(null);

const props = defineProps<{
    question: {
        counter: number;
        zoomlevel: number;
        center: [number, number];
        correct: string;
        wrong: string[];
    }
}>();

const allAnswers = computed(() => {
    if (!props.question) return [];
    return [props.question.correct, ...props.question.wrong].sort(() => Math.random() - 0.5);
});

const emit = defineEmits<{
    (e: 'answer:submit', payload: { counter: number; selected: string | null }): void;
}>();

function submitAnswer() {
    emit('answer:submit', { counter: props.question.counter, selected: selectedAnswer.value });
    selectedAnswer.value = null; // Reset selection after submission
}
</script>