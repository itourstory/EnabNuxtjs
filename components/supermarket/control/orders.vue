<template>
  <div class="mt-3">
    <!-- <div class="r-2 border-0 shadow-none">
      <div class="row">
        <div class="col-9 d-flex">
          <h1>الطلبات</h1>
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
      <div class="row mt-3">
          <div class="table-responsive">
          <div class="row text-center">
           <UtilitiesLoading v-if="products_loading" />
          </div>
          <table class="table table-cards text-right">
            <thead>
              <tr class="text-dark">
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
                <td>{{ categories.find(x => x.id == product.category_id).name }}</td>
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
    </div> -->
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions, mapState } from 'vuex'

export default {}
</script>

<style lang="scss" scoped>
</style>