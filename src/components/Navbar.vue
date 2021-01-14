<template>
    <!-- Navbar -->
    <nav class="navbar navbar-expand">
        <div class="container-fluid p-2 ps-4 ms-5 me-5 mt-3 navbar-light bg-light">
            <span class="navbar-brand">Kanban App</span>
            <div class="navbar-collapse">
                <ul class="navbar-nav">
                    <li class="navbar-item">
                        <a href="#" class="nav-link" @click.prevent="changePage('main-page')">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Boards</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="addCategory">New Category</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        logout() {
            this.$emit('logout');
        },
        addCategory() {
            const obj = { page: "add-category"};
            this.$emit('newCategory', obj);
        }
    }
}
</script>

<style>

</style>