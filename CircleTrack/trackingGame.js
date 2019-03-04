var stage
window.addEventListener("load",main)

// mainSystem
function canvasInit(){
    stage = new createjs.Stage("canvas")
    stage.enableMouseOver()
    if(createjs.Touch.isSupported() == true) createjs.Touch.enable(stage)

    window.addEventListener("resize", handleResize)
    handleResize()
}

function handleResize(event) {
    stage.canvas.width = window.innerWidth
    stage.canvas.height = window.innerHeight
    stage.update()
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

function circleTrack(){

    if(typeof circleTrack.instance === "object") return circleTrack.instance
    circleTrack.instance = this
    
    let width = null
    let height = null
    let windowWidth = null
    let windowHeight = null
    let circle = null
    let speed = null
    let radius = null
    let score = null
    let lestTime = null
    let scoreText = null
    let fontSize = null
    let lestTimeText = null
    let buttons = null
    let backGround = null
    let marginLeft = null
    let marginTop = null
    let retryButton = null
    let retryButtonLabel = null
    let shareButton = null
    let shareButtonLabel = null
    let easing = null

    function init(){

        if(!localStorage.getItem("score")){
            localStorage.setItem("score",0)
        }

        windowWidth = window.innerWidth
        windowHeight = window.innerHeight
        width = windowWidth - 100
        height = windowHeight - 100
        fontSize = windowWidth / 40
        marginLeft = windowWidth*13 / (54*9)
        marginTop = windowHeight / (1.6*23)

        score = 0
        if(scoreText === null){
            scoreText = new createjs.Text("Score : 0",fontSize + "px sans-serif","black")
            scoreText.shadow = new createjs.Shadow("#777777",5,5,5)
        }

        lestTime = 10
        if(lestTimeText === null){
            lestTimeText = new createjs.Text("",fontSize + "px sans-serif","black")
            lestTimeText.shadow = new createjs.Shadow("#777777",5,5,5)
            lestTimeText.textAlign = "center"
            lestTimeText.x = windowWidth / 2
        }
        
        radius = 100
        if(circle === null){
            circle = new createjs.Shape()
            circle.graphics.beginFill("blue").drawCircle(0,0,radius)
            circle.shadow = new createjs.Shadow("#333333",10,10,30)
            circle.x = windowWidth / 2
            circle.y = windowHeight / 2
            circle.scale = 1.0
        }
        speed = [1000,2000,3000]
        easing =[createjs.Ease.cubicIn,createjs.Ease.cubicOut,createjs.Ease.cubicInOut]

        stage.addChild(circle)
        stage.addChild(scoreText)
        stage.addChild(lestTimeText)
    }

    function addTickEventListener(){
        createjs.Ticker.timingMode = createjs.Ticker.RAF
        createjs.Ticker.addEventListener("tick",stage)
        createjs.Ticker.addEventListener("tick",hitJudge)
        createjs.Ticker.addEventListener("tick",countDown)
    }

    function isHit(){
        const point = circle.globalToLocal(stage.mouseX,stage.mouseY)
        return circle.hitTest(point.x,point.y)
    }

    function hitJudge(){
        if(isHit() && radius >= 10) {
            circle.graphics.clear().beginFill("DarkRed").drawCircle(0,0,radius -= 0.5)
            addScore()
        }
        else if(radius <= 100) {
            circle.graphics.clear().beginFill("blue").drawCircle(0,0,radius += 0.5)
        }
    }

    function addScore(){
        score += Math.floor(100 / radius) * 10
        scoreText.text = "Score : " + score.toString()
    }

    function countDown(){
        if(lestTime <= 0) {
            createjs.Ticker.removeAllEventListeners("tick")
            ending()
        }
        lestTime--
        lestTimeText.text = "残り時間 :" + Math.floor(lestTime / 60).toString()
    }

    function moveCircle(){
        createjs.Tween.get(circle)
                .to({x: getRandomInt(100,width), y: getRandomInt(100,height)}, speed[getRandomInt(0,3)], easing[getRandomInt(0,2)])
                .call(moveCircle)
    }

    function ending(){
        createBackGround(stage)
        showScore(stage)
        createButtons()
        createRetryButton(buttons)
        createShareButton(buttons)
        stage.update()
    }

    function retry(){
        stage.removeAllChildren()
        location.reload()
    }

    //UI
    function createBackGround(container){
        backGround = new createjs.Shape()
        backGround.graphics.beginFill("#cccccc").drawRoundRect(0,0,windowWidth/1.5,windowHeight/1.5,40,40)
        backGround.alpha = 0.7
        backGround.x = windowWidth / 6
        backGround.y = windowHeight / 6
        container.addChild(backGround)
    }

    function showScore(container){
        const resultFontSize = windowWidth / 40
        const your = new createjs.Text("Your Score",resultFontSize.toString() + "px sans-serif","black")
        your.shadow = new createjs.Shadow("#777777",5,5,5)
        your.textAlign = "center"
        your.x = windowWidth / 2
        your.y = windowHeight / 3.5
        container.addChild(your)
        
        const ScoreFontSize = windowWidth / 30
        const finalScore = new createjs.Text(score.toString(),ScoreFontSize.toString() + "px sans-serif","black")
        finalScore.shadow = new createjs.Shadow("#777777",5,5,5)
        finalScore.textAlign = "center"
        finalScore.x = windowWidth / 2
        finalScore.y = windowHeight / 2.5
        container.addChild(finalScore)

        const highest = localStorage.getItem("score")
        const highScore = new createjs.Text("HighScore : " + highest.toString(),resultFontSize.toString() + "px sans-serif","black")
        highScore.shadow = new createjs.Shadow("#777777",5,5,5)
        highScore.textAlign = "center"
        highScore.x = windowWidth / 3.5
        highScore.y = windowHeight / 4.5
        container.addChild(highScore)

        if(highest <= score){
            const praise = new createjs.Text("Highest!!!",resultFontSize.toString() + "px sans-serif","black")
            praise.shadow = new createjs.Shadow("#777777",5,5,5)
            praise.textAlign = "center"
            praise.x = windowWidth / 2
            praise.y = windowHeight / 2
            container.addChild(praise)
        }
    }

    function createButtons(){
        buttons = new createjs.Container()
        buttons.cursor = "pointer"
        stage.addChild(buttons)
        stage.update()
    }

    function createRetryButton(container){    
        retryButton = new createjs.Shape()
        retryButton.graphics.beginFill("#ed0fcd").drawRoundRect(0,0,width/6,height/8,width/35,height/24)
        retryButton.x = windowWidth*13 / 54 
        retryButton.y = windowHeight / 1.6
        container.addChild(retryButton)

        retryButtonLabel = new createjs.Text("もう一度",fontSize.toString() + "px sans-serif","white")
        retryButtonLabel.shadow = new createjs.Shadow("#777777",5,5,5)
        retryButtonLabel.x = (windowWidth*13 / 54) + marginLeft
        retryButtonLabel.y = windowHeight / 1.6 + marginTop
        container.addChild(retryButtonLabel)

        retryButton.addEventListener("click",retry)
        retryButton.addEventListener("mouseover", retryButtonMouseOver)
        retryButton.addEventListener("mouseout", retryButtonMouseOut)
    }

    function createShareButton(container){
        shareButton = new createjs.Shape()
        shareButton.graphics.beginFill("#1da1f2").drawRoundRect(0,0,width/6,height/8,width/35,height/24)
        shareButton.x = windowWidth*32.5 / 54 
        shareButton.y = windowHeight / 1.6
        container.addChild(shareButton)    
        
        shareButtonLabel = new createjs.Text("Tweet",fontSize.toString()+ "px sans-serif","white")
        shareButtonLabel.shadow = new createjs.Shadow("#777777",5,5,5)
        shareButtonLabel.x = (windowWidth*32.5 / 54) + marginLeft * 1.5
        shareButtonLabel.y = windowHeight / 1.6 + marginTop
        container.addChild(shareButtonLabel)

        shareButton.addEventListener("click",share)
        shareButton.addEventListener("mouseover", shareButtonMouseOver)
        shareButton.addEventListener("mouseout", shareButtonMouseOut)
    }

    function retryButtonMouseOver(){ MouseOver(retryButton,retryButtonLabel) }
    function retryButtonMouseOut(){ MouseOut(retryButton,retryButtonLabel) }
    function shareButtonMouseOver(){ MouseOver(shareButton,shareButtonLabel) }
    function shareButtonMouseOut(){ MouseOut(shareButton,shareButtonLabel) }

    function MouseOver(button,label){
        button.shadow = new createjs.Shadow("#777777",5,5,5)
        button.x -= marginLeft / 10
        button.y -= marginTop / 10
        label.x -= marginLeft / 10
        label.y -= marginLeft / 10
        stage.update()
    }

    function MouseOut(button,label){
        button.shadow = null
        button.x += marginLeft / 10
        button.y += marginTop / 10
        label.x += marginLeft / 10
        label.y += marginLeft / 10
        stage.update()
    }

    function share(){
        window.open('http://twitter.com/intent/tweet?text=CircleTrack MyScore : ' + score.toString() +
                    '&url=https://ugis70194.github.io/toybox/CircleTrack/index.html' + 
                    '&hashtags=うぐいすのおもちゃばこ'
                    ,
                    null,
                    "width=500,height=400"
                    )
    }

    init()
    addTickEventListener()
    moveCircle()
}

function main(){
    canvasInit()
    circleTrack()
}

