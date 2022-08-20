<template>
  <div class="container">
    <div class="text-center m-auto">
      <img v-if="showImg" src="../assets/RocketLaunch.gif" />
      <transition name="fade">
        <div class="mt-5" v-if="!showImg">
          <p class="mb-2">Email is on the way!</p>
          <h5 class="mb-5">If it doesn't arrive soon, check your spam folder or
            <router-link :to="{ name: 'ForgotPassword' }">try again</router-link>.
          </h5>
          <router-link id="backToLogin" :to="{ name: 'Login' }">BACK TO LOGIN</router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const showImg = ref(true)

    return { showImg }
  },
  mounted() {
    setTimeout(() => this.showImg = false, 3080)
  }
}
</script>

<style scoped>
p {
  font-weight: 700 !important;
  font-size: 8vw !important;
  color: #2C89F3 !important;
}

#backToLogin {
  background-color: #2C89F3;
  text-decoration: none !important;
  color: white !important;
  padding: 1% 2% 1% 2%;
  font-size: 13px;
  font-weight: bold;
}

#backToLogin:hover {
  background-color: white;
  color: #2C89F3 !important;
  border: 2px solid #2C89F3;
  font-weight: bolder;
}

a {
  text-decoration: none;
  color: #2C89F3 !important;
}

a:hover {
  font-weight: bold;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-active {
  transition: all 1s ease;
}

</style>