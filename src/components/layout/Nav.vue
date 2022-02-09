<template>
    <div class="nav-box">
        <router-link to="/user">
            <div class="nav-item">
                <img :src="require(`@/img/nav/login.png`)" alt="icon-login" class="nav-icon">
                <p class="nav-link"> {{ userID ? userID : 'Login' }} </p>
            </div>
        </router-link>
        <router-link
        :class="{ 'nav-home': item.link === '' }"
        v-for="item in navItems"
        :to="'/'+item.link" :key="item.key"
        >
            <div class="nav-item">
                <img :src="require(`@/img/nav/${item.link}.png`)" :alt="`icon-`+item.link" class="nav-icon">
                <p class="nav-link"> {{ item.linkText }} </p>
            </div>
        </router-link>
    </div>
</template>

<script>

export default {
    data:() => {
        return {
            navItems:[
                // {
                //     link: "home",
                //     linkText: ""
                // },
                // {
                //     link: "login",
                //     linkText: "Login"
                // },
                {
                    link: "recipe",
                    linkText: "Recipe"
                },
                {
                    link: "rummage",
                    linkText: "Rummage"
                },
                {
                    link: "ur-stock",
                    linkText: "UrStock"
                },
                {
                    link: "ur-table",
                    linkText: "Ur Table"
                }
            ],
        }
    },
    components: {

	},
    computed: {
        // userLink() {
        //     userID? return return '/user' : return '';
        // }
    },
    methods: {

    }
}
</script>

<style lang="scss">
    .nav-box{
        overflow: hidden;
        width: 100px;
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        height: 100%;
        line-height: 100px;
        border-radius: 0 30px 30px 0 ;
        text-align: left;
        border-bottom: 1px solid $light-grey;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        background-color: $primary-g-dark;
        filter: drop-shadow(0 0 2px #00000090);
        a{
            text-decoration: inherit;
            display: block;
            width: 100%;
            height: 100px;
            .nav-item{
                height: 100%;
                @extend .flex-nowrap;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                align-content: center;
                font-size: 18px;
            }

            p{
                color: $primary-g;
            }
            img{
                filter: drop-shadow( 0 0 1px #00000010);
            }


            &.router-link-exact-active {
                p{
                    color: $primary-g-dark;
                    filter: brightness( 0.65);
                }
                color: #fff;
                font-weight: bold;
                background-color: $primary-g;
            }

        }
    }
</style>