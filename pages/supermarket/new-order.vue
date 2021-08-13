<template>
    <!-- eslint-disable -->
    <div class="container-fluid">
        <div v-if="calculator">
          <SupermarketServicesCalculator service_id="1" :totalPrice="totalPrice" />
        </div>

        <div class="row main-height">
            <div class="col-5">
                <div class="px-2">
                    <div class="h-items-height">
                      <div class="row">
                        <div class="col-1 px-0">
                          <button @click="hideCategories" type="button" class="btn btn-xs btn-block t-1 r-2">
                            <span class="btn-inner--icon">
                                <i v-if="!hideCategoriesValue" class="fas fa-arrow-right text-light"></i>
                                <i v-else="hideCategoriesValue" class="fas fa-arrow-left text-light"></i>
                            </span>
                        </button>
                        </div>
                        <div class="col-11">
                          <div id="top-right" class="form-group position-relative">
                              <input v-model="search" type="text" class="form-control form-control-sm r-2" placeholder="بحث">
                              <div class="form-check form-switch position-absolute search-only-products">
                                <label class="form-check-label" for="onlySearchProducts"><small>فقط منتجات</small></label>
                                <input checked @change="onlyProducts" class="form-check-input mr-1" type="checkbox" id="onlySearchProducts">
                              </div>
                          </div>
                        </div>
                      </div>
                        <div class="row text-center">
                            <UtilitiesLoading v-if="products_loading" />
                        </div>
                        <div class="row mt-3">
                          <div v-if="!hideCategoriesValue" class="col-4 show-scroll">
                            <div class="h-sub-items-height category-list p-2">
                              <ul class="nav flex-column p-0">
                                <li :class="(category.id== selectedCategory ? 'activeCategory' : '')" class="nav-item" v-for="category in categories" :key="'category-'+category.id">
                                  <div class="nav-link">
                                    <SupermarketNeworderCategory :category="category" />
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div :class="hideCategoriesValue ? 'col-12' : 'col-8'" class="show-scroll">
                            <div class="h-sub-items-height p-2">
                              <div class="row">
                                <div :class="hideCategoriesValue ? 'col-xl-4 col-sm-6' : 'col-xl-6 col-sm-12'" v-for="product in products" :key="'product-'+product.id">
                                  <SupermarketNeworderProduct :product="product" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-7 t-1 r-2">
                <div class="card-fluid p-5">
                    <div class="text-right">
                        <div class="row mx-0">
                            <div class="col-6 p-0">
                                <h3 class="fw-bold text-light">
                                    الطلب الحالي <small v-if="lastOrder">#{{ lastOrder.order_number+1 }}</small><small v-else>#1</small>
                                </h3>
                            </div>
                            <div class="col-6 text-left p-0">
                                <div>
                                    <button @click="emptyProducts()" :class="[productsAdded.length > 0 ? '' : 'disabled']" type="button" class="btn btn-danger">
                                        حذف الكل
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="show-scroll mt-3">
                            <ul class="list-group products-list list-group-flush h-list-height ml-1 p-0">
                                <li class="list-group-item" v-for="productAdded in productsAdded" v-if = "productAdded.count > 0" :key="'added'+productAdded.id">
                                    <SupermarketNeworderAddedProduct :product="productAdded" />
                                </li>
                            </ul>
                        </div>

                        <div class="row mt-3">
                          <div class="col-5">
                            <button @click="endOrder" :class="[productsAdded.length > 0 ? '' : 'disabled']" type="button" class="btn btn-block btn-light py-3 fs-3 r-2" >
                                إنهاء الطلب
                            </button>
                          </div>
                          <div class="col-7">
                            <div class="row t-1 r-2 align-items-center p-3">
                              <div class="col-6">
                                  <span class="fs-3 text-light">
                                      <b>الإجمالي</b>
                                  </span>
                              </div>
                              <div class="col-6 text-left text-light">
                                  <span class="fs-3 totalPrice">
                                      <b>{{ $n(totalPrice, 'currency') }}</b>
                                  </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row mt-1">
                            <div class="col-5">
                                <div class="row tb-2 r-2 mx-0 p-1">
                                  <!-- Right - Empty -->
                                  <div class="col-12">
                                    <SupermarketNeworderPaymentMethods/>
                                  </div>
                                </div>
                            </div>
                            <div class="col-7">
                              <div v-if="lastOrder" class="row align-items-center p-1">
                                <div class="col-4">
                                    <span class="fs-6 text-light">
                                        <b>الطلب السابق #{{ lastOrder.order_number }}</b>
                                    </span>
                                </div>
                                <div class="col-8 text-left text-light">
                                    <span class="fs-6">
                                        <b>{{ $n(lastOrder.order_price, 'currency') }}</b>
                                    </span>
                                </div>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from 'vuex'

export default {
  layout: 'supermarket',
  head: {
    title: 'New Order',
  },
  computed: {
      products () {
        return this.$store.state.supermarket.products.products;
      },
      categories () {
        return this.$store.state.supermarket.categories.categories;
      },
      productsAdded () {
        return this.$store.state.supermarket.orders.products;
      },
      lastOrder () {
        return this.$store.state.supermarket.orders.lastOrder;
      },
      calculator () {
        return this.$store.state.supermarket.orders.calculator
      },
      selectedCategory(){
        return this.$store.state.supermarket.orders.selectedCategory
      },
      hideCategoriesValue(){
        return this.$store.state.supermarket.orders.hideCategories
      },
  },
  async mounted() {

  },
  data() {
    return {
      products_loading: true,
      totalPrice: 0,
      search: '',
    }
  },
  created(){
    this.fetchProducts()
    this.fetchCategories()
    this.fetchLastOrder()
    this.products_loading = false
  },
  methods: {
    ...mapMutations({
      onlyProducts: 'supermarket/orders/onlyProducts',
    }),
    ...mapActions({
      fetchProducts: 'supermarket/products/fetchProducts',
      fetchCategories: 'supermarket/categories/fetchCategories',
      fetchLastOrder: 'supermarket/orders/fetchLastOrder',
      emptyProducts: 'supermarket/orders/emptyProducts',
      endOrder: 'supermarket/orders/endOrder',
      hideCategories: 'supermarket/orders/hideCategories',
    }),
  },

  watch: {
    productsAdded: {
        deep: true,
        handler(newVal) {
          this.totalPrice = 0
          newVal.forEach(x => (this.totalPrice += x.price * x.inCount))
        }
    },
    ...mapActions({
      search: 'supermarket/orders/searchItems',
    }),
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
.h-sub-items-height {
  min-height: calc(100vh - 12.75rem) !important;
  max-height: calc(100vh - 12.75rem) !important;
}
.h-list-height {
  min-height: calc(100vh - 26rem) !important;
  max-height: calc(100vh - 26rem) !important;
}
.products-list .list-group-item:first-child {
  border-top-left-radius: 0.375rem !important;
  border-top-right-radius: 0.375rem !important;
}
.products-list .list-group-item:last-child {
  border-bottom-right-radius: 0.375rem !important;
  border-bottom-left-radius: 0.375rem !important;
}
.search-only-products {
  left: 20px;
  top: 8px;
}
.category-list .nav-item{
  border: 1px solid #fff4;
  &:first-of-type{
    background: $t-1;
    border-top-left-radius: $r-2;
    border-top-right-radius: $r-2;
  }
  &:last-of-type{
    border-bottom-left-radius: $r-2;
    border-bottom-right-radius: $r-2;
  }
  &:hover{
    background: $t-3;
  }
}

.activeCategory{
  background: #fff3 !important;
}
</style>