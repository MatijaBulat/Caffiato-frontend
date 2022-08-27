import API from "./API";

export default {
  //UserCaffe
  getUserById(id) {
    return API().get(`api/UserCaffe/${id}`);
  },
  getUserByEmail(email) {
    return API().get(`api/UserCaffe/${email}`);
  },
  createUser(data) {
    return API("api/").post("/UserCaffe", data);
  },

  //Caffe
  getCaffe(id) {
    return API().get(`api/Caffe/${id}`);
  },
  createCaffe(data) {
    return API("api/").post("/Caffe", data);
  },
  updateCaffe(id, data) {
    return API("api/").put(`/Caffes/${id}`, data);
  },
  deleteCaffe(id) {
    return API("api/").delete(`/Caffes/${id}`);
  },

  //Deal
  getDeals() {
    return API().get("api/Deal");
  },
  getDeal(id) {
    return API().get(`api/Deal/${id}`);
  },
  createDeal(data) {
    return API("api/").post("/Deals", data);
  },
  updateDeal(id, data) {
    return API("api/").put(`/Deals/${id}`, data);
  },
  deleteDeal(id) {
    return API("api/").delete(`/Deals/${id}`);
  },
  updateDealActivity(id, data) {
    return API("api/").put(`/Deal/UpdateActivity/${id}`, data);
  },

  //Adress
  getAdress(id) {
    return API().get(`api/Address/${id}`);
  },
  createAdress(data) {
    return API("api/").post("/Address", data);
  },
  updateAdress(id, data) {
    return API("api/").put(`/Addresses/${id}`, data);
  },
  deleteAdress(id) {
    return API("api/").delete(`/Address/${id}`);
  }
};
