<template>

  <div class="deals">
    <h1>{{ pageTitle }}</h1>
    <div class="header">
      <h4>Deals</h4>

      <div class="test"></div>

      <!-- header buttons, edit - add -->
      <div class="button primary" @click="toggleModalEditCaffe">
        <span class="material-icons">edit</span>
        <span>Edit Caffe</span>
      </div>

      <div class="button primary" @click="toggleModalAddDeal">
        <span class="material-icons">add_circle</span>
        <span>Add deal</span>
      </div>
    </div>


    <!-- deal list -->
    <div class="content">
      <div class="deal" v-for="deal in dealList" :key="deal.iddeal">
        <div class="deal-wrapper" @click="populateDealInputs(deal.iddeal)">
          <div class="left">
            <h5>
              <span>{{ deal.name }}</span>
            </h5>
            <h5>
              <span>price: {{ deal.price }} kn</span>
            </h5>
            <h5>
              <span>points: {{ deal.points }}</span>
            </h5>
          </div>
          <div class="test"></div>
          <div class>
            <span class="material-icons active-color" v-if="deal.active">check_circle</span>
            <span class="material-icons inactive-color" v-if="!deal.active">cancel</span>
            <span class="material-icons">edit_note</span>
          </div>
        </div>
      </div>
    </div>

    <!-- edit caffe modal -->
    <div v-if="showModalEditCafe">
      <Modal @close="cancelModalEditCaffe" :title="titleEditCaffeModal">
        <template v-slot:body>
          <form id="form" autocomplete="off" @submit.prevent="handleSubmitEditCaffe">
            <div class="mb-3">
              <label class="mb-2 text-muted" for="name">Name</label>
              <input class="form-control" type="text" name="caffeBarName" v-model="caffeBarName" required autofocus>
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

            <div class="mt-3" v-if="error">{{ error }}</div>
            <hr />
            <div class="button-wrapper">
              <button class="button primary">
                <span class="material-icons">add_circle</span>
                <span> Edit</span>
              </button>
              <button class="button close" type="button" @click="deleteCaffe">
                <span class="material-icons">cancel</span>
                <span> Delete</span>
              </button>
            </div>
          </form>
        </template>
      </Modal>
    </div>


    <!-- add new deal -->
    <div v-if="showModalAddDeal">
      <Modal @close="cancelModalAddDeal" :title="titleAddDealModal">
        <template v-slot:body>
          <form id="form" autocomplete="off" @submit.prevent="handleSubmitAddDeal">
            <div class="mb-3">
              <label class="mb-2 text-muted" for="name">Name</label>
              <input class="form-control" type="text" name="name" v-model="dealName" required autofocus>
            </div>

            <div class="mb-3">
              <label class="mb-2 text-muted" for="dateTime">Date</label>
              <input class="form-control" type="date" name="dateTime" v-model="dateTime" style="color: grey" required />
            </div>

            <div class="col mb-3">
              <label class="mb-2 text-muted" for="points">Points</label>
              <input class="form-control" type="number" name="points" v-model="points" required>
            </div>

            <div class="col mb-3">
              <label class="mb-2 text-muted" for="price">Price</label>
              <input class="form-control" type="text" name="price" v-model="price" required>
            </div>

            <div class="d-flex justify-content-between">
              <label class="mb-2 text-muted" for="active">Active deal</label>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                  v-model="active">
                <label class="form-check-label" for="fexSwitchCheckDefault"></label>
              </div>
            </div>

            <div class="mt-3" v-if="error">{{ error }}</div>
            <hr />

            <div class="button-wrapper">
              <button class="button primary">
                <span class="material-icons">add_circle</span>
                <span> Add</span>
              </button>
              <button class="button close" type="button" @click="cancelModalAddDeal">
                <span class="material-icons">cancel</span>
                <span> Close</span>
              </button>
            </div>
          </form>
        </template>
      </Modal>
    </div>

    <!-- edit deal -->
    <div v-if="showModalEditDeal">
      <Modal @close="cancelModalEditDeal" :title="titleEditDealModal">
        <template v-slot:body>
          <form id="form" autocomplete="off" @submit.prevent="handleSubmitEditDeal">
            <div class="mb-3">
              <label class="mb-2 text-muted" for="name">Name</label>
              <input class="form-control" type="text" name="name" v-model="dealName" required autofocus>
            </div>

            <div class="mb-3">
              <label class="mb-2 text-muted" for="dateTime">Date</label>
              <input class="form-control" type="date" name="dateTime" v-model="dateTime" style="color: grey" required />
            </div>

            <div class="col mb-3">
              <label class="mb-2 text-muted" for="points">Points</label>
              <input class="form-control" type="number" name="points" v-model="points" required>
            </div>

            <div class="col mb-3">
              <label class="mb-2 text-muted" for="price">Price</label>
              <input class="form-control" type="text" name="price" v-model="price" required>
            </div>

            <div class="d-flex justify-content-between">
              <label class="mb-2 text-muted" for="active">Active deal</label>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                  v-model="active">
                <label class="form-check-label" for="fexSwitchCheckDefault"></label>
              </div>
            </div>

            <div class="mt-3" v-if="error">{{ error }}</div>
            <hr />

            <div class="button-wrapper">
              <button class="button primary">
                <span class="material-icons">add_circle</span>
                <span> Edit</span>
              </button>
              <button class="button close" type="button" @click="deleteDeal">
                <span class="material-icons">cancel</span>
                <span> Delete</span>
              </button>
            </div>
          </form>
        </template>
      </Modal>
    </div>

  </div>
