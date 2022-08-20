<template>
  <body>
    <div class="app">
      <Navbar />
      <main>
        <router-view />
      </main>
    </div>
  </body>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  components: { Navbar }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:root {
  --primary: #2c89f3;
  --primary-light: #bad4f16c;
  --close: #f44;
  --light: #fff;
  --black: #000;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--light) !important;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
 

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 3rem 4rem; 

    @media (max-width: 768px) {
      padding-left: 6rem;
    }
  }
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f0f0f0; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #bcbbbb; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background:#7a7a7a; 
}
</style>
