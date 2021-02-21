<template>
    <div id="app">
        <div class="column">
            <h3 class="title has-text-black">Login</h3>
            <hr class="login-hr">
            <div class="box">
                <form>
                    <section>
                        <b-field label="Email"
                                 :type="errors['email'] ? 'is-danger' : ''"
                                 :message="errors['email']"
                        >
                            <b-input v-model="email"></b-input>
                        </b-field>

                        <b-field label="Password"
                                 :type="errors['password'] ? 'is-danger' : ''"
                                 :message="errors['password']"
                        >
                            <b-input type='password' password-reveal v-model="password"></b-input>
                        </b-field>
                        <b-button
                                native-type="submit"
                                :loading="loading"
                                @click.prevent="login"
                                :type="errors.length > 0 ? 'is-danger' : 'is-primary'" >Login</b-button>
                    </section>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data: () => ({
          email: '',
          password: '',
          loading: false,
        }),
        methods: {
            async login() {
                this.loading = true
                try {
                    await this.$auth.login({
                        email: this.email,
                        password: this.password,
                    })
                } catch (e) {
                    this.errors = e.response.data.errors;
                } finally {
                    this.loading = false
                }
            }
        },
    }
</script>

<style scoped>
</style>
