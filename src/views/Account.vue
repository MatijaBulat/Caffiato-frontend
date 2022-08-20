<template>
    <div class="account">
        <h1>Account</h1>
        <div class="header">
            <div class="left">
                <h4>Edit</h4>
            </div>
        </div>

        <div class="info">
            <img src="../assets/account.png">
            <div class="email">{{ email }}</div>

            <div @click="handleClick" class="button">
                <span>Reset password</span>
                <div class="inner-button">
                    <span class="material-icons">edit</span>
                </div>
            </div>
            <div v-if="error">{{ error }}</div>
        </div>

    </div>
</template>

   
<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
    name: 'HomeView',
    setup() {

        const store = useStore()
        const router = useRouter()

        const email = ref(store.state.user.email)
        const error = ref('')

        const handleClick = async () => {
            try {
                await store.dispatch('passwordReset', {
                    email: email.value
                })
                router.push('/emailsent')
                store.dispatch('logout')
            } catch (er) {
                error.value = 'Too many requests, try again later!'
            }
        }
        return { handleClick, email, error }
    }
}
</script>

<style lang="scss" scoped>


.header {
    display: flex;

    .left {
        h4 {
            margin: 50px 0;
        }
    }
}

.info {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 15%;
        height: auto;
        margin: 2%;
    }

    .email {
        font-weight: 600;
    }

    .button {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 8px 10px;
        margin: 10px;
        color: #2C89F3;
        font-weight: 600;
        font-size: large;

        .inner-button {
            padding-left: 5px;

            span {
                padding-top: 2px;
            }
        }
    }

    .button:hover {
        background-color: #2C89F3;
        color: white;
    }
}
</style>
