<template>
	<div class="home-box">
		<section class="catalog">
			<h1 class="section-title main">Recipe Catalog</h1>
			<div class="catalog-left" @click="searchRecipe(cuisine[2].item, 'viewtimes', 'desc', 'recipe_catalog', ['cuisine',3])"></div>
			<div class="catalog-right">
				<div class="catalog-right-top-1" @click="searchRecipe(diettype[1].item, 'viewtimes', 'desc', 'recipe_catalog', ['diettype',2])"></div>
				<div class="catalog-right-top-2" @click="searchRecipe(diettype[2].item, 'viewtimes', 'desc', 'recipe_catalog', ['diettype',3])"></div>
				<div class="catalog-right-bottom" @click="searchRecipe(cuisine[1].item, 'viewtimes', 'desc', 'recipe_catalog', ['cuisine',2])"></div>
			</div>
		</section>
		<RecipeList :recipeList="homeRecipes">
			<h2 class="section-title">TOP popular Recipes</h2>
		</RecipeList>
		<section class="about-wrap">
			<h2 class="section-title">About me</h2>
			<p>
				An application which helps people manage their kitchen, which means to manage their stock of food, seasoning, kitchenware. As well as provide recipes which listed prerequisite ingredients. The main idea is like this, when I want to have specific cuisine at night, I can just check on the app which tells me what food and season I have, and what things I need to purchase.
			</p>
		</section>
	</div>

</template>

<script>
// @ is an alias to /src
import RecipeList from '@/components/recipe/RecipeList.vue';
export default {
	name: 'Home',
	data:() => {
		return {
			homeRecipes: [],
		}
	},
	components: {
		RecipeList
	},
	created: async function() {
		this.homeRecipes = await this.getRecipes({
										keyword: "all",
										order: "viewtimes",
										sort: "desc"})
		this.homeRecipes = this.homeRecipes.slice(0,8)
    },
	computed: {

	},
	methods: {

	},
	watch: {
    }
}
</script>

<style lang="scss">
	.home-box {

		@media only screen and (max-width: 600px) {
			.catalog {
				&-left, &-right {
					width: 100% !important;
				}
			}
		}
		.catalog {

			div{
				border-radius: 5vw;
				float: left;
				&:after {content: "";   display: block;   padding-bottom: 100%; }

			}
			width: calc( 100% - 200px );
			&-left, &-right {
				width: 50%;
			}
			&-left {
				background: url(./../img/home/taiwanese.jpg) no-repeat center center/auto 100% ;
			}
			&-right {
				&-top {
					&-1, &-2 {
						width: 50%;
					}
					&-1 {
						background: url(./../img/home/keto.jpg) no-repeat center center/auto 100% ;
					}
					&-2 {
						background: url(./../img/home/vegan.jpg) no-repeat center center/auto 100% ;
					}
				}
				&-bottom {
					width: 100%;
					height: 100%;
					&:after { padding-bottom: 50% !important; }
					background: url(./../img/home/japanese.jpg) no-repeat center center/auto 100% ;
				}
			}
		}

		.about-wrap {
			min-height: 300px;
			background-color: $primary-y;
			padding: 20px 100px;
			p{
				text-align: left;
				color: $primary-g-dark;
				filter: brightness(0.7);
			}
		}
	}
</style>
