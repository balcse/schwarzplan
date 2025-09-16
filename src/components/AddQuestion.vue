<template>
    <div>
        <p>Welche Stadt sieht man hier?</p>
        <div class="flex align-items-center gap-2" v-if="newQuestion">
        <div class="answer-row-flex">
            <IftaLabel>
                <InputText id="correct" placeholder="Richtig" v-model="correct" />
                <label for="correct">Richtige Antwort</label>
            </IftaLabel>
            <IftaLabel>
                <InputText id="wrong1" placeholder="Falsch" v-model="wrong1" />
                <label for="wrong1">Falsche Antwort 1</label>
            </IftaLabel>
            <IftaLabel>
                <InputText id="wrong2" placeholder="Falsch" v-model="wrong2" />
                <label for="wrong2">Falsche Antwort 2</label>
            </IftaLabel>
            <IftaLabel>
                <InputText id="wrong3" placeholder="Falsch" v-model="wrong3" />
                <label for="wrong3">Falsche Antwort 3</label>
            </IftaLabel>
        </div>
        <Button v-if="newQuestion" @click="submitAnswers">{{ newQuestion ? 'Frage erstellen' : 'Antwortmöglichkeiten aktualisieren' }}</Button>
        </div>
        <div v-else class="flex align-items-center gap-2">
        <div class="answer-row-flex">
            <IftaLabel>
                <InputText id="correct" placeholder="Richtig" v-model="correct" disabled />
                <label for="correct">Richtige Antwort</label>
            </IftaLabel>
            <IftaLabel>
                <InputText id="wrong1" placeholder="Falsch" v-model="wrong1" disabled />
                <label for="wrong1">Falsche Antwort 1</label>
            </IftaLabel>
            <IftaLabel>
                <InputText id="wrong2" placeholder="Falsch" v-model="wrong2" disabled/>
                <label for="wrong2">Falsche Antwort 2</label>
            </IftaLabel>
            <IftaLabel>
                <InputText id="wrong3" placeholder="Falsch" v-model="wrong3" disabled/>
                <label for="wrong3">Falsche Antwort 3</label>
            </IftaLabel>
        </div>
            <!-- <Button @click="submitAnswers">{{ newQuestion ? 'Frage erstellen' : 'Antwortmöglichkeiten aktualisieren' }}</Button> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch, defineProps, onMounted, withDefaults } from 'vue';
import { useGameStore } from '@/stores/game';
import InputText from 'primevue/inputtext';
import { Divider } from 'primevue';
import Button from 'primevue/button';
import IftaLabel from 'primevue/iftalabel';

const gameStore = useGameStore();

const correct = ref();
const wrong1 = ref('');
const wrong2 = ref('');
const wrong3 = ref('');

const props = withDefaults(defineProps<{
    correct: string;
    wrong: string[];
    newQuestion?: boolean;
    questionCounter?: number;
}>(), {
    correct: '',
    wrong: () => ['', '', ''],
    newQuestion: false,
    questionCounter: 0,
}) ;

onMounted(() => {
    correct.value = props.correct;
    wrong1.value = props.wrong[0] || '';
    wrong2.value = props.wrong[1] || '';
    wrong3.value = props.wrong[2] || '';
});


const emit = defineEmits<{
    (e: 'submit', payload: { correct: string; wrong: string[], questionCounter: number }): void;
}>();

function submitAnswers() {
    emit('submit', {
        correct: correct.value,
        wrong: [wrong1.value, wrong2.value, wrong3.value],
        questionCounter: props.questionCounter || 0
    });
    if (props.newQuestion) {
        correct.value = '';
        wrong1.value = '';
        wrong2.value = '';
        wrong3.value = '';
    }
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
