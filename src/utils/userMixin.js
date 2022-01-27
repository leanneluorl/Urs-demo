import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex';

export const userMixin = {
    data:() =>{
        return {
        }
    },
    computed: { 
        ...mapState('User', ['user','loginPOP','userID','userEditorPOP']),
        ...mapGetters('User', []),
        userData() {
            return this.user
        },
    },
    methods: { 
        ...mapActions('User', ['getLoginPOP','logout','getUserStockIGD','updateUserInfo','getUserEditorPOP']),
        clickLogin(page) {
            console.log("click")
            if(page !== "recipe"){
                this.userID ? 
                this.$router.push(page) 
                : this.getLoginPOP(true)
            }
        },
        closeLogin() {
            this.getLoginPOP(false)
        },
        clickLogout() {
            console.log("Log out")
            this.logout();
            this.$router.push("/")
        }
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