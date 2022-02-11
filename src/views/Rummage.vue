<template>
    <div class="rummage-box">
        <h1 class="section-title main">Rummage</h1>
		<section class="recipe-drag-wrap" ref="dragTag">
			<DragRM @searchResult="passResult" @resetDrag="resetDrag" :ingredientData="userIngredientStockData" :key="dragKey" />
		</section>
		<RecipeList v-if="serchResultRecipes.length"
			:recipeList="serchResultRecipes"
			>
			<h2 ref="resultTag"  class="section-title">Recipes Search Results:</h2>
			<h4>You got <span>{{serchResultRecipes.length}}</span> Recipes</h4>
			<template v-slot:backTo>
				<a class="back_to" @click="scrollPageTo('dragTag')"><h4>Back to <span>Search</span></h4></a>
			</template>
		</RecipeList>
    </div>
</template>

<script>
import DragRM from '@/components/function/DragRM.vue';
import RecipeList from '@/components/recipe/RecipeList.vue';
export default {
    name: 'Recipe',
	components: {
		DragRM,
		RecipeList,
	},
	data:() => {
		return {
            userIngredientStockData: [],
            serchResultRecipes: {},
			serchResultStatus: false,
			dragKey: 0
        }
    },
    created: async function() {

		this.userIngredientStockData = await this.getUserStockIGD({
												userID: this.userID })
    },
	updated: function(){
		if(this.serchResultRecipes.length){
			this.scrollPageTo("resultTag")
		}

	},
    methods: {
        passResult(res) {
            if(res.status === "201"){
                this.serchResultStatus = true
            }
            this.serchResultRecipes = res.data
        },
        resetDrag(result) {
            this.serchResultRecipes = result
            this.dragKey += 1
        }
    }
}
</script>

<style lang="scss">
    .rummage-box {
        @media only screen and (max-width: 600px) {
			width: calc(100% - 100px);
			margin-left: 100px;
		}
		border: 2px solid $primary-g;
		border-radius: 3vw;
		overflow: hidden;
		width: calc(100% - 220px);
        margin: 30px auto;
    }

</style>