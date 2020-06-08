<template>
    <v-form @submit.prevent="login">
        <v-card class="elevation-12">
            <v-toolbar
                    dark
                    flat
                    color="secondary"
                    height="100"
            >
                <v-toolbar-title class="centered">
                    <img src="../../assets/logo.png"  alt="GoACS"/>
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <v-text-field
                    v-model="username"
                    label="Username"
                    type="text"
                ></v-text-field>
                <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    type="submit"
                    color="primary"
                    :loading="loading"
                    >Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
    export default {
        name: "Login",
        data: () => ({
            username: '',
            password: '',
            loading: false,
        }),
        methods: {
            async login() {
                this.loading = true
                try {
                    await this.$auth.login({
                        username: this.username,
                        password: this.password,
                    })
                } finally {
                    this.loading = false
                }
            }
        },
    }
</script>

<style scoped>
    .centered {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
</style>
