<template>
    <div class="selector-wrap">
        <div class="selector" @click="toggle()">
            <div class="label">
                    <span>{{ value }}</span>
            </div>
            <div class="arrow" :class="{ expanded : visible }"></div>
            <div :class="{ hidden : !visible, visible}" class="option-wrap">
                <div class="option-group"
                    v-for="(optGroup, key, idx) in List"
                    :key="key">
                    <p :class="{'hide': key === 'noGroup'}">{{key}}</p>
                    <ul>
                        <li v-for="(opt, index) in optGroup"
                            :key="idx+'-'+index"
                            :class="{ current : opt === selected }"
                            @click="select(opt)">
                        {{ opt[listKey] }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            value: '',
            visible: false,
        }
    },
    props: {
        dataLabel: {
            type: String,
            //default: () => ([]),
        },
        dataList: {
            type: Array,
        },
        listKey: {
            type: String,
        },
        selected: {
            type: Boolean,

        },
        optGroup: {
            type: Object,
        }
    },
    created(){
        console.log(this.dataLabel)
        console.log('this.dataList',this.dataList)
    },
    computed:{
        List() {
            if(this.optGroup.status){
                console.log('List',this.groupBy(this.dataList, this.optGroup.by))
                return this.groupBy(this.dataList, this.optGroup.by)
            }else{
                console.log('List',{
                    noGroup: this.dataList
                })
                return {
                    noGroup: this.dataList
                }
            }
        },
        label() {
            if(this.selected){
                return this.value
            }
            if(this.dataLabel.length){
                return this.dataLabel
            }
            return null
        }
    },
    methods: {
        toggle() {
            this.visible = !this.visible;
        },
        select(option) {
            this.value = option;
        }
    }
}
</script>

<style>

</style>