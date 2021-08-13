<template>
    <div v-if="service" class="main">
        <div class="position-absolute t-3 p-2 r-2 start-50 translate-middle received_title">
            <h6 class="text-center text-dark">
                <b>المبلغ المستلم</b>
            </h6>
        </div>

        <div class="position-relative">
            <input dir="ltr" maxlength="16" v-model="final" type="text" class="form-control fs-3 fw-bold">
            <a href="#" v-longclick="() => removeNumber()" @click="removeNumber" class="backspace">
                <i class="fas fa-backspace text-danger fa-2x"></i>
            </a>
        </div>

        <div class="r-2 p-2">
            <div class="row">
                <div v-for="suggestion in suggestions" :key="suggestion" class="col-4 px-1">
                    <button @click="setNumber(suggestion)" class="t-1 border-0 r-2 py-2 px-4 fs-2 btn-block">
                        {{ suggestion }}
                    </button>
                </div>
            </div>
        </div>

        <div class="mt-1 r-2 p-3 t-1">
            <div class="row">
                <div v-for="number in numbers" :key="number" class="col-4">
                    <button @click="addNumber(number)" class="t-1 border-0 r-2 py-2 px-4 fs-2 btn-block my-2">
                        {{ number }}
                    </button>
                </div>
            </div>
        </div>

        <div class="mt-1 r-2 p-0">
            <div class="row">
                <div v-for="thousand in thousnads" :key="thousand" class="col-4">
                    <button @click="addNumber(thousand)" class="t-1 border-0 r-2 py-2 px-4 fs-2 btn-block my-2">
                        {{ thousand }}
                    </button>
                </div>
            </div>
        </div>

        <div class="tb-2 text-light r-2 py-2 px-3">
            <div class="row">
                <div class="col-6 text-right">
                    المتبقي 
                </div>
                <div class="col-6 text-left">
                    {{ final - totalPrice }}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapMutations, mapGetters, mapActions, mapState } from 'vuex'

    export default {
        props: ['service_id', 'totalPrice'],
        computed: {
            service(){
                return this.$store.state.supermarket.services.services.find(x => (x.id == this.service_id && x.state == true))
            }
        },
        created(){
            this.createSuggestions()
        },
        data(){
            return {
                final: 0,
                numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9].reverse(),
                thousnads: ['0', '00', '000'].reverse(),
                suggestions: [],
                suggestedNumbers: [1000, 5000, 10000, 25000, 50000],
            }
        },
        methods: {
            addNumber: function(number){
                if (this.final.toString().length < 16){
                    if (this.final == 0 && parseInt(number, 10) == 0)
                        this.final = 0
                    else if (this.final == 0)
                        this.final = '' + number
                    else
                        this.final += '' + number
                }
            },
            setNumber: function(number){
                this.final = number
            },
            removeNumber: function(){
                try {
                    this.final = this.final.slice(0, -1);
                } catch {
                    this.final = 0
                }
            },
            createSuggestions(){
                this.suggestedNumbers = [1000, 5000, 10000, 25000, 50000, this.totalPrice]
                this.suggestedNumbers.sort((a, b) => {
                    return Math.abs(a - this.totalPrice) - Math.abs(b - this.totalPrice);
                })[0];
                    this.suggestions = this.suggestedNumbers.slice(0, -3).reverse()
            }
        },
        watch: {
            totalPrice: {
                deep: true,
                handler() {
                    this.createSuggestions()
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .main{
        position: fixed;
        background: $t-3;
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        z-index: 999;
        margin: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20%;
        height: 56%;
        border-radius: $r-2;
        padding: 1rem;

        .form-control{
            background-color: $t-2;
            border-radius: $r-2;
        }

        .backspace{
            position: absolute;
            margin: 0;
            top: 50%;
            right: 0;
            transform: translate(-50%, -50%);
        }

        
    }

    .received_title{
        top: -27.5px;
        width: 100%;
    }
</style>