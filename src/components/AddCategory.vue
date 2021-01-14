<template>
    <!-- Add New Category -->
    <div class="card mx-auto" style="width: 450px; margin-top: 6em; border-radius: 20px;">
        <form class="card-body p-5" @submit.prevent="addCategory">
            <h4 class="text-center mb-3">Add New Category</h4>
            <div class="row mb-3">
                <div class="col-sm-3">
                    <label for="name" class="col-form-label">Name</label>
                </div>
                <div class="col-auto" style="width: 15em;">
                    <input v-model="name" type="text" name="name" id="name" class="form-control">
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Add</button>
        </form>
    </div>
</template>

<script>
export default {
    name: "AddCategory",
    data() {
        return {
            name: ''
        }
    },
    methods: {
        addCategory() {
            this.$emit('addCategory', this.name);
        }
    }
}
</script>

<style>

</style>