<template>
    <div>
        <AutoComplete :suggestions="filteredQuestions" v-model="question" placeholder="Frage auswählen oder neue eingeben..." dropdown @complete="searchQuestions" class="w-100" :disabled="!newQuestion"/>
        <Divider />
        <div class="answer-row-flex">
            <IftaLabel>
                <InputText id="correct" placeholder="Richtig" v-model="correct" :disabled="!newQuestion"/>
                <label for="correct">Richtige Antwort</label>
            </IftaLabel>
            <IftaLabel>
                <InputText id="wrong1" placeholder="Falsch" v-model="wrong1" :disabled="!newQuestion"/>
                <label for="wrong1">Falsche Antwort 1</label>
            </IftaLabel>
            <IftaLabel>
                <InputText id="wrong2" placeholder="Falsch" v-model="wrong2" :disabled="!newQuestion"/>
                <label for="wrong2">Falsche Antwort 2</label>
            </IftaLabel>
            <IftaLabel>
                <InputText id="wrong3" placeholder="Falsch" v-model="wrong3" :disabled="!newQuestion"/>
                <label for="wrong3">Falsche Antwort 3</label>
            </IftaLabel>
        </div>
        <Button v-if="newQuestion" @click="submitAnswers">{{ newQuestion ? 'Frage erstellen' : 'Antwortmöglichkeiten aktualisieren' }}</Button>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch, defineProps, onMounted, withDefaults } from 'vue';
import { useGameStore } from '@/stores/game';
import InputText from 'primevue/inputtext';
import { Divider } from 'primevue';
import Button from 'primevue/button';
import IftaLabel from 'primevue/iftalabel';
import AutoComplete from 'primevue/autocomplete';

const gameStore = useGameStore();

const correct = ref();
const wrong1 = ref('');
const wrong2 = ref('');
const wrong3 = ref('');
const questions = ref(["Welche Stadt sieht man hier?","Welche ist die dominante Bauperiode in diesem Ausschnitt?"]);
const question = ref(questions.value[0]);
const filteredQuestions = ref<string[]>([]);

const props = withDefaults(defineProps<{
    correct: string;
    wrong: string[];
    newQuestion?: boolean;
    questionCounter?: number;
    question?: string;
}>(), {
    correct: '',
    wrong: () => ['', '', ''],
    newQuestion: false,
    questionCounter: 0,
}) ;

onMounted(() => {
    correct.value = props.correct;
    question.value = props.question || questions.value[0];
    wrong1.value = props.wrong[0] || '';
    wrong2.value = props.wrong[1] || '';
    wrong3.value = props.wrong[2] || '';
});


const emit = defineEmits<{
    (e: 'submit', payload: { correct: string; wrong: string[], questionCounter: number, question: string }): void;
}>();

function submitAnswers() {
    emit('submit', {
        correct: correct.value,
        wrong: [wrong1.value, wrong2.value, wrong3.value],
        question: question.value,
        questionCounter: props.questionCounter || 0
    });
    if (props.newQuestion) {
        correct.value = '';
        wrong1.value = '';
        wrong2.value = '';
        wrong3.value = '';
    }
}


function searchQuestions(event: { query: string }) {
    console.log("searchQuestions", event);
    let _items = questions.value;
    questions.value = _items;
    filteredQuestions.value = event.query ? _items.filter((q: string) => q.toLowerCase().includes(event.query.toLowerCase())) : _items;

}
</script>


<style scoped>
.answer-row-flex {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: flex-end;
    margin-bottom: 1rem;
}

@media screen and (max-width: 600px) {
    .answer-row-flex {
        flex-direction: column;
        align-items: stretch;
    }
}
</style>
