<template>
    <!-- eslint-disable -->
    <div class="container-fluid">
        <div class="row main-height">
            <div class="col-4">
                <div class="show-scroll p-2">
                    <div class="h-items-height">
                        <h1 class="text-right text-light">التحكم</h1>
                        <br />
                        <div class="nav flex-column nav-pills nav-customized" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button :class="getOpen('categories')" @click="open='categories'" class="btn btn-secondary btn-icon btn-block py-3 r-2">
                                <span class="btn-inner--text fs-5">فئات</span>
                            </button>
                            <button :class="getOpen('products')" @click="open='products'" class="btn btn-secondary btn-icon btn-block py-3 r-2">
                                <span class="btn-inner--text fs-5">منتجات</span>
                            </button>
                            <button :class="getOpen('customers')" @click="open='customers'" class="btn btn-secondary btn-icon btn-block py-3 r-2">
                                <span class="btn-inner--text fs-5">الزبائن</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-8 t-3 r-1">
                <div class="card-fluid p-5">
                    <div class="text-right">
                        <div v-if="open=='categories'">
                            <h1>Categories</h1>
                        </div>
                        <div v-if="open=='products'">
                            <h1>products</h1>
                        </div>
                        <div v-if="open=='customers'">
                            <h1>customers</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  layout: 'supermarket',
  head: {
    title: 'Manage',
  },
  mounted() {
    return {

    }
  },
  data() {
    return {
        open: "categories"
    }
  },
  methods:{
      getOpen: function(opened){
          return this.open == opened ? 'active' : ''
      }
  }
}
</script>

<style lang="scss" scoped>
    .btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active, .show > .btn-secondary.dropdown-toggle {
        background-color: #d3e7ff82 !important;
    }
    .btn {
        background-color: #ddeaff1c !important;
        border-radius: 0;
        border: 0;
    }
    .btn-secondary:hover {
        background-color: #fcfcfc45 !important;
    }
    .nav-pills .nav-link, .nav-pills > .nav-link {
        color: #ffffff;
    }
</style>