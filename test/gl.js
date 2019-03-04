var GL

function start() {
    console.log("start")
    var canvas = document.getElementById("glcanvas")
    GL = initWebGL(canvas)

    if(GL){
        GL.clearColor(0.0,0.0,0.0,1.0)
        GL.enable(GL.DEPTH_TEST)
        GL.depthFunc(GL.LEQUAL)
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT)
    }

    main()
}

function initWebGL(canvas) {
    console.log("init")
    GL = null

    try{ GL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") }
    catch(e){}

    if(!GL) {
        alert("error! this browser not supportd")
        GL = null
    }

    return GL
}

function main(){
    console.log("main")
    GL.viewport(0,0,960,640)
}
