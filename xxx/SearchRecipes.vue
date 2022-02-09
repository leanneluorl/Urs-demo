<template>
    <html>
        <slot></slot>
    </html>
</template>

<script>
import { mapActions, mapState} from 'vuex'

export default {
    name: "Recipes",
    components: {},
    data: () => {
        return {
            rescipeLists: {},
        }
    },
    mounted() {
    },
    methods: {
        ...mapActions('Recipes', ['getRecipes']),
        getRecipesData() {
            this.getRecipes({
                keyword: "Lasagna",
                order: "viewtimes",
                sort: "desc"
            })
        },
    },
    computed: {
        ...mapState('Recipes', ['recipes']),
    },

}
</script>

<style>
    button {
        width: 100px;
        height: 50px;
    }
</style>