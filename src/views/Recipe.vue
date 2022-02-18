<template>
	<div class="recipe-box">
		<h1 class="section-title main">Recipe</h1>
		<section class="recipe-drag-wrap" ref="drag-tag">
			<drag @searchResult="passResult" @resetDrag="resetDrag" :ingredientData="ingredientData" :key="dragKey" />
		</section>
		<RecipeList v-if="searchResult.status"
			:recipeList="searchResult.recipes"
			>
			<h2 ref="result-tag"  class="section-title">Recipes Search Results:</h2>
			<h4>You got <span>{{searchResult.recipes.length}}</span> Recipes</h4>
			<template v-slot:backTo>
				<a class="back_to" @click="scrollPageTo('drag-tag')"><h4>Back to <span>Search</span></h4></a>
			</template>
		</RecipeList>
		<section class="recipe-catalog-wrap">
			<div v-for="(catalog, key) in catalogs" :key="key" :class="key"
				class="recipe-catalog-group">
				<div class="recipe-catalog-group-title-wrap"
					:style="bgImg( key+`-title.jpg`)">
					<h2 class="recipe-catalog-group-title" >{{ catalogs[key].title }}</h2>
				</div>

				<router-link v-for="(item, index) in catalogs[key].data"
					:to="`/recipe/catalog/${key}/${item.itemID}/${item.item}`"
					:key="item.Uniq_name"
					:class="[cataStyle(index)]"
					:style="bgImg( key+`-`+item.itemID+`.jpg`)"
					class="recipe-catalog"
					@click="scrollPageTo('recipe-catalog-tag')"
					>
					<p class="recipe-catalog-item">
						{{item.item}}
					</p>
				</router-link>
			</div>
		</section>
		<router-view
			:key="$route.params.itemID"
			ref="recipe-catalog-tag">
		</router-view>
	</div>
</template>

<script>
import Drag from '@/components/recipe/Drag.vue';
import RecipeList from '@/components/recipe/RecipeList.vue';

export default {
	name: 'Recipe',
	components: {
		Drag,
		RecipeList,
	},
	data:() => {
		return {
			catalogs:{
				cuisine: {
					data:{},
					title: "Cuisine",
				},
				diettype: {
					data:{},
					title: "Diet"
				}
			},
			ingredientData: [],
			searchResult: {
				status: false,
				recipes: []
			},

			dragKey: 0
		}
	},
	created: async function() {
		for (let key in this.catalogs) {
			this.catalogs[key].data = await this.getCatalog({
													table: key ,
													keyword: "all"})
		}
		this.ingredientData = await this.getIngredient({
												table: "Ingredient" ,
												keyword: "all",
												order: "foodtype"})
    },
	updated: function(){
		if(this.searchResult.status){
			this.scrollPageTo("result-tag")
		}

	},
	methods: {
		async searchCatalog(table) {
			return await this.getCatalog({
			table: table,
			keyword: "all"})
		},
		cataStyle(i){
			if(i==0||(i%4)==0||i==1||(i%4)==1)
				return "w-1x"
			else
				return "w-2x"
		},
		passResult(res) {
			if(res.status === 201){
				this.searchResult.status = true
				this.searchResult.recipes = res.data
			}
			console.log("res", res)
			console.log("recipe result", this.searchResult)
		},
		resetDrag(result) {
			this.searchResult.recipes = result
			this.searchResult.status = false
			this.dragKey += 1
		},
	},
}
</script>

<style lang="scss">
	.recipe-catalog-wrap {
		@media only screen and (max-width: 600px) {
			width: calc(100% - 100px);
			margin-left: 100px;
			.recipe-catalog {
				width: calc(50% - 10px);
			}
		}
		a {
			display: block;
		}
		margin-top: 30px;
		border: 2px solid $primary-g;
		border-radius: 3vw;
		overflow: hidden;
		width: calc(100% - 220px);
		padding: 5px;
		.recipe-catalog-group-title-wrap {
			width: 100%;
			height: 100px;
			background-position: center;
			background-size: cover;
		}
		.recipe-catalog-group {
			width: 100%;
			@extend .flex;
			justify-content: flex-start;
		}
	}
	.recipe-catalog {
		border-radius: 10px;
		background-position: center;
		background-size: cover;
		width: calc(25% - 10px);
		margin: 5px;
		position: relative;
		&.w-1x {
			@include psuedo-height($height: 100%);
		}
		&.w-2x {
			width: calc(50% - 10px);
			@include psuedo-height($height: 50%);
		}

		&-item{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: white;
			font-weight: 900;
			filter: drop-shadow(0 0 2px #000000);
			font-size: 1.5rem;
			line-height: 1.5rem;
		}
	}
</style>