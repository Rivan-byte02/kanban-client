<template>
    <!-- Task List -->
    <main class="d-flex flex-wrap bd-highlight mt-5 justify-content-start" style="height: 40vh; width: 80%; margin: auto;">
        <task-card 
        v-for="category in categories" 
        :key="category.id" 
        :category="category" 
        @categoryId="addTask" 
        @editTask="editTask" 
        @deleteTask="deleteTask"></task-card>
    </main>
</template>

<script>
import TaskCard from './TaskCard.vue'


export default {
    name: "TaskList",
    props: [
        "categories"
    ],
    data() {
        return {
            
            }
    },
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
        deleteTask(payload) {
            return this.$emit('deleteTask', payload);
        }
    }
}
</script>

<style>

</style>