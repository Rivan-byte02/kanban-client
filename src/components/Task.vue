<template>
    <div  class="card mb-2">
        <div class="card-body d-flex flex-column justify-content-evenly" style="overflow: auto;">
            <h5 class="card-title">{{ task.title }}</h5>
            <p class="card-text">{{ task.description }}</p>
            <div class="align-self-center">
                <a href="#" class="btn btn-primary" @click.prevent="editTask(task.id)">Edit Task</a>
                <a href="#" class="btn btn-danger" @click.prevent="deleteTask(task.id)">Delete Task</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Task",
    props: [
        "task"
    ],
    methods: {
        editTask(id) {
            const obj = {
                id,
                page: "update-task"
            }
            return this.$emit('editTask', obj);
        },
        deleteTask(id) {
            return this.$emit('deleteTask', id);
        }
    }
}
</script>

<style>

</style>