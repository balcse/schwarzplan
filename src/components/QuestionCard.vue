<template>
    <div v-if="question" :class="{ submitted }">
        <h2>Welche Stadt sieht man hier?</h2>
        <div class="flex flex-column gap-2">
            <div v-for="answer in allAnswers" :key="answer" :class="'answer-row ' + calcClass(answer) + (submitted ? ' submitted' : '')" @click="!submitted && selectAnswer(answer)">
                <div class="answer-flex">
                    <RadioButton :value="answer" v-model="selectedAnswer" :input-id="answer" :disabled="submitted" />
                    <label :for="answer" class="answer-label">{{ answer }}</label>
                </div>
            </div>
        </div>
        <Button v-if="!submitted && selectedAnswer" @click="submitAnswer">Absenden</Button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";
import RadioButton from 'primevue/radiobutton';
import RadioButtonGroup from 'primevue/radiobuttongroup';
import Panel from 'primevue/panel';
import { Button } from "primevue";

const selectedAnswer = ref<string | null>(null);
const submitted = ref(false);

const props = defineProps<{
    question: {
        counter: number;
        zoomlevel: number;
        center: [number, number];
        correct: string;
        wrong: string[];
    }
}>();


function selectAnswer(answer: string) {
    selectedAnswer.value = answer;
}

function calcClass(answer: string) {
    const classes = [];
    if (selectedAnswer.value === answer) classes.push('selected');
        if (submitted.value) {
            if (answer === props.question.correct) {
                classes.push('correct', 'no-hover');
            } else if (selectedAnswer.value === answer) {
                classes.push('wrong', 'no-hover');
            }
        }
    classes.push('disabled');
    return classes.join(' ');
}

const allAnswers = computed(() => {
    if (!props.question) return [];
    return [props.question.correct, ...props.question.wrong].sort(() => Math.random() - 0.5);
});

const emit = defineEmits<{
    (e: 'answer:submit', payload: { counter: number; selected: string | null }): void;
}>();

function submitAnswer() {
    submitted.value = true;
    emit('answer:submit', { counter: props.question.counter, selected: selectedAnswer.value });
}
</script>

<style scoped>
.answer-row {
    margin-bottom: 0.5rem;
    cursor: pointer;
    padding: 1rem;
    border: 2px solid #d6d6d6;
    border-radius: 0.5rem;
}

.answer-row.selected {
    border: 2px solid #1d1d1d;
}

.answer-row:hover {
    background-color: #e4e4e4;
}
.answer-row.correct,
.answer-row.correct:hover {
    background-color: #bee5bf !important;
    cursor: default;
}
.answer-row.wrong,
.answer-row.wrong:hover {
    background-color: #ffcecb !important;
    cursor: default;
}
.submitted .answer-row:hover {
    background-color: inherit;
    cursor: default;
}

.answer-row.correct {
    background-color: #aceeaf; /* Green for correct */
}

.answer-row.wrong {
    background-color: #f8c9c5; /* Red for wrong */
}

.answer-flex {
    display: flex;
    align-items: center;
    flex-direction: row;
}
.answer-label {
    margin-left: 1rem;
    font-size: 1.1rem;
    line-height: 1;
    user-select: none;
}

button {
    margin-top: 1rem;
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
}
</style>