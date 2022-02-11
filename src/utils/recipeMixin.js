import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex';
// import recipe from '@/store/recipe'

export const recipeMixin = {
    data:() =>{
        return {
            allAction: '',

        }
    },
    computed: {
        ...mapState('Recipe', ['recipes','catalog', 'searchKeyword', 'type']),
        ...mapGetters('Recipe', ['recipesGetter','foodtypeGetter', 'cuisineGetter', 'ingredientGetter', 'diettypeGetter', 'locationGetter']),
        recipeActions(){
            var actions =
            Reflect.ownKeys(this.$store._actions).filter( action => action.includes('Recipe/')
            )
            return actions.map( action => action.replace('Recipe/','')
            )
        },
        recipesData() {
            return this.recipesGetter
        },
        foodtype() {
            console.log(this.$store)
            console.log('Actions:', this.recipeActions)
            return this.foodtypeGetter
        },
        ingredient() {
            return this.ingredientGetter
        },
        cuisine() {
            return this.cuisineGetter
        },
        diettype() {
            return this.diettypeGetter
        },
        searchKeywordData() {
            return this.searchKeyword
        },
        typeData() {
            return this.type
        }
    },
    methods: {
        ...mapActions('Recipe', ['getRecipes','getCatalog','getIngredient','getFoodtype','searchRecipebyIGD','getSearchKeyword','getType', 'getRecipeContent']),
        async searchRecipe(keyword, order, sort, jumpTo, type) {

            if(jumpTo){
                this.$router.push(jumpTo)
                this.getSearchKeyword(keyword)
                this.getType(type)
            }

            let recipesData = await this.getRecipes({
                keyword: keyword,
                order: order,
                sort: sort
            })
            return recipesData
        },
        checkImg(path) {
            // return require(path);
            try{
                return require(path);
            }catch(e){
                return require("@/img/test.jpg")
            }
        },
        bgImg(img) {
            try{
                return { "background-image": `url(${require(`@/img/recipe/${img}`)})`}
            }catch(e){
                return { "background-image": `url(${require(`@/img/recipe/test.jpg`)})`}
            }

        },
        scrollPageTo(refName) {
            var element = this.$refs[refName];
            var top = element.offsetTop;
            window.scrollTo(0, top);
        },
        groupBy(objectArray, property) {
			return this.sortKeys(objectArray.reduce((acc, obj) => {
				const key = obj[property];
				if (!acc[key]) {
					acc[key] = [];
				}
				// Add object to list for given key's value
				acc[key].push(obj);

				return acc
			}, {}));
		},
        sortKeys(data) {
            var sortedData = Object.keys(data)
                .sort()
                .reduce(function (acc, key) {
                    acc[key] = data[key];
                    return acc;
                }, {});
            return sortedData
        }
    }
};

Vue.mixin(recipeMixin);