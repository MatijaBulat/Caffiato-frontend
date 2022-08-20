<template>
    <div id="holder" class="row justify-content-sm-center h-100">
        <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div class="card shadow-lg">
                <div class="card-body p-5">
                    <h1 class="fs-4 card-title fw-bold mb-4 text-center">Forgot Password</h1>
                    <form autocomplete="off" @submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <input id="email" type="email" class="form-control" name="email" placeholder="Email"
                                v-model="email" required autofocus>
                        </div>

                        <div class="d-flex align-items-center">
                            <button class="btn btn-primary ms-auto col-12">
                                Send Link
                            </button>
                        </div>
                        <div class="text-center mt-3">
                            Remember your password? <router-link :to="{ name: 'Login' }">Login</router-link>
                        </div>
                        <div class="text-center mt-3" v-if="error">{{ error }}</div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const email = ref('')
        const error = ref('')

        const store = useStore()
        const router = useRouter()

        const handleSubmit = async () => {
            try {
                await store.dispatch('passwordReset', {
                    email: email.value
                })
                router.push('/emailsent')
            } catch (er) {
                switch (er.code) {
                    case 'auth/too-many-requests':
                        error.value = 'Too many requests, try again later!'
                        break
                    default:
                        error.value = 'No account with that email was found!'
                        break
                }
            }
        }
        return { handleSubmit, email, error }
    }
}
</script>

<style>
</style>