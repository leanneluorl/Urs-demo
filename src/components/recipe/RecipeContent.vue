<template>
    <div>
        recipe_content {{ }}
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            recipeContent: []
        }
    },
    created: async function(){
        this.recipeContent =  await this.getRecipeContent({
                recipeID: this.$route.params.recipeID
            })
        console.log("recipeID",this.$route.params.recipeID);
    }
}
</script>

<style>

</style>