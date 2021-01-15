<template>
    <!-- Move Category -->
    <div class="card mx-auto" style="width: 450px; margin-top: 6em; border-radius: 20px;">
        <form class="card-body p-5" @submit.prevent="moveCategory(task.id)">
            <h4 class="text-center mb-3">Move Category</h4>
            <div class="row mb-3">
                <select v-model="task.categoryId" name="categoryId" id="updateCategory">
                    <option disabled value="">Please select one</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Move</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "MoveCategory",
    props: [
        "task", "categories"
    ],
    methods: {
        moveCategory() {
            const obj = {
                id: this.task.id,
                categoryId: this.task.categoryId
            }
            return this.$emit('moveCategory', obj);
        }
    }
}
</script>

<style>

</style>