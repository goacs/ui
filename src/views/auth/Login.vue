<template>
    <div id="app">
        <div class="column">
            <h3 class="title has-text-black">Login</h3>
            <hr class="login-hr">
            <div class="box">
                <form>
                    <section>
                        <b-field label="Username"
                                 :type="errors['username'] ? 'is-danger' : ''"
                                 :message="errors['username']"
                        >
                            <b-input v-model="username"></b-input>
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
            username: '',
            password: '',
            loading: false,
            errors: [],
        }),
        methods: {
            async login() {
                this.loading = true
                try {
                    await this.$auth.login({
                        username: this.username,
                        password: this.password,
                    })
                } catch (e) {
                    this.errors = e.response.data.data;
                } finally {
                    this.loading = false
                }
            }
        },
    }
</script>

<style scoped>
</style>
