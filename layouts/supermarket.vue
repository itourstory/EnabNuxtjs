<template>
    <div class="main-container">
        <SupermarketNavbar />
        <client-only>
            <UtilitiesKeyup @keyup="keyboardEvent"></UtilitiesKeyup>
            <SupermarketConsole v-if="showConsole"></SupermarketConsole>
        </client-only>
        <nuxt />
    </div>
</template>

<script>
    import { mapMutations, mapGetters, mapActions, mapState } from 'vuex'

    export default {
        data(){
            return {
                showConsole: false,
                barcode: '',
                interval: '',
            }
        },
        methods: {
            keyboardEvent (e) {
                if (this.interval)
                    clearInterval(this.interval)
                if (e.code == 'Enter') {
                    if (this.barcode){
                        this.$store.dispatch('supermarket/orders/addProductByBarcode', this.barcode)
                        // this.$emit('barcode', this.barcode)
                        // this.addProductByBarcode(this.barcode)
                    }
                    this.barcode = '';
                    return;
                }
                if (e.key != 'Shift')
                    this.barcode += e.key;
                this.interval = setInterval(() => this.barcode = '', 20);

                // if not input
                var e = event || window.event,
                target = e.target || e.srcElement;
                if (target.tagName.toUpperCase() == 'INPUT') return;
                
                // Ctrl + ` => Show Console
                if (e.which === 192) {
                    this.showConsole = !this.showConsole
                    console.log('showed')
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
// 
</style>