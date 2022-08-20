<template>
  <div id="holder" class="row justify-content-sm-center h-100">
    <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
      <div class="card shadow-lg">
        <div class="card-body p-5">
          <h1 class="fs-4 card-title fw-bold mb-4 text-center">Login</h1>
          <form autocomplete="off" @submit.prevent="handleSubmit">

            <div class="mb-3">
              <input id="email" type="email" class="form-control" name="email" placeholder="Email" v-model="email"
                required autofocus>
            </div>

            <div class="mb-3">
              <input id="password" type="password" class="form-control" name="password" placeholder="Password"
                v-model="password" required>
            </div>

            <div class="d-flex align-items-center">

              <div class="m-auto"> 
                <router-link :to="{ name: 'ForgotPassword' }">Forgot Password?</router-link>
              </div>
            </div>

            <button class="btn btn-primary ms-auto col-12 mt-3">
              Log In
            </button>

            <div class="text-center mt-3">
              <p>Not a member? <router-link :to="{ name: 'Register' }">Register</router-link>
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


export default {
  name: 'Login',
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)
    const rememberMe = ref(true)

    const store = useStore()
    const router = useRouter()

    const handleSubmit = async () => {
      try {
        await store.dispatch('login', {
          email: email.value,
          password: password.value
        })
        router.push('/')
      }
      catch (err) {
        switch (err.code) {
          case 'auth/invalid-email':
              error.value = 'Invalid email'
              break
          case 'auth/user-not-found':
              error.value = 'No account with that email was found'
              break
          case 'auth/wrong-password':
              error.value = 'Incorrect password'
              break
          default:
              error.value = 'Email or password was incorrect'
              break
        }
      }
    }

    return { handleSubmit, email, password, error, rememberMe }
  }
}

</script>

