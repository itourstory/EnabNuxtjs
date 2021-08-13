<template>
  <div class="mt-3">
    <!-- Show Products Modal -->
    <b-modal id="bv-show-products" content-class="tb-2 border-0" size="xl" hide-backdrop hide-footer hide-header>
      <div class="row mb-3">
        <div class="col-6">
          <div class="text-right">
            <h3 class="text-light">المنتجات</h3>
          </div>
        </div>
        <div class="col-6">
          <b-button class="bg-none text-light border-0" @click="$bvModal.hide('bv-show-products')">
            <i class="fas fa-times"></i>
          </b-button>
        </div>
      </div>
      <table class="table table-borderless text-right text-light">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">اسم المنتج</th>
            <th scope="col">فئة المنتج</th>
            <th scope="col">رقم الباركود</th>
            <th scope="col">السعر</th>
            <th scope="col">العدد</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in showProducts"
            :key="product.id"
          >
            <th scope="row">{{ ++i }}</th>
            <td>{{ product.name }}</td>
            <td>{{ categories.find(x => x.id == product.category_id).name }}</td>
            <td>{{ product.barcode }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.count }}</td>
          </tr>
        </tbody>
      </table>
    </b-modal>

    <div class="r-2 border-0 shadow-none">
      <div class="row">
        <div class="col-9 d-flex">
          <h1 class="text-light">الطلبات</h1>
        </div>
        <div class="col-3">
          <div class="form-group">
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="بحث بحسب رقم الطلب"
            />
          </div>
        </div>
      </div>
      <div class="row mt-3">
          <div class="table-responsive">
          <table class="table table-cards text-right">
            <thead>
              <tr class="text-light">
                <th scope="col">#</th>
                <th scope="col">أسم الزبون</th>
                <th scope="col">رقم الطلب</th>
                <th scope="col">المبلغ الكلي</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(order, i) in orders"
                :key="order.id"
                class="table-divider hover-translate-y-n3 pointer"
                @click="getProducts(products), $bvModal.show('bv-show-products')"
              >
                <td scope="row">{{ i + 1 }}</td>
                <td>{{ (order.customer_id ? order.customer_id : 'لايوجد') }}</td>
                <td>{{ order.order_number }}</td>
                <td>{{ $n(totalPrice(order.products), 'currency') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from 'vuex'

export default {
  computed: {
    categories() {
      let categories = this.$store.state.supermarket.categories.categories.filter(x => x.id !== 0)
      return categories
    },
    orders() {
        return this.$store.state.supermarket.orders.orders
    },
    products() {
        return this.$store.state.supermarket.products.products
    },
  },
  data(){
    return {
      search: '',
      showProducts: [],
    }
  },
  methods: {
    totalPrice: function (products) {
      let price = 0
      products.forEach(x => (price += this.products.find(y=>y.id==x.id).price * x.pivot.count))
      return price
    },
    getProducts: function (products){
      this.showProducts = products
      console.log(products)
    }
  },
  watch: {
    ...mapActions({
      search: 'supermarket/orders/search',
    }),
  }
}
</script>

<style lang="scss" scoped>
  .pointer:hover{
    cursor: pointer;
  }
</style>