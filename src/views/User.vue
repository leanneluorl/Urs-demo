<template>
    <div class="user-box">
        <h1 class="section-title main">User Info
            <button @click="clickEdit" ><h6>Edit</h6></button>
        </h1>
        <div class="user-data">
            <p v-for="(data, key) in userData" :key="key">
                {{key}} : {{data}}
            </p>
        </div>
        <button class="logout" @click="clickLogout()"><h3>Log out</h3></button>
        <UserEditor v-show="userEditorPOP"/>
    </div>
</template>

<script>
import UserEditor from '@/components/user/UserEditor.vue';
export default {
    name: 'User',
    data:() => {
        return {
        }
    },
    components: {
        UserEditor
    },
    created: () => {
    },
    methods: {
        clickEdit() {
            this.getUserEditorPOP(true)
        }
    }
}
</script>

<style lang="scss">
    .user-box {
        position: relative;
        .section-title{
            button {
                background-color: $primary-g;
                width: 60px;
                height: 25px;
                h6{
                    vertical-align: middle;
                }
            }
        }
        .user-data{
            text-align: left;
            margin: 1vw 0;

            p {
                height: 2rem;
                padding: 0 25%;
                background: $primary-g;
                &:nth-last-of-type(odd){
                    background-color: rgb(196, 238, 206);
                }
            }
        }
        button.logout {
            cursor: pointer;
            width: 200px;
            height: 50px;
            background-color: $primary-g-dark;
            border-radius: 1vw;
            color: white;
            font-weight: 900;
        }
    }
</style>