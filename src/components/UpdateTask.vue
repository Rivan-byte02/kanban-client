<template>
    <!-- Update Task -->
    <div class="card mx-auto" style="width: 450px; margin-top: 6em; border-radius: 20px;">
        <form class="card-body p-5" @submit.prevent="editTask(task.id)">
            <h4 class="text-center mb-3">Update Task</h4>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <label for="title" class="col-form-label">Title</label>
                </div>
                <div class="col-auto" style="width: 15em;">
                    <input v-model="task.title" type="text" name="title" id="updateTitle" class="form-control">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <label for="description" class="col-form-label">Description</label>
                </div>
                <div class="col-auto" style="width: 15em;">
                    <input v-model="task.description" type="text" name="description" id="updateDescription" class="form-control">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <label for="updateCategory" class="col-form-label">Categories</label>
                </div>
                <div class="col-auto">
                    <select v-model="task.categoryId" name="categoryId" id="updateCategory">
                        <option disabled value="">Please select one</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "UpdateTask",
    props: [
        "task", "categories"
    ],
    methods: {
        editTask(id) {
            const { title, description, categoryId } = this.task;
            const obj = {
                id,
                title,
                description,
                categoryId
            };
            return this.$emit('updateTask', obj);
        }
    }
}
</script>

<style>

</style>