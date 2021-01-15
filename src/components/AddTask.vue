<template>
    <!-- Add New Task -->
    <main class="card mx-auto" style="width: 450px; margin-top: 6em; border-radius: 20px;">
        <form class="card-body p-5" @submit.prevent="createTask">
            <h4 class="text-center mb-3">Add New Task</h4>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <label for="title" class="col-form-label">Title</label>
                </div>
                <div class="col-auto" style="width: 15em;">
                    <input v-model="title" type="text" name="title" id="title" class="form-control">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <label for="description" class="col-form-label">Description</label>
                </div>
                <div class="col-auto" style="width: 15em;">
                    <input v-model="description" type="text" name="description" id="description" class="form-control">
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <label for="categoryId" class="col-form-label">Categories</label>
                </div>
                <div class="col-auto">
                    <select v-model="categoryId" name="categoryId" id="categoryId">
                        <option disabled value="">Please select one</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id" >{{ category.name }}</option>
                    </select>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Add</button>
        </form>
    </main>
</template>

<script>
export default {
    name: "AddTask",
    props: [
        "categories"
    ],
    data() {
        return {
            title: '',
            description: '',
            categoryId: null
        }
    },
    methods: {
        createTask(){
            const obj = {
                title: this.title,
                description: this.description,
                CategoryId: this.categoryId
            };
            return this.$emit('createTask', obj);
        },
    }
}
</script>

<style>
    main {
        width: 1600px;
        margin: 0 7em;
    }
</style>