<template>
    <div class="selector-wrap">
        <div class="selector" @click="toggle()" @blur="blur()">
            <div class="label" >
                    <span>{{ value? value:label }}</span>
            </div>
            <div class="arrow" :class="{ expanded : visible }"></div>
            <div :class="{ hide : !visible, visible}" class="option-wrap">
                <div class="option-group"
                    v-for="(itemGroup, key, idx) in List"
                    :key="key">
                    <p :class="{'hide': key === 'noGroup'}">{{itemGroup[0][optGroup.by]}}</p>
                    <ul>
                        <li v-for="(opt, index) in itemGroup"
                            :key="idx+'-'+index"
                            :class="{ current : opt[listKey] === value }"
                            @click="select(opt[listKey])">
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
            type: Object,

        },
        optGroup: {
            type: Object,
        }
    },
    created(){
        if(this.selected.status){
            this.value = this.selected.value
        }
    },
    computed:{
        List() {
            if(this.optGroup.status){
                console.log('List', this.dataList)
                console.log('List', this.optGroup.by)
                console.log('List',this.groupBy(this.dataList, this.optGroup.by))
                return this.groupBy(this.dataList, this.optGroup.by)
            }else{
                let ListObj = {
                                noGroup: this.dataList
                            }
                return ListObj
            }
        },
        label() {
            if(this.selected.status){
                return this.selected.value
            }else if(!this.selected.status && this.selected.value){
                return this.selected.value
            }else{
                return "Please select..."
            }
        },
    },
    methods: {
        toggle() {
            this.visible = !this.visible;
        },
        select(option) {
            this.$el.setAttribute("current", option);
            this.value = option;
        },
        blur() {
            this.visible = !this.visible;
        }
    }
}
</script>

<style lang="scss" scoped>
    .selector{
        &-wrap{
            position: relative;
        }
        .arrow {
				position: absolute;
				right: 10px;
				top: 40%;
				width: 0;
				height: 0;
				border-left: 7px solid transparent;
				border-right: 7px solid transparent;
				border-top: 10px solid #888;
				transform: rotateZ(0deg) translateY(0px);
				transition-duration: 0.3s;
				transition-timing-function: cubic-bezier(.59,1.39,.37,1.01);
		}
        .expanded {
            transform: rotateZ(180deg) translateY(2px);
        }
        .option-wrap {
            border: 1px solid $primary-g;
            position: absolute;
            z-index: 999;
            background: $primary-g-extra;
            width: 100%;
            ul {
                li {
                    &:hover, &.current{
                        background-color: #ffffff90;
                    }
                }
            }
        }
    }
</style>