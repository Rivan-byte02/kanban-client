<template>
    <div class="d-flex p-4 flex-column mb-4 me-5 overflow-auto" style="background-color: orange; width: 30%; height: max-content; border-radius: 15px;">
        <div class="text-capitalize test-wrap bg-primary badge text-start fs-3 mb-2">{{ category.name }} </div>
            <task v-for="task in category.Tasks" :key="task.id" :task="task" @editTask="categoryId" @deleteTask="categoryId"></task>
        <button class="btn btn-secondary" @click.prevent="addTask(category.id)">+ Add new task</button>
    </div>
</template>

<script>
import Task from './Task.vue';

export default {
    name: "TaskCard",
    props: [
        "category"
    ],
    data() {
        return {
            
            }
    },
    components: {
        Task
    },
    methods: {
        addTask(id) {
            return this.$emit('categoryId', id);
        },
        categoryId(payload) {
            if (payload.page === 'update-task') {
                return this.$emit('editTask', payload);
            }
            return this.$emit('deleteTask', payload);
        }
    }
}
</script>

<style>

</style>