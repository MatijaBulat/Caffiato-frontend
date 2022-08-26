<template>

    <div id="holder" class="row justify-content-sm-center h-100">
        <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
            <div class="card shadow-lg">
                <div class="card-body p-5">
                    <h1 class="fs-4 card-title fw-bold mb-4 text-center">Register</h1>
                    <form autocomplete="off" @submit.prevent="handleSubmit">
                        <div class="row mb-3">
                            <div class="col">
                                <input id="firstName" type="text" class="form-control" name="firstName"
                                    placeholder="First name" v-model="firstName" required>
                            </div>
                            <div class="col">
                                <input id="lastName" type="text" class="form-control" name="lastName"
                                    placeholder="Last name" v-model="lastName" required>
                            </div>
                        </div>

                        <div class="mb-3">
                            <input id="email" type="email" class="form-control" name="email" placeholder="Email"
                                v-model="email" required>
                        </div>

                        <div class="mb-3">
                            <input id="password" type="password" class="form-control" name="password"
                                placeholder="Password" v-model="password" required>
                        </div>

                        <div class="mb-3">
                            <input id="dateOfBirth" class="form-control" type="date" name="dateOfBirth"
                                v-model="dateOfBirth" style="color: grey" />
                        </div>

                        <div class="mb-3">
                            <input id="oib" class="form-control" type="text" name="oib" placeholder="OIB" v-model="OIB"
                                minlength="11" maxlength="11" required />
                        </div>

                        <p class="form-text text-muted mb-3">
                            By registering you agree with our terms and condition.
                        </p>

                        <div class="align-items-center d-flex">
                            <button type="submit" class="btn btn-primary m-auto col-12">
                                Register
                            </button>
                        </div>

                        <div class="text-center mt-3">
                            <p class="text-center">Already a member? <router-link :to="{ name: 'Login' }">Login
                                </router-link>
                            </p>
                        </div>
                        <div v-if="error">{{ error }}</div>
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
import CaffiatoAPI from '../services/CaffiatoAPI'

export default {
    setup() {
        const store = useStore()
        const router = useRouter()

        const firstName = ref('')
        const lastName = ref('')
        const email = ref('')
        const password = ref('')
        const dateOfBirth = ref('')
        const OIB = ref('')

        const error = ref(null)


        const handleSubmit = async () => {
            try {
                await store.dispatch('signup', {
                    email: email.value,
                    password: password.value
                })
                const res = await CaffiatoAPI.createUser(JSON.stringify({
                    email: email.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    dateOfBirth: dateOfBirth.value.toString(),
                    oib: OIB.value.toString(),
                    points: 0
                }))
                router.push('/')
            } catch (er) {
                error.value = er.message
            }
        }
        return {
            handleSubmit, firstName, lastName, email,
            password, dateOfBirth, OIB, error
        }
    }
}
</script>
