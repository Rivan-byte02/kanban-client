<template>
    <!-- Navbar -->
    <nav class="navbar navbar-expand" id="navbar">
        <div class="container-fluid p-2 ps-4 ms-5 me-5 mt-3 navbar-light bg-light">
            <span class="navbar-brand">Kanban App</span>
            <div class="navbar-collapse">
                <ul class="navbar-nav">
                    <li class="navbar-item">
                        <a href="#" class="nav-link" @click.prevent="home">Home</a>
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
        },
        home() {
            const obj = { page: "main-page"};
            this.$emit('home', obj);
        }
    }
}
</script>

<style>
    #navbar {
        width: 1600px;
        margin: 0 7em;
    }
</style>