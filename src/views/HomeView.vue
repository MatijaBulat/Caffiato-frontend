<template>
  <div class="home">
    <h1>Home</h1>

    <div class="header">
      <h4>Caffe Bars</h4>

      <div class="test"></div>

      <div class="right">
        <div class="button primary" @click="toggleModal">
          <span class="material-icons">add_circle</span>
          <span>Add CaffeBar</span>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="caffesList" v-for="caffe in userCaffes" :key="caffe.idcafe">
        <router-link :to="{ name: 'CaffeBar', params: { idCaffe: caffe.idcafe } }">
          <div class="left">
            <h3>
              <span class="material-icons">deck</span>
              <span>{{ caffe.name }}</span>
            </h3>
          </div>
          <div class="flex"></div>
          <div class="right">
            <span class="material-icons">navigate_next</span>
          </div>
        </router-link>
      </div>
    </div>

    <div v-if="showModal">
      <Modal @close="toggleModal" :title="title">
        <template v-slot:body>
          <form id="form" autocomplete="off" @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label class="mb-2 text-muted" for="name">Name</label>
              <input class="form-control" type="text" name="name" v-model="name" required autofocus>
            </div>

            <div class="row mb-3">
              <div class="col">
                <label class="mb-2 text-muted" for="streetName">Street name</label>
                <input class="form-control" type="text" name="streetName" v-model="streetName" required>
              </div>
              <div class="col">
                <label class="mb-2 text-muted" for="streetNumber">Street number</label>
                <input class="form-control" type="text" name="streetNumber" v-model="streetNum" required>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <label class="mb-2 text-muted" for="city">City</label>
                <input class="form-control" type="text" name="city" v-model="city" required>
              </div>
              <div class="col">
                <label class="mb-2 text-muted" for="postCode">Post code</label>
                <input class="form-control" type="text" name="postCode" v-model="postCode" required>
              </div>
            </div>
            <div v-if="error">{{ error }}</div>
            <hr />

            <div class="button-wrapper">
              <button class="button primary">
                <span class="material-icons">add_circle</span>
                <span> Add</span>
              </button>
              <button class="button close" @click="toggleModal">
                <span class="material-icons">cancel</span>
                <span> Close</span>
              </button>
            </div>
          </form>
        </template>
      </Modal>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import CaffiatoAPI from '../services/CaffiatoAPI'
import Modal from '../components/Modal.vue'


export default {
  name: "HomeView",
  components: { Modal },
  setup() {
    const store = useStore()
    const router = useRouter()

    //modal
    const title = ref('Add CaffeBar')
    const showModal = ref(false)
    const name = ref('')
    const streetName = ref('')
    const streetNum = ref('')
    const city = ref('')
    const postCode = ref('')
    const error = ref('')

    //caffe
    const userId = ref('')
    const email = ref(store.state.user.email)
    const userCaffes = ref([])

    const loadCaffeBars = async () => {
      try {
        const resUser = await CaffiatoAPI.getUserByEmail(email.value);
        userCaffes.value = resUser.data.data.caffes
        userId.value = resUser.data.data.iduserCaffe

        // console.log("resdata", resUser.data.data)
        // console.log("resdata iduser", resUser.data.idUserCaffe)
        // console.log("userCaffes cafe id", userCaffes.value)
      } catch (error) {
        console.log(error);
      }
    };


    loadCaffeBars();


    const toggleModal = () => {
      showModal.value = !showModal.value
      name.value = ''
      streetName.value = ''
      streetNum.value = ''
      city.value = ''
      postCode.value = ''
      error.value = ''
    }

    const handleSubmit = async () => {
      try {
        const resCaffe = await CaffiatoAPI.createCaffe(JSON.stringify({
          name: name.value,
          userCaffeId: userId.value
          // dealList: [],
          // adress: null
        }))
        console.log("resCaffe", resCaffe.data)
        const resAdress = await CaffiatoAPI.createAdress(JSON.stringify({
          streetNumber: streetNum.value,
          streetName: streetName.value,
          city: city.value,
          postCode: postCode.value,
          caffeId: resCaffe.data.data.idcafe
        }))
        toggleModal()
        router.go()
      } catch (er) {
        error.value = er.message
      }
    }

    return {
      showModal, toggleModal, title, handleSubmit,
      name, streetName, streetNum, city, postCode, error, userCaffes
    }
  }
}
</script>

<style lang="scss" scoped>
.button-wrapper {
  display: flex;
  justify-content: flex-end;
}

.button {
  display: flex;
  cursor: pointer;
  padding: 11px 10px;
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
}

.button:hover {
  color: var(--light);
}

.button>span {
  display: flex;
  align-items: center;
  padding: 2px;
}

.primary {
  color: var(--primary);
}

.primary:hover {
  background-color: var(--primary);
}

.close {
  color: var(--close);
}

.close:hover {
  background-color: var(--close);
}

.header {
  display: flex;
  height: 100px;
  align-items: center;

  h4 {
    margin: 0;
  }

}

.test {
  flex: 1 1 0;
}

.right {
  margin: auto;
}

.content {
  overflow-y: auto;
  height: 60vh;
  padding-right: 10px;
}

.caffesList a {
  background: var(--primary-light);
  padding: 18px;
  border-radius: 5px;
  margin: 0 auto 10px;
  text-decoration: none;
  display: flex;

  .flex {
    flex: 1 1 0;
  }

  .left {
    h3 {
      margin: auto;

      span {
        margin: 0 1vw;
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
  }

  h3,
  .material-icons {
    color: var(--black);
  }
}

.caffesList :hover {
  background: var(--primary);
  color: car(--light);

  h3,
  .material-icons {
    color: var(--light);
  }
}
</style>
