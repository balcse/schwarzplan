<template>
    <div>
        <FileUpload mode="advanced" name="json" accept=".json,application/json" :auto="true" :customUpload="true"
            @uploader="onFileUpload" chooseLabel="Select JSON">
            <template #empty class="fileupload">
                <span>Drag and drop files to here to upload.</span>
            </template>
        </FileUpload>
    </div>
</template>

<script setup lang="ts">
import FileUpload from 'primevue/fileupload';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();

function onFileUpload(event: any) {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target?.result as string);
            console.log('JSON file content:', json);
            gameStore.loadQuestions(json);
        } catch (err) {
            console.error('Invalid JSON:', err);
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