</template>

   
<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import CaffiatoAPI from '../services/CaffiatoAPI'
import Modal from '../components/Modal.vue'


export default {
  name: 'CaffeBar',
  props: ['idCaffe'],
  components: { Modal },
  setup(props) {

    const router = useRouter()

    //view data
    const pageTitle = ref('')
    const error = ref('')

    //caffe data, caffe dealList - caffe adress
    const caffeBarData = ref('')
    const idCaffe = ref(props.idCaffe)
    const caffeBarName = ref('')
    const userCaffeID = ref('')
    const dealList = ref('')
    const idAddress = ref('')
    const streetName = ref('')
    const streetNum = ref('')
    const city = ref('')
    const postCode = ref('')

    //deal data
    const dealData = ref('')
    const idDeal = ref('')
    const dealName = ref('')
    const dateTime = ref('')
    const points = ref('')
    const price = ref('')
    const active = ref(true)

    //show modals, state
    const showModalEditCafe = ref(false)
    const showModalAddDeal = ref(false)
    const showModalEditDeal = ref(false)

    //modals titles
    const titleEditCaffeModal = ref('Edit Caffebar')
    const titleAddDealModal = ref('Add deal')
    const titleEditDealModal = ref('Edit deal')

    const loadCaffeData = async () => {
      try {
        const res = await CaffiatoAPI.getCaffe(props.idCaffe);

        caffeBarData.value = res.data.data
        caffeBarName.value = res.data.data.name
        userCaffeID.value = res.data.data.userCaffeId
        dealList.value = res.data.data.deals
        idAddress.value = res.data.data.addresses[0].idaddress
        streetName.value = res.data.data.addresses[0].streetName
        streetNum.value = res.data.data.addresses[0].streetNumber
        city.value = res.data.data.addresses[0].city
        postCode.value = res.data.data.addresses[0].postCode

        pageTitle.value = res.data.data.name

        // console.log(caffeBarData.value)

      } catch (error) {
        console.log(error.message)
      }
    }

    loadCaffeData()

    //toggle modal Edit Caffe
    const toggleModalEditCaffe = () => {
      showModalEditCafe.value = !showModalEditCafe.value
    }
    //toggle modal Add Deal
    const toggleModalAddDeal = () => {
      showModalAddDeal.value = !showModalAddDeal.value
    }
    //toggle modal Edit Deal
    const toggleModalEditDeal = () => {
      showModalEditDeal.value = !showModalEditDeal.value
    }

    //cancel modals, clear inputs
    const cancelModalEditCaffe = () => {
      toggleModalEditCaffe()
      // caffeBarName.value = caffeBarData.value.name
      // streetName.value = caffeBarData.value.address.streetName
      // streetNum.value = caffeBarData.value.address.streetNumber
      // city.value = caffeBarData.value.address.city
      // postCode.value = caffeBarData.value.address.postCode
    }

    const resetDealModalInputs = () => {
      dealName.value = ''
      dateTime.value = ''
      points.value = ''
      price.value = ''
      active.value = true
    }

    const cancelModalAddDeal = () => {
      toggleModalAddDeal();
      resetDealModalInputs();
    }

    const cancelModalEditDeal = () => {
      toggleModalEditDeal()
      resetDealModalInputs()
    }

    //handle caffe bar edit 
    const handleSubmitEditCaffe = async () => {
      try {
        const resCaffe = await CaffiatoAPI.updateCaffe(idCaffe.value, JSON.stringify({
          name: caffeBarName.value,
          userCaffeID: userCaffeID.value,
          deals: dealList.value,
          address: null
        }));
        const resAdress = await CaffiatoAPI.updateAdress(idAddress.value, JSON.stringify({
          streetNumber: streetNum.value,
          streetName: streetName.value,
          city: city.value,
          postCode: postCode.value,
          caffeId: props.idCaffe
        }));
        router.go()
      } catch (er) {
        console.log(er)
        error.value = er.message
      }
    }

    //delete caffe bar
    const deleteCaffe = async () => {
      try {
        await CaffiatoAPI.deleteCaffe(props.idCaffe);
        router.push('/')
      } catch (er) {
        console.log(er.message)
        error.value = er.message
      }
    }

    //handle add deal
    const handleSubmitAddDeal = async () => {
      try {
        const res = await CaffiatoAPI.createDeal(JSON.stringify({
          name: dealName.value,
          dateTime: dateTime.value,
          points: points.value,
          price: price.value,
          caffeID: idCaffe.value,
          active: active.value
        }));
        router.go()
      } catch (er) {
        console.log(er.message)
        error.value = er.message
      }
    }

    //get deal data
    const populateDealInputs = async (id) => {
      try {
        const res = await CaffiatoAPI.getDeal(id);

        dealData.value = res.data.data
        idDeal.value = res.data.data.iddeal
        dealName.value = res.data.data.name
        dateTime.value = new Date(res.data.data.dateTime).toLocaleDateString('en-CA')
        points.value = res.data.data.points
        price.value = res.data.data.price
        active.value = res.data.data.active
        //open modal 
        toggleModalEditDeal()
      } catch (er) {
        console.log(er.message)
      }
    }

    //handle edit deal
    const handleSubmitEditDeal = async () => {
      try {
        const res = await CaffiatoAPI.updateDeal(idDeal.value, JSON.stringify({
          iddeal: idDeal.value,
          name: dealName.value,
          dateTime: dateTime.value,
          points: points.value,
          price: price.value,
          active: active.value
        }));
        router.go()
      } catch (er) {
        error.value = er.message
      }
    }

    //delete deal
    const deleteDeal = async () => {
      try {
        await CaffiatoAPI.deleteDeal(idDeal.value);
        router.go()
      } catch (er) {
        console.log(er.message)
        error.value = er.message
      }
    }

    return {
      pageTitle, error,
      //caffeBar data
      caffeBarName, dealList, streetName, streetNum, city, postCode,
      //deal data
      dealName, dateTime, points, price, active,
      //edit caffe modal
      toggleModalEditCaffe, showModalEditCafe, titleEditCaffeModal, handleSubmitEditCaffe, deleteCaffe, cancelModalEditCaffe,
      //add deal modal
      toggleModalAddDeal, showModalAddDeal, titleAddDealModal, handleSubmitAddDeal, cancelModalAddDeal,
      //edit deal modal
      toggleModalEditDeal, showModalEditDeal, titleEditDealModal, populateDealInputs, handleSubmitEditDeal, cancelModalEditDeal, deleteDeal
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
  vertical-align: middle;
  margin: auto;

  .test {
    flex: 1 1 0;
  }

}

h4,
h5 {
  margin: 0;
}

.content {
  overflow-y: auto;
  height: 60vh;
  padding-right: 10px;
}

.deal>.deal-wrapper {
  background: var(--primary-light);
  padding: 18px;
  border-radius: 5px;
  margin: 0 auto 10px;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  .left {
    display: flex;
    min-width: 66%;
    justify-content: space-between;
  }

  h5,
  .material-icons {
    color: var(--black);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: start;
  }

  h5 {
    width: 30%
  }

  .active-color {
    color: var(--primary);
  }

  .inactive-color {
    color: var(--close);
  }
}

.deal :hover {
  background: var(--primary);

  h5,
  .material-icons,
  .text-danger-test,
  .text-success-test {
    color: var(--light);
  }
}
</style>
