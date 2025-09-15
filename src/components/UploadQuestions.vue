<template>
    <div>
        <FileUpload mode="advanced" name="json" accept=".json,application/json" :auto="true" :customUpload="true"
            @uploader="onFileUpload" chooseLabel="Select JSON">
            <template #empty class="fileupload">
                <span>Drag and drop files to here to upload.</span>
            </template>
        </FileUpload>
        <div v-if="errorMsg" style="color: red; margin-top: 1rem;">{{ errorMsg }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FileUpload from 'primevue/fileupload';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
const errorMsg = ref('');

function onFileUpload(event: any) {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target?.result as string);
            gameStore.loadQuestions(json);
            errorMsg.value = ''; // Clear error if successful
        } catch (err) {
            errorMsg.value = 'Die Datei ist kein gültiges JSON oder hat das falsche Format.';
            console.error('Invalid JSON:', err);
            reader.abort();
        }
    };
    reader.readAsText(file);

}
</script>

<style scoped>
.fileupload {
    width: 100%;
    max-width: 600px;
    height: 500px;
    margin: 0 auto;
}
</style>