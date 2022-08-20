<template>
  <div class="container text-center mt-5">
    <p class="mb-2">A dead end</p>
    <h5 class="mb-5">Let's get you back on track.</h5>
    <router-link :to="{ name: 'home' }">BACK TO HOMEPAGE</router-link>
  </div>
</template>

<style scoped>
p {
  font-weight: 700 !important;
  font-size: 8vw !important;
}

a {
  background-color:  black;
  text-decoration: none !important;
  color: white !important;
  padding: 1% 2% 1% 2%;
  font-size: 13px;
  font-weight: bold;
}

a:hover {
  background-color: white;
  color: black !important;
  border: 2px solid black;
  font-weight: bolder;
}

</style>

