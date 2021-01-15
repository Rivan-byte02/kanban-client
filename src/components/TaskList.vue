<template>
    <!-- Task List -->
    <main class="d-flex flex-wrap bd-highlight mt-5 justify-content-start" style="height: 40vh; width: 1500px; margin: 0 12em;">
        <task-card 
        v-for="category in categories" 
        :key="category.id" 
        :category="category" 
        @categoryId="addTask" 
        @editTask="editTask" 
        @deleteTask="deleteTask"
        @moveCategory="moveCategory"></task-card>
    </main>
</template>

<script>
import TaskCard from './TaskCard.vue'


export default {
    name: "TaskList",
    props: [
        "categories"
    ],
    components: {
        TaskCard
    },
    methods: {
        addTask(payload) {
            const obj = {
                id: payload,
                page: "add-task"
            }
            return this.$emit('addTask', obj);
        },
        editTask(payload) {
            return this.$emit('editTask', payload);
        },
        moveCategory(payload) {
            return this.$emit('moveCategory', payload);
        },
        deleteTask(payload) {
            return this.$emit('deleteTask', payload);
        }
    }
}
</script>

<style>

</style>