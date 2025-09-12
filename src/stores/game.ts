import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', () => {
    const questionlist = ref<any[]>([]);
    const counter = ref(1);

    function addQuestion(zoomlevel: number, center: [number, number], correct: string, wrong: string[]) {
        questionlist.value.push({ counter: counter.value++, zoomlevel, center, correct, wrong });
    }

    function removeQuestion(counter: number) {
        questionlist.value = questionlist.value.filter(q => q.counter !== counter);
    }

    function downloadQuestions() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questionlist.value, null, 2));
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "questions.json");
        document.body.appendChild(dlAnchorElem);
        dlAnchorElem.click();
        document.body.removeChild(dlAnchorElem);
    }

    function loadQuestions(questions: any[]) {
        questionlist.value = questions;
        counter.value = questions.length > 0 ? Math.max(...questions.map(q => q.counter)) + 1 : 1;
    }

    function clearQuestions() {
        questionlist.value = [];
        counter.value = 1;
    }

    return { questionlist, addQuestion, removeQuestion, downloadQuestions, loadQuestions, clearQuestions };
});