<template>
    <div>
        <div class="position-absolute" style="top: 0px; left: 0%; width: 100%;">
            <div class="t-1 p-2">
                <div class="row">
                    <div class="col-6">
                        <ul class="nav nav-pills mr-5">
                            <li class="nav-item">
                                <nuxt-link to="/supermarket" :class="{ 'active' : $nuxt.$route.path === '/supermarket'}" class="nav-link py-1 px-3">
                                    <i class="fas fa-home"></i>
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link to="/supermarket/new-order" :class="{ 'active' : $nuxt.$route.path === '/supermarket/new-order'}" class="nav-link py-1 px-3">
                                    <i class="fas fa-cash-register"></i>
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link to="/supermarket/control" :class="{ 'active' : $nuxt.$route.path === '/supermarket/control'}" class="nav-link py-1 px-3">
                                    <i class="fas fa-list-ul"></i>
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link to="/supermarket/analytics" :class="{ 'active' : $nuxt.$route.path === '/supermarket/analytics'}" class="nav-link py-1 px-3">
                                    <i class="fas fa-chart-pie"></i>
                                </nuxt-link>
                            </li>
                            <!-- <li class="nav-item">
                                <a href="https://pos.itourstory.com/supermarket/analysis" class="nav-link  py-1 px-3">
                                    <i class="fas fa-chart-pie"></i>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="https://pos.itourstory.com/supermarket/setting" class="nav-link  py-1 px-3">
                                    <i class="fas fa-cog"></i>
                                </a>
                            </li> -->
                        </ul>
                    </div>
                    <div class="col-6">
                        <div dir="ltr" class="text-white ml-5 d-flex align-items-center">
                            <div dir="rtl" class="d-flex">
                                <!-- <div class="mr-3">
                                    <small></small>
                                </div> -->
                                <div class="mr-3">
                                    <ServicesEarthlinkUsers id="1" />
                                </div>
                                <div class="mr-3">
                                    <div v-if="$nuxt.isOnline" class="badge badge-success">متصل</div>
                                    <div v-else class="badge badge-danger">غير متصل</div>
                                    <div class="badge t-1">{{ datetime }}</div>
                                </div>
                                <ul class="nav nav-pills">
                                    <li class="nav-item">
                                        <a href="#" @click="sync" class="nav-link py-1">
                                            <i class="fas fa-sync"></i>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#" @click="logout" class="nav-link active py-1">
                                            <i class="fas fa-sign-out-alt signout-icon"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                datetime: ""
            }
        },
        created() {
            setInterval(this.getNow, 1000);
        },
        methods: {
            getNow: function() {
                const today = new Date();
                const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                const dateTime = date +' '+ time;
                this.datetime = dateTime;
            },
            async logout() {
                await this.$auth.logout();
            },
            async sync(){
                // await this.$dialog.confirm('هل انت متأكد تريد إعادة البيانات؟').then(() => {
                //     // Sycning products & categories
                //     this.$axios
                //     .get('/api/supermarket/productsCategories', { withCredentials: true })
                //     .then((response) => {
                //         response.data.categories.unshift({id: 0, name: "جميع الفئات"})
                //         this.$auth.$storage.setLocalStorage('products', response.data.products)
                //         this.$auth.$storage.setLocalStorage('categories', response.data.categories)
                //     })
                // })
                // this.$dialog.alert("تمت المزامنة بنجاح!")
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
        background-color: $tb-1;
        border-radius: 0.2rem;
        color: #ffffff;
    }

    .nav-pills .nav-link, .nav-pills > .nav-link {
        color: #ffffff;
    }

    .signout-icon{
        transform: scale(-1);
    }
</style>