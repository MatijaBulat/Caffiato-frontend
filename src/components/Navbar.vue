<template>
    <!-- <div v-if="user">
        <button @click="logOut">Log out</button>
    </div> -->
    <aside v-if="user" :class="`${sidebarExpand && 'sidebar-expanded'}`">

        <div class="logo mb-3 text-center">
            <img src="../assets/logo.png" alt="iuk">
        </div>

        <!-- toggle sidebar -->
        <div class="menu-toggle-wrap">
            <button class="menu-toggle" @click="toggleSidebar">
                <span class="material-icons">keyboard_double_arrow_right</span>
            </button>
        </div>


        <!-- <h3>Caffiato</h3> -->

        <hr>
        <!-- home -->
        <div class="menu">
            <router-link :to="{ name: 'home' }" class="button">
                <span class="material-icons">home</span>
                <span class="text">Home</span>
            </router-link>
        </div>
        <hr>

        <div class="flex"></div>

        <!-- account -->
        <div class="menu">
            <router-link :to="{ name: 'Account' }" class="button">
                <span class="material-icons">person</span>
                <span class="text">Account</span>
            </router-link>
        </div>

        <!-- logout -->
        <div class="menu">
            <router-link :to="{ name: 'Login' }" class="button" @click="logOut">
                <span class="material-icons">logout</span>
                <span class="text">Logout</span>
            </router-link>
        </div>

        <!-- <hr>
            <ul class="nav nav-pills flex-column mb-auto mt-3">
                <li class="nav-item">
                    <router-link class="nav-link active p-2" :to="{ name: 'Register' }">Home</router-link>
                </li>
            </ul>
            <hr>
                <span class="collapse-icon">
                    <i class="fas fa-angle-double-right"></i>
                </span> -->

    </aside>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

export default {
    setup() {
        const store = useStore()
        const router = useRouter()
        
        const logOut = () => {
            store.dispatch('logout')
            router.push('/login')
        }

        const toggleSidebar = () => {
            store.dispatch('sidebarState')
        }

        return {
            logOut, toggleSidebar,
            user: computed(() => store.state.user),
            sidebarExpand: computed(() => store.state.sidebarExpand)
        }
    }
}

</script>

<style>
:root {
    --sidebar-primary: #000000;
    --sidebar-item-color: #ffffff;
    --sidebar-item-primary: #2C89F3;
    --sidebar-dark-alt: #3e3e3e;
    --sidebar-width: 250px;
}
</style>

<style lang="scss" scoped>
aside {
    background-color: var(--sidebar-primary);
    color: var(--sidebar-item-color);
    // float: left;
    // position: fixed;

    display: flex;
    flex-direction: column;
    width: calc(2rem + 2rem);
    min-height: 100vh;
    overflow: hidden;
    padding: 1rem;
    transition: 0.2s ease-out;

    .flex {
        flex: 1 1 0;
    }

    .logo {
        margin-bottom: 1rem;
        img {
            border-radius: 20%;
            width: 2rem;
        }
    }

    .menu-toggle-wrap {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
        position: relative;
        top: 0;
        transition: 0.2s ease-out;

        .menu-toggle {
            transition: 0.2s ease-out;

            .material-icons {
                font-size: 2rem;
                color: var(--sidebar-item-color);
                transition: 0.2s ease-out;
            }

            &:hover {
                .material-icons {
                    // display: inline-block;
                    color: var(--sidebar-item-primary);
                    transform: translateX(0.5rem)
                }
            }
        }
    }

    h3,
    .button .text {
        opacity: 0;
        transition: 0.3s ease-out;
    }

    h3 {
        color: rgb(100, 100, 100);
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
    }

    .menu {
        margin: 0 -1rem;
        // display: inline-block;

        .button {
            display: flex;
            align-items: center;
            text-decoration: none;
            padding: 0.5rem 1rem;
            transition: 0.2s ease-out;

            .material-icons {
                font-size: 2rem;
                color: var(--sidebar-item-color);
                transition: 0.2s ease-out;
            }

            .text {
                color: var(--sidebar-item-color);
                transition: 0.2s ease-out;
            }

            &:hover,
            &.router-link-exact-active {
                background-color: var(--sidebar-dark-alt);

                .material-icons,
                .text {
                    color: var(--sidebar-item-primary);
                }
            }

            &.router-link-exact-active {
                border-right: 5px solid var(--sidebar-item-primary);
            }
        }
    }

    &.sidebar-expanded {
        width: var(--sidebar-width);

        .menu-toggle-wrap {
            top: -3rem;

            .menu-toggle {
                transform: rotate(-180deg);
            }
        }

        h3,
        .button .text {
            opacity: 1;
            transition: 0.3s ease-out;
        }

        .button {
            .material-icons {
                margin-right: 1rem;
            }
        }
    }

    // hover expand nacin
    // &:hover {
    //     width: var(--sidebar-width);
    // }
    @media (max-width: 768px) {
        position: fixed;
        z-index: 99;
    }
}
</style>