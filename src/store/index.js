import { createStore } from "vuex";

// firebase imports
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";


const store = createStore({
  state: {
    user: null,
    authIsReady: false,
    sidebarExpand: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
    },
    //sidebar
    toggleSidebar(state) {
      state.sidebarExpand = !state.sidebarExpand;
    },
  },
  actions: {
    async signup(context, { email, password }) {
      console.log("signup action");

      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res) {
        context.commit("setUser", res.user);
      } else {
        throw new Error("could not complete signup");
      }
    },
    async login(context, { email, password }) {
      console.log("login action");

      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        context.commit("setUser", res.user);
      } else {
        throw new Error("could not complete login");
      }
    },
    async logout(context) {
      console.log("logout action");

      await signOut(auth);
      context.commit("setUser", null);
    },
    async passwordReset(context, { email }) {
      console.log("reset password");

      await sendPasswordResetEmail(auth, email);
      context.commit("setUser", null);
    },
    sidebarState(context) {
      context.commit("toggleSidebar");
    }
  },
});

// wait until auth is ready
const unsub = onAuthStateChanged(auth, (user) => {
  store.commit("setAuthIsReady", true);
  store.commit("setUser", user);
  unsub();
});

// export the store
export default store;
