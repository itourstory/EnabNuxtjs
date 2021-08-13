<template>
  <div class="mt-3">
    <div class="r-2 border-0 shadow-none">
      <div class="row">
        <div class="col-9 d-flex">
          <h1 class="text-light">الفئات</h1>
          <span class="mx-2">-</span>
          <b-button v-if="$nuxt.isOnline" @click="editState=false,thisCategory = {}" class="t-1 r-1 px-4 border-0 text-light" v-b-toggle.add-edit>
            إضافة فئة
          </b-button>
          <b-button v-if="$nuxt.isOffline" disabled class="t-1 r-1 px-4 border-0 text-light">
            إضافة فئة
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
              <h2 v-if="editState">تعديل الفئة</h2>
              <h2 v-else>إضافة فئة</h2>
              <b-form-group
                id="input-group-1"
                label="أسم الفئة"
                label-for="category_name_input"
              >
                <b-form-input v-model="thisCategory.name" id="category_name_input" type="text" required></b-form-input>
              </b-form-group>
              <b-button v-if="editState" type="submit" class="tb-2 border-0 fs-5 btn-block py-2 mt-3">تعديل</b-button>
              <b-button v-else type="submit" class="tb-2 border-0 fs-5 btn-block py-2 mt-3">أضف</b-button>
            </b-form>
          </b-card>
        </b-collapse>

        <div class="table-responsive">
          <!-- <h4 class="text-center text-light" v-if="categories.length <= 0">
            لاتوجد منتجات
          </h4> -->
          <table class="table table-cards text-right">
            <thead>
              <tr class="text-light">
                <th scope="col">#</th>
                <th scope="col">الاسم</th>
                <th scope="col">عدد المنتجات</th>
                <th scope="col">التحكم</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(category, i) in categories"
                :key="category.id"
                class="table-divider"
              >
                <td scope="row">{{ i + 1 }}</td>
                <td>{{ category.name }}</td>
                <td>{{ category.productsCount }}</td>
                <td class="text-center">
                  <a v-if="category.id !== 0" href="#" @click="$store.commit('supermarket/categories/setCategory', category.id), editState = true" v-b-toggle.add-edit class="action-item text-primary">
                    <i class="fas fa-pen"></i>
                  </a>
                  <a v-if="category.id !== 0" @click="removeCategory(category.id)" href="#" class="action-item text-danger">
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
      return this.$store.state.supermarket.categories.categories
    },
    category() {
        return this.$store.state.supermarket.categories.category
    },
  },
  data() {
    return {
      search: '',
      thisCategory: {},
      editState: ''
    }
  },
  async mounted() {
    // Set each category products count
    const products = await this.$store.dispatch('supermarket/products/getProducts')
    await this.categories.forEach(x => {
        this.$store.commit('supermarket/categories/set_products_count', {id: x.id, count: (products.filter(y => y.category_id == x.id)).length})
    })
  },
  methods: {
    submit: function (){
      if (this.editState){
        this.$store.dispatch('supermarket/categories/editCategory', this.thisCategory)
      } else {
        this.$store.dispatch('supermarket/categories/addCategory', this.thisCategory)
        this.thisCategory = {}
      }
    },

    ...mapActions({
      removeCategory: 'supermarket/categories/removeCategory',
    }),
    
  },
  watch: {
    ...mapActions({
      search: 'supermarket/categories/search',
    }),
    category(x) {
      this.thisCategory = {...x}
    },
  },
}
</script>

<style lang="scss" scoped>
//
</style>