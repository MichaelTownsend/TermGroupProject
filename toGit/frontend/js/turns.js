const urlWebsit = "https://mtown.online/group/v2/";
let parentDiv = document.getElementById('table');
parentDiv.className = "parentDiv";
let myJson = JSON.stringify([{type:"turns"}])
getData = () =>{
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST",urlWebsit,true);
    xhttp.send(myJson);
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            let dataServer = JSON.parse(this.responseText);
            for(let index =0; index < dataServer.length; index++){
                parentDiv.appendChild(makeDiv(dataServer[index].nameId," "+dataServer[index].turns));
            }
            getData2()
        }
    }
}
getData2 = ( ) =>{
    let myJson = JSON.stringify([{type:"name"}])
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST",urlWebsit,true);
    xhttp.send(myJson);
    xhttp.onreadystatechange = function (){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let dataServer = JSON.parse(this.responseText);
            for(let index =0; index < dataServer.length; index++){
                let someData = document.getElementsByClassName("n"+dataServer[index].id);
                for(let index2 = 0; index2 < someData.length; index2++){
                    someData[index2].innerText =dataServer[index].name +" " + someData[index2].innerHTML;
                }
                document.getElementsByClassName("n"+dataServer[index].id).innerHTML += dataServer[index].name;
            }
        }
    }
}
makeDiv = (idNum,text,) =>{
    let myDiv = document.createElement('div');
    console.log("n"+ idNum)
    myDiv.classList.add("n" + idNum); 
    myDiv.innerHTML+=text; 
    document.getElementById("")
    return myDiv;
}
getData()