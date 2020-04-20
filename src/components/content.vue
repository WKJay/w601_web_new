<template>
    <div>
        <!-- head -->
        <wHead />
        
        <!-- content -->
        <b-container fluid style="padding-top:60px">
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

<style>

</style>