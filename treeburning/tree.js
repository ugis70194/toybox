const mixin = {
    data : function(){
        return {
            isBurning : false
        }
    },
    computed : {
        TreeState : function() {
            return {
                'notburning' : !this.isBurning,
                'font-effect-fire-animation' : this.isBurning,
            }
        }
    },
    methods : {
        TreeBurning : function() {
            if(this.isBurning) return 
            this.isBurning = true
            this.$emit('increment')
        }
    },
}

const Tree = {
    mixins : [mixin],
    template : `<div @click='TreeBurning' class='tree' :class='TreeState'>🌲</div>`,
}
const House = {
    mixins : [mixin],
    template : `<div @click='TreeBurning' class='tree' :class='TreeState'>🏡</div>`,
}
const Cow = {
    mixins : [mixin],
    template : `<div @click='TreeBurning' class='tree' :class='TreeState'>🐮</div>`,
}

var app = new Vue({
    el : "#app",
    data : {
        trees : [{id : 'tree1'}],
        houses : [{id : 'house1'}],
        cows : [{id : 'cow1'}],
        BurningCount : 0,
        sum : 3
    },
    components : {
        Tree : Tree,
        House : House,
        Cow : Cow,
    },
    methods : {
        GrowTree : function(){
            this.trees.push({id : 'tree' + (this.trees.length+1).toString()})
            ++this.sum
        },
        Buildhouse : function(){
            this.houses.push({id : 'house' + (this.houses.length+1).toString()})
            ++this.sum
        },
        GenerateCow : function(){
            this.cows.push({id : 'cow' + (this.cows.length+1).toString()})
            ++this.sum
        },
        IncrementBurningCount : function(){
            if(this.BurningCount >= this.sum) return
            ++this.BurningCount
        } 
    }
})
