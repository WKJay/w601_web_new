<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
            <b-navbar-brand href="#">W601</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/monitor">数据监测</b-nav-item>
                    <b-nav-item to="/config">系统设置</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
    .navbar {
        box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, .25), inset 0 -1px 5px rgba(0, 0, 0, .25);
    }
</style>