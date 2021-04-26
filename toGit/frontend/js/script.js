window.onload=() => {
    server();
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    updateHtmlText(JSON.parse(localStorage.getItem("name")).name,"userName");
    document.addEventListener("keydown",keyPush);
    setInterval(game,1000/15);
}
//object
px=py=5;
//how big objects of the board are and also how many squars there are
gs=tc=20;
//candy
ax=ay=15;
xv=0;
yv=1;
trail=[];
tail = 5;
score = 0;
gameState= "starting";
highScore = 0;
currntTime = 0;
deathTime = 0;
turns = 0;
let id = 0;
const urlWebsit = "https://mtown.online/group/v2/";
server = () =>{
    let getData = false;
    let getData2 = true;
    const xhttp = new XMLHttpRequest();
    let url = urlWebsit+"?name="+JSON.parse(localStorage.getItem("name")).name+"&type=select";
    xhttp.open("GET",url,true);
    xhttp.send();
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.response);
            let myJson = JSON.parse(this.responseText);
            if(myJson[0]== null && getData == false && id == 0){
                url = urlWebsit+"?name="+JSON.parse(localStorage.getItem("name")).name+"&type=insert";
                xhttp.open("GET",url,true);
                xhttp.send();
                //updateHtmlText( document.getElementById("highScore").innerHTML + " 0","highScore");
                getData = true;
                server();
            }else if(getData2){
                url = urlWebsit+"?id="+myJson[0].id+"&type=highScore";
                id = myJson[0].id;
                console.log();
                xhttp.open("GET",url,true);
                xhttp.send();
                getData2 = false;
            } else if(myJson[0].score != null){
                updateHtmlText( document.getElementById("highScore").innerHTML + " "+myJson[0].score,"highScore");
                highScore = myJson[0].score;
                if(myJson[0].id){
                    id = myJson[0].id;
                }
            }
            
        }else if(this.readyState == 4 && this.status == 500){
            console.log(this.response);
        }
    };
};

game = () => {  
    if(gameState == "starting"){
        drawBackGround("blue");
    }else if(gameState == "running"){
        updateP();
        drawBackGround("black");
        
        drawPlayer("lime");
        
        hitWall();
        //then sets another location for a new candy
        resetCandy();
        //draws the candy
        drawCandy("red");
        draw("blue",px*gs,py*gs,gs-2,gs-2);
    }else if(gameState == "death"){
        drawBackGround("lime");
        if(highScore< score){
            highScore = score;
            updateHighScore();
            document.getElementById("highScore").innerHTML = "High Score: "+ highScore;
        }
        gameState ="starting";
    }
    
}

//resets when hit the wall
hitWall = () =>{
    if(px<0 || px>tc-1 || py<0 || py>tc-1) {
        resetPlayer();
    }
}
resetPlayer =() =>{
    px= 5;
    py= 5;
    tail = 5;
    xv=0;
    yv=1;
    deathTime = new Date();
    gameState = "death";
    addTime((deathTime - currntTime)/1000);
    addTurns();
    console.log(turns);
    turns = 0;
}
//update player
updateP = () =>{
    px+=xv;
    py+=yv;
    trail.push({x:px,y:py});
    while(trail.length>tail) {
        //removes one from the back
        trail.shift();
    }
}
//key controll
keyPush = (evt) => {
    if(gameState == "running"){
        if(evt.keyCode ==37 && xv != 1){
            xv=-1;
            yv=0;
            turns++
        }else if(evt.keyCode ==38 && yv != 1){
            xv=0;
            yv=-1;
            turns++
        }else if(evt.keyCode ==39 && xv != -1){
            xv=1;
            yv=0;
            turns++
        }else if(evt.keyCode ==40 && yv != -1){
            xv=0;
            yv=1;
            turns++
        }
    }
    
}
//sets another location for a new candy
resetCandy = () =>{
    if(ax==px && ay==py) {
        growTail();
        ax=Math.floor(Math.random()*(tc-2))+1;
        ay=Math.floor(Math.random()*(tc -2))+1;
    }
}
//grows the tail
growTail = () =>{
    tail++;
    score++;
    document.getElementById("currntScore").innerHTML = "Currnet Score: "+ score;
    trail.push({x:px,y:py})
}

draw = (color,x,y,width,height) => {
    ctx.fillStyle=color;
    ctx.fillRect(x,y,width,height);
}

//draw the background to reset board 
drawBackGround = (color) => {
    draw(color,0,0,canv.width,canv.height);
}
//draw candy
drawCandy = (color) =>{
    draw(color,ax*gs,ay*gs,gs-2,gs-2);
}
//draws the snake and also checks to see if it hit itself
drawPlayer = (color) => {
    for(var i=0;i<trail.length-1;i++) {
        draw(color,trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
        if(trail[i].x==px && trail[i].y==py) {
            resetPlayer();
        }
    }
}
updateHtmlText =(msg,id)=>{
    document.getElementById(id).innerText = msg;
}
startButton = () =>{
    if(gameState == "starting"){
        score = 0;
        gameState = "running";
        updateHtmlText("Currnt Score: "+score,"currntScore" );
        currntTime = new Date();

    }else if(gameState == "death"){
        
    }
}
addTime = (time) =>{
    talkToServer( urlWebsit+"?time="+time+"&type=addTime&id="+id,"GET")
}
addTurns = () =>{
    talkToServer(urlWebsit+"?turns="+turns+"&type=addTurns&id="+id,"GET")
}
talkToServer = (url,type,data) => {
    let xhttp = new XMLHttpRequest();
    
    xhttp.open(type,url,true);
    xhttp.send(data);
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.response);
        }
    }
}
updateHighScore = () =>{
    talkToServer(urlWebsit+"?score="+score+"&type=updateScore&id="+id,"PUT",JSON.stringify({score:score,id:id}));
}