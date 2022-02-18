<template>
	<div class="recipe-catalog-box" >
		<div :style="bgImg( this.category+`-`+this.itemID+`.jpg` )"
			class="recipe-catalog page">
			<p class="recipe-catalog-title">
				{{searchKeywordData}}
			</p>
		</div>
		<RecipeList
			:recipeList="recipesGetter"
			>
			<!-- <h2 ref="resultTag"  class="section-title">Recipes Search Results:</h2> -->
			<h4>You got <span>{{recipes.length}}</span> Recipes</h4>
			<template v-slot:backTo>
				<a class="back_to" @click="$router.go(-1)"><h4>Back to <span>Last page</span></h4></a>
			</template>
		</RecipeList>
	</div>
</template>

<script>
import RecipeList from '@/components/recipe/RecipeList.vue';

export default {
	name: 'Recipe_Catalog',
	components: {
		RecipeList,
	},
	data() {
		return {
			getSearchResult: false,
			dragKey: 0,
			category: this.$route.params.category,
			itemID:  this.$route.params.itemID,
			item: this.$route.params.item
			//type: this.$route.params,
		}
	},
	created: async function() {
		// this.category = await this.$route.params.category;
		// this.itemID = await this.$route.params.itemID;
		// this.item = await this.$route.params.item;

		await this.getRecipes({
                keyword: this.$route.params.item,
                order: "viewtimes",
				sort: "desc"
            }).then(() => {
				this.getGerchResult = true
			})
    },
	updated: function(){

	},
	computed: {
		bgName() {
			return this.category+`-`+this.itemID+`.jpg`
		},
		recipeKeyword() {
			console.log("this.$route.params",this.$route.params.catagory)
			console.log("this.$route.params",this.$route.params.itemID)
			console.log("this.$route.params",this[`${this.$route.params.catagory}`][`${this.$route.params.itemID}`])
			return this[`${this.$route.params.catagory}`][`${this.$route.params.itemID}`]
		}
	},
	methods: {

	},
}
</script>

<style lang="scss">
	.recipe-catalog {
		&.page{
			width: calc( 100% - 220px);
			height: 100px;
			margin: 3vw auto;
		}

		background-position: center;
		background-size: cover;
		border-radius: 1.5vw;
		position: relative;
		&-title{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: white;
			font-weight: 900;
			filter: drop-shadow(0 0 2px #000000);
			font-size: 2rem;
			line-height: 1.5rem;
		}
	}
</style>