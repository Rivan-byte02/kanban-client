<template>
    <div class="d-flex p-4 flex-column ms-5 mb-4 overflow-auto" style="background-color: orange; width: 20%; height: max-content; max-height: 400px; border-radius: 15px;">
        <div class="text-capitalize test-wrap bg-primary badge text-start fs-3 mb-2">{{ category.name }} </div>
            <task v-for="task in category.Tasks" :key="task.id" :task="task" @moveCategory="categoryId" @editTask="categoryId" @deleteTask="categoryId"></task>
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
            } else if (payload.page === 'move-category') {
                return this.$emit('moveCategory', payload);
            }
            return this.$emit('deleteTask', payload);
        }
    }
}
</script>

<style>

</style>