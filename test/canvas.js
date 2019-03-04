function init(){
    stage = new createjs.Stage("canvas")
    if(createjs.Touch.isSupported() == true) createjs.Touch.enable(stage)

    window.addEventListener("resize", handleResize);
    handleResize(); 
}

function handleResize(event) {
    stage.canvas.width = window.innerWidth
    stage.canvas.height = window.innerHeight
    stage.update();
}


function setDetails(Geometry,scaleX=1.0,scaleY=1.0,alpha=1.0,ratation=0,visible=true){
    Geometry.scaleX = scaleX
    Geometry.scaleY = scaleY
    Geometry.alpha = alpha
    Geometry.ratation = ratation
    Geometry.visible = visible
}

function drawShape(color="black",x=0,y=0,radius=10,alpha=1.0,ratation=0,scaleX=1.0,scaleY=1.0,visible=true){
    const Shape = new createjs.Shape()
    Shape.graphics.beginFill(color)
    Shape.graphics.drawCircle(x,y,radius)
    setDetails(Shape,scaleX,scaleY,alpha,ratation,visible)
    stage.addChild(Shape)
    stage.update()
}
/*
function main(){
    drawShape("blue",200,200,100)
    drawShape("red",200,400,100)
}
*/

function drawCircle(){
    const Circle = new createjs.Shape()

    const fillColor = "#ffcc00"
    Circle.graphics.beginFill(fillColor)

    const [strokeColor,width] = ["green",5]
    Circle.graphics.beginStroke(strokeColor)
    Circle.graphics.setStrokeStyle(width)

    const [x,y,radius] = [0,0,100]
    Circle.graphics.drawCircle(x,y,radius)

    const [newX,newY] = [100,100]
    Circle.x = newX
    Circle.y = newY

    const angle = 90
    Circle.rotation = angle

    const alpha = 0.7
    Circle.alpha = alpha

    const visible = true
    Circle.visible = visible

    const [scaleX,scaleY] = [1.0,1.0]
    Circle.scaleX = scaleX
    Circle.scaleY = scaleY

    Circle.graphics.endFill()
    Circle.graphics.endStroke()
    stage.addChild(Circle)
}

function drawRect(){
    const Rect = new createjs.Shape()

    const fillColor = "#114514"
    Rect.graphics.beginFill(fillColor)

    const [x,y,width,height] = [100,300,200,100]
    Rect.graphics.drawRect(x,y,width,height)

    Rect.graphics.endFill()
    stage.addChild(Rect)
}

function drawRoundRect(){
    const RoundRect = new createjs.Shape()

    const fillColor = "#810931"
    RoundRect.graphics.beginFill(fillColor)

    const [x,y,width,height,edgeWidth,edgeHeight] = [100,100,200,100,20,10] 
    RoundRect.graphics.drawRoundRect(x,y,width,height,edgeWidth,edgeHeight)

    RoundRect.graphics.endFill()
    stage.addChild(RoundRect)
}

function drawStar(){
    const Poly = new createjs.Shape()

    const fillColor = "red"
    Poly.graphics.beginFill(fillColor)

    const [x,y,radius,vertex,deepness,statingAngle] = [100,80,75,5,0.6,-90]
    Poly.graphics.drawPolyStar(x,y,radius,vertex,deepness,statingAngle)

    Poly.graphics.endFill()
    stage.addChild(Poly)
}

function drawSigma(){
    const Sigma = new createjs.Shape()

    Sigma.graphics.beginStroke("black")
    Sigma.graphics.setStrokeStyle(5)

    Sigma.graphics.moveTo(490,100)
    Sigma.graphics.lineTo(400,100)
    Sigma.graphics.lineTo(450,150)
    Sigma.graphics.lineTo(400,200)
    Sigma.graphics.lineTo(490,200)

    Sigma.graphics.endStroke()
    stage.addChild(Sigma)
}

function drawText(){
    const [strings, font, fontColor] = ["Hello World!","24px serif","DarkRed"]
    const Text = new createjs.Text(strings,font,fontColor)

    const newText = "Hello Create.js!"
    Text.text = newText

    Text.x = 100
    Text.y = 500

    const [aline,baseLine] = ["start","top"]
    Text.textAlign = aline
    Text.textBaseline = baseLine

    stage.addChild(Text)
}

function renderImage(){
    const Image = new createjs.Bitmap("../images/ugis.jpg")
    stage.addChild(Image)

    createjs.Ticker.on("tick", () => {
        stage.update();
    })
}

