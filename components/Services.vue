<template>
    <div>
        <nuxt-link :to="link">
            <div class="card t-2 hover-shadow-lg hover-translate-y-n10 mb-5">
                <div class="d-flex p-5">
                    <div class="pl-4 text-right">
                        <h4>{{ title }}</h4>
                        <p class="text-muted">
                            {{ sub_title }}
                        </p>
                    </div>
                    <div v-if="new_service">
                        <span class="badge badge-success badge-pill">
                            جديد
                        </span>
                    </div>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
    export default {
        props: ['title', 'sub_title', 'new_service', 'link']
    }
</script>

<style lang="scss" scoped>
    // 
</style>