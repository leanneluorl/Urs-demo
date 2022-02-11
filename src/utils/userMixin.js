import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex';

export const userMixin = {
    data:() =>{
        return {
        }
    },
    computed: {
        ...mapState('User', ['user','loginPOP','userID','userEditorPOP','userStockIGD']),
        ...mapGetters('User', ['userGetter', 'userIsLogin']),
        userData() {
            return this.user
        },
    },
    methods: {
        ...mapActions('User', ['getLoginPOP','logout','getUserStockIGD','updateUserInfo','getUserEditorPOP', 'updateUserStockIGD','deleteUserStockIGD', 'createUserStockIGD']),
        closeLogin() {
            this.getLoginPOP(false)
        },
        clickLogout() {
            console.log("Log out")
            this.logout();
            this.$router.push("/")
        },
        // async searchRecipe(keyword, order, sort, jumpTo, type) {
        //     console.log(keyword, order, sort)

        //     if(jumpTo){
        //         this.$router.push(jumpTo)
        //         this.getSearchKeyword(keyword)
        //         this.getType(type)
        //         console.log(this.cuisine)
        //         console.log(this.diettype)
        //     }

        //     let recipesData = await this.getRecipes({
        //         keyword: keyword,
        //         order: order,
        //         sort: sort
        //     })
        //     console.log("recipesData",recipesData)
        //     return recipesData
        // },
    }
};

Vue.mixin(userMixin);