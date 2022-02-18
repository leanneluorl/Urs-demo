<template>
    <RecipeList v-if="recipesGetter"
        :recipeList="recipesGetter"
        >
        <h2 ref="resultTag"  class="section-title">Recipes Search Results:</h2>
        <!-- <h4>You got <span>{{searchResult.recipes.length}}</span> Recipes</h4>
        <template v-slot:backTo>
            <a class="back_to" @click="scrollPageTo('dragTag')"><h4>Back to <span>Search</span></h4></a>
        </template> -->
    </RecipeList>
</template>

<script>
export default {
    created() {
        console.log("recipe search: ", this.recipesGetter)
    }
}
</script>

<style>

</style>