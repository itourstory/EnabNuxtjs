<template>
    <!-- eslint-disable -->
    <div class="container-fluid">
        <div class="row main-height">
            <div class="col-4">
                <div class="show-scroll p-2">
                    <div class="h-items-height">
                        <div class="row text-center">
                            <UtilitiesLoading v-if="products_loading" />
                        </div>
                        <div class="row">
                            <div class="col-xl-6 col-sm-12" v-for="category in categories" :key="'category-'+category.id">
                                <SupermarketNeworderCategory ref="category" @filter-categories="filterCategories($event)" :name="category.name" :id="category.id"/>
                            </div>
                            <div class="col-xl-6 col-sm-12" v-for="product in products" :key="'product-'+product.id">
                                <SupermarketNeworderProduct ref="product" @product-add="productAdd($event)" :name="product.name" :count="product.count" :price="product.price" :id="product.id"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-8 t-3 r-1">
                <div class="card-fluid p-5">
                    <div class="text-right">
                        <div class="row mx-0">
                            <div class="col-6 p-0">
                                <h3 class="fw-bold">
                                    الطلب الحالي <small>#17</small>
                                </h3>
                            </div>
                            <div class="col-6 text-left p-0">
                                <div>
                                    <button :class="[productsAdded.length > 0 ? '' : 'disabled']" @click="removeProducts" type="button" class="btn btn-danger">
                                        حذف الكل
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="show-scroll mt-3">
                            <ul class="list-group products-list list-group-flush h-list-height ml-1 p-0">
                                <li class="list-group-item" v-for="productAdded in productsAdded" v-if = "productAdded.count > 0" :key="'added'+productAdded.id">
                                    <SupermarketNeworderAddedProduct @update-count="productUpdateCount(productAdded.id, $event)" :name="productAdded.name" :price="productAdded.price" :count="productAdded.count" :id="productAdded.id" />
                                </li>
                            </ul>
                        </div>
                        <ul class="list-group list-group-flush p-0 mt-3">
                            <li class="list-group-item bg-none p-0">
                                <div class="row mx-0 t-3 r-2">
                                    <div class="col-xl-12 col-sm-12 p-0">
                                        <div class="row align-items-center p-3">
                                            <div class="col-6">
                                                <span class="fs-3 text-light">
                                                    <b>الإجمالي</b>
                                                </span>
                                            </div>
                                            <div class="col-6 text-left text-light">
                                                <span class="fs-2 totalPrice">
                                                    <b>{{ $n(totalPrice, 'currency') }}</b>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="row">
                            <div class="col-10">
                                <button @click="endOrder" :class="[productsAdded.length > 0 ? '' : 'disabled']" type="button" class="btn btn-block mt-2 btn-warning py-3 fs-4">
                                    إنهاء الطلب
                                </button>
                            </div>
                            <div class="col-2">
                                <SupermarketNeworderDebt/>
                            </div>
                        </div>
                            <ul class="list-group list-group-flush rounded mt-2 p-0">
                                <li class="list-group-item bg-secondary-light-t2 p-2">
                                    <div class="row align-items-center mx-1">
                                        <div class="col-4">
                                            <span class="fs-6 text-light">
                                                <b>الطلب السابق #16</b>
                                            </span>
                                        </div>
                                        <div class="col-8 text-left text-light">
                                            <span class="fs-6">
                                                <b>0,000 د.ع</b>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
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
    title: 'New Order',
  },
  async mounted() {
    this.products = this.$auth.$storage.getLocalStorage("products")
    this.categories = this.$auth.$storage.getLocalStorage("categories")
    if (this.products === null || this.categories === null){
      this.getProductsAndCategories()
    }
    console.log(this.products, this.categories)
    this.products_loading = false
  },
  data() {
    return {
      products_loading: true,
      categories: [],
      products: [],
      productsAdded: [],
      totalPrice: 0,
    }
  },
  methods: {
    async getProductsAndCategories(){
      await this.$axios
      .get('http://localhost:8000/api/supermarket/productsCategories', { withCredentials: true })
      .then((response) => {
        response.data.categories.unshift({id: 0, name: "جميع الفئات"})
        this.products = response.data.products
        this.categories = response.data.categories
        // saving products & categories to local storage
        this.$auth.$storage.setLocalStorage('products', this.products)
        this.$auth.$storage.setLocalStorage('categories', this.categories)
      })
    },
    productAdd: function (id) {
      const productAdded = this.productsAdded.find((x) => x.id === id)
      if (productAdded == undefined) {
        const productAdd = this.products.find((x) => x.id === id)
        productAdd.count = 1
        this.productsAdded.push(productAdd)
      } else {
        productAdded.count++
      }
    },
    productUpdateCount: function (id, value) {
      const productAdded = this.productsAdded.find((x) => x.id === id)
      this.$refs.product.find((x) => x.id === id).inCount = value
      if (value == 0)
        this.productsAdded = this.productsAdded.filter((x) => x.id !== id)
      else productAdded.count = value
    },
    removeProducts: function () {
      this.$dialog.confirm('هل انت متأكد؟').then(() => {
        this.productsAdded = []
        this.$refs.product.forEach((x) => x.resetCount())
      })
      this.totalPrice = 0
    },
    filterCategories: function (id){
      var localProducts = this.$auth.$storage.getLocalStorage("products")
      var localCateogries = this.$auth.$storage.getLocalStorage("categories")
      if (id == 0){
        this.products = localProducts
        this.categories = localCateogries
      } else {
        this.products = localProducts.filter((x) => x.category_id == id)
        this.categories = localCateogries.filter(x => (x.id == id || x.id == 0))
      }
    },
    endOrder: function () {
      var products = this.productsAdded.map(function (x) {
        return { id: x.id, count: x.count }
      })
      console.log(products)
      // Reset added products
      this.productsAdded = []
      this.$refs.product.forEach((x) => x.resetCount())
      // Refreshing counts and etc...
      this.getProductsAndCategories()
    },
  },
  computed: {
    productsAddedCounts() {
      return this.productsAdded.map((productAdded) => productAdded.count)
    },
  },
  watch: {
    productsAddedCounts: function () {
      this.totalPrice = 0
      return this.productsAdded.forEach(
        (x) => (this.totalPrice += x.price * x.count)
      )
    },
  },
}
</script>

<style lang="scss">
.main-height {
  min-height: calc(100vh - 10rem) !important;
  max-height: calc(100vh - 10rem) !important;
}
.h-items-height {
  min-height: calc(100vh - 10rem) !important;
  max-height: calc(100vh - 10rem) !important;
}
.h-list-height {
  min-height: calc(100vh - 34rem) !important;
  max-height: calc(100vh - 34rem) !important;
}
.products-list .list-group-item:first-child {
  border-top-left-radius: 0.375rem !important;
  border-top-right-radius: 0.375rem !important;
}
.products-list .list-group-item:last-child {
  border-bottom-right-radius: 0.375rem !important;
  border-bottom-left-radius: 0.375rem !important;
}
</style>