function Click(){
    const Container = new createjs.Container();
    Container.x = 0;
    Container.y = 100;
    stage.addChild(Container)

    const redCircle = new createjs.Shape()
    redCircle.graphics.beginFill("DarkRed").drawCircle(400,300,50)
    redCircle.graphics.endFill()

    const blueCircle = new createjs.Shape()
    blueCircle.graphics.beginFill("Blue").drawCircle(400, 400, 10);
    blueCircle.graphics.endFill()

    Container.addChild(redCircle)
    Container.addChild(blueCircle)

    createjs.Ticker.timingMode = createjs.Ticker.RAF
    createjs.Ticker.addEventListener("tick",handleTick)
    createjs.Ticker.addEventListener("tick",stage)
    redCircle.addEventListener("click", handleRedClick);
    

    let x = 0
    function handleTick(){
        Container.y = 200*Math.sin(x++/25*Math.PI)
        Container.x = 200*Math.cos(x/25*Math.PI)
    }

    function handleRedClick(event) {
        Container.removeChild(redCircle);
    }
}

function Mouse(){
    const Circle = new createjs.Shape()
    Circle.graphics.beginFill("green")
    Circle.graphics.drawCircle(0,0,50)

    stage.addChild(Circle)

    createjs.Ticker.timingMode = createjs.Ticker.RAF
    createjs.Ticker.addEventListener("tick",handleTick)
    createjs.Ticker.addEventListener("tick",stage)

    function handleTick(){
        Circle.x = stage.mouseX
        Circle.y = stage.mouseY
    }
}

function hitTest(){
    const Inyou = new createjs.Bitmap("../images/inyou.png")
    Inyou.x = 400
    Inyou.y = 200
    Inyou.regX = 200
    Inyou.regY = 200
    Inyou.scale = 0.5
    stage.addChild(Inyou)

    createjs.Ticker.timingMode = createjs.Ticker.RAF
    createjs.Ticker.addEventListener("tick",stage)
    createjs.Ticker.addEventListener("tick",handleTick)

    let angle = 0
    function handleTick(){
        

        const point = Inyou.globalToLocal(stage.mouseX,stage.mouseY)
        const isHit = Inyou.hitTest(point.x,point.y)

        if(isHit) {
            Inyou.rotation = angle
            angle = (angle + 1) % 360
        }
    }
}

function Drag(){

    const ball = new createjs.Shape()
    ball.graphics.beginFill("green").drawCircle(0,0,50)
    stage.addChild(ball)

    createjs.Ticker.timingMode = createjs.Ticker.RAF
    createjs.Ticker.addEventListener("tick",stage)
    ball.addEventListener("mousedown", handleDown)
    ball.addEventListener("pressmove", handleMove)
    ball.addEventListener("pressup", handleUp)
    
    let dragPointX,dragPointY
// ボールを押したときの処理です
    function handleDown(event) {
        ball.scale = 1.1
        dragPointX = stage.mouseX - ball.x
        dragPointY = stage.mouseY - ball.y
    }

// ボールを押した状態で動かしたときの処理です
    function handleMove(event) {
        ball.x = stage.mouseX - dragPointX
        ball.y = stage.mouseY - dragPointY

    }

// ボールからマウスを離したときの処理です
    function handleUp(event) {
        ball.scale = 1.0
    }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function trackGame(){
    const circle = new createjs.Shape()
    const width = window.innerWidth - 100
    const height = window.innerHeight - 100
    const speed = [1000,2000,3000]
    const scoreText = new createjs.Text("","36px sans-serif","black")
    let radius = 100
    let score = 0

    circle.graphics.beginFill("blue").drawCircle(0,0,radius)
    circle.x = width / 2
    circle.y = height / 2
    circle.scale = 1.0

    stage.addChild(circle)
    stage.addChild(scoreText)

    createjs.Ticker.timingMode = createjs.Ticker.RAF
    createjs.Ticker.addEventListener("tick",handleTick)

    function handleTick(){
        const point = circle.globalToLocal(stage.mouseX,stage.mouseY)
        const isHit = circle.hitTest(point.x,point.y)

        if(isHit && radius >= 10) {
            circle.graphics.clear().beginFill("DarkRed").drawCircle(0,0,radius -= 0.5)
            score += Math.floor(100 / radius) * 10
        }
        else if(radius <= 100) {
            circle.graphics.clear().beginFill("blue").drawCircle(0,0,radius += 0.5)
        }

        scoreText.text = "Score : " + score.toString()
        stage.update()
    }

    function Tween(){
        createjs.Tween.get(circle)
            .to({x: getRandomInt(100,width), y: getRandomInt(100,height)}, speed[getRandomInt(0,3)])
            .call(Tween)
    }
    Tween()
}

var stage
window.addEventListener("load",main)

function main(){
    init()
    trackGame()
}
    