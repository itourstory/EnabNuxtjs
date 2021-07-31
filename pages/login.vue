<template>
    <div class="container">
        <div class="row d-flex justify-content-center mt-6">
            <div class="col-6 text-white">
                <h1 class="fw-bold text-center text-white">تسجيل الدخول</h1>
                <br />
                <form @submit.prevent="userLogin" class="text-right">
                    <p class="text-center">
                        <UtilitiesLoading v-if="loading" />
                    </p>
                    <div v-if="errors.length > 0">
                        <p v-for="error in errors" :key="error">
                            <ul>
                                <li>{{error}}</li>
                            </ul>
                        </p>
                    </div>
                    <div class="mb-3">
                        <label for="inputEmail" class="form-label">البريد الالكتروني</label>
                        <input v-model="login.email" placeholder="example@enab.com" type="email" class="form-control" id="inputEmail">
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="form-label">كلمة المرور</label>
                        <input v-model="login.password" placeholder="******" type="password" class="form-control" id="inputPassword">
                    </div>
                    <button type="submit" class="btn btn-block btn-light py-2 mt-3">تسجيل الدخول</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                login: {
                    email: '',
                    password: ''
                },
                errors: [],
                loading: false
            }
        },
        methods: {
            async userLogin() {
                this.loading = true
                this.errors = [];

                if (this.login.email.length < 6)
                    this.errors.push("البريد الالكتروني مطلوب");
                if (this.login.password < 6)
                    this.errors.push("كلمة المرور مطلوبة");
                
                if (this.errors.length <= 0) {
                    await this.$auth.loginWith('laravelSanctum',
                    {
                        data: {
                            email: this.login.email,
                            password: this.login.password
                        }
                    })
                    .then(() => {
                        console.log("Logged in")
                    })
                    .catch(() => {
                        this.errors.push("البريد الالكتروني او كلمة المرور خاطئة")
                    })
                }
                this.loading = false
            }
        }
    }
</script>

<style lang="scss" scoped>
// 
</style>