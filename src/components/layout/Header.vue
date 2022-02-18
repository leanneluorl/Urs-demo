
<template>
    <header class="header">
        <router-link to="/">
            <div class="logo-image">
                <img src="@/img/urkitchen_head.png" alt="" class="logo-white">
            </div>
        </router-link>
        <div class="serach-box yellow">
            <form>
                <input type="text" v-model="keywordText" placeholder="Search Recipe..." id="searchRecipe">
                <input type="button" @click="searchRecipe(keywordText, 'viewtimes', 'desc', 'recipeSearch')" />
            </form>
        </div>
        <Navbar />
    </header>
</template>

<script>
import Navbar from '@/components/layout/Nav.vue';

export default {
    components: {
        Navbar,
    },
    data() {
        return{
            keywordText: '',
        }
    },
    methods: {

    },
    watch: {
        // recipes: {
        //     immediate: true,
        //     handler() {
        //         console.log("Header watch",this.recipes)

        //     }
        // },
    }
}
</script>

<style lang="scss">
    header.header{
        margin: 0;
        border: 0;
        font-size: 0;
        width: 100%;
        height: 50vh;
        border-radius: 5vw;
        background-color: $primary-g;
        display: flex;
        flex-flow: column;
        justify-content: flex-end;
        align-items: flex-end;
        .logo-image{
            width: 100%;

            height: fit-content;
            flex: 0 1 auto;
            text-align: right;
            img{
                width: 85%;
                min-width: calc( 100% - 100px);
                height: auto;
            }
        }

        .serach-box {
            flex: 1 1 auto;
            width: calc(85% - 100px);
            text-align: right;
            border-radius: 30px;
            @extend .flex-align-center;
            align-content: center;
            font-size: 16px;
            form {
                width: 60%;
                * {
                    display: inline-block;
                }
            }
            input[type='text'] {
                width: calc( 100% - 65px);
                height: 60px;
            }
            input[type='button'] {
                background: url(./../../img/svg/search.svg) no-repeat center center / 80% 80%, #ccc;
                width: 60px;
                height: 60px;
                margin-left: 5px;
                &:hover {
                    filter: contrast(1) invert(1);
                    background-color: $primary-g-dark;
                }
            }
        }
    }
</style>