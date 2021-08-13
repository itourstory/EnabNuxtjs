<template>
  <div class="mt-3">
    <div class="r-2 border-0 shadow-none">
      <div class="row">
        <div class="col-9 d-flex">
          <h1 class="text-light">المنتجات</h1>
          <span class="mx-2">-</span>
          <b-button v-if="$nuxt.isOnline" @click="editState=false,thisProduct = {}" class="t-1 r-1 px-4 border-0 text-light" v-b-toggle.add-edit>
            إضافة منتج
          </b-button>
          <b-button v-if="$nuxt.isOffline" disabled class="t-1 r-1 px-4 border-0 text-light">
            إضافة منتج
          </b-button>
        </div>
        <div class="col-3">
          <div class="form-group">
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="بحث"
            />
          </div>
        </div>
      </div>
      <div class="mt-3">
        <!-- ADD / EDIT -->
        <b-collapse id="add-edit">
          <h3 class="text-center text-light tb-2 r-2 p-3 my-2" v-if="$nuxt.isOffline && !editState">لايوجد اتصال بالانترنت</h3>
          <b-card class="t-3 r-2" v-else>
            <b-form class="p-4" @submit.prevent="submit">
              <h2 v-if="editState">تعديل المنتج</h2>
              <h2 v-else>إضافة منتج</h2>

              <div class="row mt-2">
                <div class="col-6">
                  <b-form-group
                    id="input-group-1"
                    label="أسم المنتج"
                    label-for="product_name_input"
                  >
                    <b-form-input v-model="thisProduct.name" id="product_name_input" type="text" required></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-6">
                  <b-form-group
                    id="input-group-1"
                    label="فئة المنتج"
                    label-for="product_category_input"
                  >
                    <v-select v-model="thisProduct.category_id" :options="categories" label="name" :reduce="name => name.id"></v-select>
                  </b-form-group>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-3">
                  <b-form-group
                    id="input-group-1"
                    label="الباركود"
                    label-for="product_barcode_input"
                  >
                    <b-form-input v-model="thisProduct.barcode" id="product_barcode_input" type="text" required></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-3">
                  <b-form-group label="النوع">
                    <b-form-radio-group
                      v-model="thisProduct.type"
                      dir="ltr"
                      class="t-1"
                      id="btn-radios-1"
                      :options="types"
                      button-variant="outline-light"
                      size="lg"
                      buttons
                    ></b-form-radio-group>
                  </b-form-group>
                </div>
                <div class="col-3">
                  <b-form-group
                    id="input-group-1"
                    label="العدد"
                    label-for="product_count_input"
                  >
                    <b-form-input v-model="thisProduct.count" id="product_count_input" type="number" required></b-form-input>
                  </b-form-group>
                </div>
                <div class="col-3">
                  <b-form-group
                    id="input-group-1"
                    label="السعر"
                    label-for="product_price_input"
                  >
                    <b-form-input v-model="thisProduct.price" id="product_price_input" type="number" required></b-form-input>
                  </b-form-group>
                </div>
              </div>

              <b-button v-if="editState" type="submit" class="tb-2 border-0 fs-5 btn-block py-2 mt-3">تعديل</b-button>
              <b-button v-else type="submit" class="tb-2 border-0 fs-5 btn-block py-2 mt-3">أضف</b-button>
            </b-form>
          </b-card>
        </b-collapse>

        <div class="table-responsive">
          <table class="table table-cards text-right">
            <thead>
              <tr class="text-light">
                <th scope="col">#</th>
                <th scope="col">الاسم</th>
                <th scope="col">فئة المنتج</th>
                <th scope="col">العدد</th>
                <th scope="col">السعر</th>
                <th scope="col">التحكم</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, i) in products"
                :key="product.id"
                class="table-divider"
              >
                <td scope="row">{{ i + 1 }}</td>
                <td>{{ product.name }}</td>
                <td>{{product.category_id}}</td>
                <!-- <td>{{ categories.find(x => x.id == product.category_id).name }}</td> -->
                <td>{{ product.count }}</td>
                <td>{{ $n(product.price, 'currency') }}</td>
                <td class="text-center">
                  <a v-if="product.id !== 0" href="#" @click="$store.commit('supermarket/products/setProduct', product.id), editState = true" v-b-toggle.add-edit class="action-item text-primary">
                    <i class="fas fa-pen"></i>
                  </a>
                  <a v-if="product.id !== 0" @click="removeProduct(product.id)" href="#" class="action-item text-danger">
                    <i class="fas fa-times"></i>
                  </a>
                </td>
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
    products() {
      return this.$store.state.supermarket.products.products
    },
    product() {
        return this.$store.state.supermarket.products.product
    },
  },
  data() {
    return {
      products_loading: true,
      search: '',
      thisProduct: {type:0},
      editState: '',
      types: [
        {text: 'وزني', value: 1},
        {text: 'عددي', value: 0},
      ]
    }
  },
  methods:{
    async submit(){
      if (this.editState){
        this.$store.dispatch('supermarket/products/editProduct', this.thisProduct)
        this.$root.$emit('bv::toggle::collapse', 'add-edit')

      } else {
        if (await this.$store.dispatch('supermarket/products/addProduct', this.thisProduct)){
          let categoryId = this.thisProduct.category_id
          this.thisProduct = {category_id: categoryId, type: 0}
        }
      }
    },

    ...mapActions({
      removeProduct: 'supermarket/products/removeProduct',
    }),
    
  },
  watch: {
    ...mapActions({
      search: 'supermarket/products/search',
    }),
    product(x) {
      this.thisProduct = {...x}
    },
  },
}
</script>

<style lang="scss" scoped>
//
</style>