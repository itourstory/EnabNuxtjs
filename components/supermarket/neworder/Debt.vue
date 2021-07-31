<template>
    <div>

        <b-button v-b-modal.modal-debt variant="link" class="btn btn-block text-light mt-2 py-2">
            <span class="btn-inner--icon">
                <i class="fas fa-hand-holding-usd fa-3x"></i>
            </span>
        </b-button>

        <b-modal size="lg" hide-backdrop hide-footer hide-header id="modal-debt" content-class="tb-2 border-0">
            <div class="text-right p-3">
                Debt window
            </div>
        </b-modal>

    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
// 
</style>