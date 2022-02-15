<template>
    <div class="selector-wrap">
        <div class="selector" @click="toggle()" @blur="blur()">
            <div class="label" >
                    <span>{{ value? value:label }}</span>
            </div>
            <div class="arrow" :class="{ expanded : visible }"></div>
            <div :class="{ hide : !visible, visible}" class="option-wrap">
                <div class="option-group"
                    v-for="(optGroup, key, idx) in List"
                    :key="key">
                    <p :class="{'hide': key === 'noGroup'}">{{key}}</p>
                    <ul>
                        <li v-for="(opt, index) in optGroup"
                            :key="idx+'-'+index"
                            :class="{ current : opt[listKey] === value || opt[listKey] === label }"
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

    },
    computed:{
        List() {
            if(this.optGroup.status){
                // console.log('List',this.groupBy(this.dataList, this.optGroup.by))
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
            }else if(!this.selected.status && this.dataLabel){
                return this.dataLabel
            }else{
                return "Please select..."
            }
        }
    },
    methods: {
        toggle() {
            this.visible = !this.visible;
        },
        select( option ) {
            console.log("child-e", this.$attrs)
            this.$attrs[`editLocation-25`] = option
            console.log("child-e", this.$attrs)
            this.value = option;
            this.$emit('custom-select', option)
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