<template>
    <div>
        <!-- head -->
        <wHead />

        <!-- content -->
        <b-container fluid style="padding-top:80px">
            <router-view />
        </b-container>

    </div>

</template>

<script>
    import wHead from '@/components/frame/head'
    export default {
        components: {
            wHead
        }
    }
</script>

<style scoped>
    @media screen and (max-width:800px) {
        .container-fluid {
            padding-left: 0;
            padding-right: 0;
        }
    }
</style>