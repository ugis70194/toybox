
var main = new Vue({
    el: '#main',
    data: {
        show: false,
        res: ['大吉','大吉','末吉','末吉','末吉','吉','吉','凶','凶'],
        num: 0,
        tweet: 'https://twitter.com/intent/tweet?hashtags=うぐいすのおみくじ&text=私の運勢は'+this.res[this.num]+'でした！&url='
    },
    methods: {
        choose: function() {
            this.show = !this.show
            if(this.show) {
                this.num = Math.ceil(Math.random()*9-1)
                this.tweet = 'https://twitter.com/intent/tweet?hashtags=うぐいすのおみくじ&text=私の運勢は'+this.res[this.num]+'でした！&url='
            }
        },
    }
})


