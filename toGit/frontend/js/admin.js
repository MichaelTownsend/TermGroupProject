const urlWebsit = "https://mtown.online/group/v2/";
let parentDiv = document.getElementById('table');
parentDiv.className = "parentDiv";
let myJson = JSON.stringify([{type:"name"}]);
getData = () =>{
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST",urlWebsit,true);
    xhttp.send(myJson);
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            let dataServer = JSON.parse(this.responseText);
            for(let index =0; index < dataServer.length; index++){
                parentDiv.appendChild(makeDiv(dataServer[index].id," "+dataServer[index].name));
                document.getElementById("n"+dataServer[index].id).onclick = function() {deleteE(dataServer[index].id)};
            }
        }
    }
}
makeDiv = (idNum,text) =>{
    let myDiv = document.createElement('div');
    console.log("n"+ idNum)
    myDiv.id = "n" + idNum;
    myDiv.appendChild(addButton("Delete",idNum));
    myDiv.innerHTML+=text; 
    document.getElementById("")
    return myDiv;
};
addButton=(button,num)=>{
    let para = document.createElement('button');
    para.type = "button";
    para.id = "delete"+num;
    para.innerText = button;
    return para;

};
deleteE=(num)=>{
    document.getElementById("n"+num).remove();
    let myObj = {
        id: num,
    }
    let myJson = JSON.stringify(myObj);
    callServer(myJson,'DELETE');
    console.log("sending delete request");    
};
callServer = (myJson,type) =>{
    const xhttp = new XMLHttpRequest();
    xhttp.open(type,urlWebsit,true);
    xhttp.setRequestHeader('Content-Type', 'text/html');
    xhttp.send(myJson);
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText) ;
        }
    };
};
getData();