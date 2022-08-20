<template>
    <div class="backdrop" @click.self="$emit('close')">
        <div class="modal-nije-bootstrap shadow-lg p-5">
            <div class="header">
                <h4 class="fw-bold">{{ title }}</h4>
                <hr />
            </div>
            <div class="body">
                <slot name="body"></slot>
            </div>
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    name: 'Modal',
    props: ['title'],
    setup(props) {



        return {}
    }
}
</script>

<style lang="scss" scoped>
.modal-nije-bootstrap {
    width: 500px;
    // padding: 4%;
    margin: auto;
    background: white;
    border-radius: 3px;
}

.backdrop {
    top: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    margin-left: -4rem;
    display: flex;
    justify-content: center;
}
</style>