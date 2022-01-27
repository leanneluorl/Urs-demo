import recipe from '../api/recipeA'
// import cookie from 'vue-cookies'
// import router from '../router'

const Recipe = {
    namespaced: true,
    state: () => ({
        response: {},
        error: {},
        recipes: {},
        catalog: {},
        cuisine: {},
        diettype: {},
        foodtype: {},
        ingredient: {},
        instruction: {},
        recipeIngredient: {},
        searchKeyword: 'test',
        type: [],
    }),
    mutations: {
        setRecipes: (state, recipes) => {
            state.recipes = recipes;
        },
        setCatalog: (state, catalog) => {
            state.catalog = catalog;
        },
        setCuisine: (state, cuisine) => {
            state.cuisine = cuisine;
        },
        setDiettype: (state, diettype) => {
            state.diettype = diettype;
        },
        setIngredient: (state, ingredient) => {
            state.ingredient = ingredient;
        },
        setFoodtype: (state, foodtype) => {
            state.foodtype = foodtype;
        },
        setSearchKeyword: (state, searchKeyword) => {
            console.log("setKeyword")
            state.searchKeyword = searchKeyword;
        },
        setType: (state, type) => {
            state.type = type;
        },
    },
    actions: {
        getRecipes: ({ commit }, params) => {
            return recipe.getRecipes(params).then(res => {
                commit('setRecipes', res.data)  
                return res.data
            })
        },
        getCatalog: ({ commit }, params) => {
            return recipe.getTable(params).then(res => {
                const dataSetter = 'set' + params.table.charAt(0).toUpperCase() + params.table.slice(1);
                commit( dataSetter, res.data) 
                return res.data
            })
        },
        getIngredient: ({ commit }, params) => {
            return recipe.getIngredient(params).then(res => {
                commit('setIngredient', res.data)  
                return res.data
            })
        },
        getFoodtype: ({ commit }) => {
            return recipe.getTable({table:"foodtype", keyword: "all"}).then(res => {
                commit('setFoodtype', res.data)  
                return res.data
            })
        },
        searchRecipebyIGD(c, data) {
            return new Promise((resolve, reject) => {
                recipe.searchRecipebyIGD(data).then(res => {
                    resolve(res);
                }).catch(err => {
                    if (err.response.status == 400) {
                        reject(err);
                    }
                })
            });
        },
        getRecipeContent: (c, params) => {
            return Promise.all( [
                recipe.getRecipeContent(params),
                recipe.getRecipeIngredient(params)
            ])
            .then( (ress) => {
                ress = ress.map( ress => ress.data )
                console.log("RecipeContent",ress)
                return ress
            })
        },
        // getRecipeContent: (c, params) => {
        //     return recipe.getRecipeContent(params).then(res => {
        //         console.log("RecipeContent",res.data)
        //         return res.data
        //     })
        // },
        // getRecipeIngredient: ({ commit }, params) => {
        //     return recipe.getRecipeIngredient(params).then( res => {
        //         commit('setIngredient', res.data)  
        //         return res.data
        //     })
        // },
        getSearchKeyword: ({ commit }, data) => {
            commit('setSearchKeyword', data)  
        },
        getType: ({ commit }, data) => {
            commit('setType', data)  
        },
        
    },
    getters: {
        recipesGetter: (state) => {
            return state.recipes || {}
        },
        foodtypeGetter: (state) => {
            return state.foodtype || {}
        },
        ingredientGetter: (state) => {
            return state.ingredient || {}
        },
        cuisineGetter: (state) => {
            return state.cuisine|| {}
        },
        diettypeGetter: (state) => {
            return state.diettype || {}
        },
    }
}

export default Recipe