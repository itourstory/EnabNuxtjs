<template>
  <div class="container mt-5 text-center">

    <h1 class="mt-5 mb-3">
      مرحباً، يا
      {{ this.$auth.user.name }}
    </h1>

    <span class="fs-5 text-white">
      الخدمات المجانية المتوفرة لك 😉
    </span>

    <div class="row mx-lg-n1 d-flex justify-content-center mt-5">
        <div class="col-md-4 px-lg-4">
          <Businesses link="/supermarket" title='سوبرماركت' sub_title="إدارة السوبر ماركت" :new_service=true />
        </div>
    </div>

  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  h1{
    font-weight: 600;
  }
</style>