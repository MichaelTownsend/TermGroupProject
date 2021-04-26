const url = require('url');
const http = require('http');
const mysql = require('mysql');
const db = mysql.createConnection({
    host:"localhost",
    user:"mtownonl_lab5myslq",
    password:"lab5mysql123",
    database:"mtownonl_teamTermProject",
});

const server = http.createServer(function(request, response) {
    
    console.log(request.method);
    if (request.method == 'POST') {
        let body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            let myJson = JSON.parse(body);
            console.log(myJson[0].type)
            let sql = "SELECT * FROM `"+myJson[0].type+"` WHERE 1";
            dataBaseCall(db,sql,response);
        });
    }else if(request.method == 'OPTIONS') {
        response.writeHead(200, {'Content-Type': 'text/html',"Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS","Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"})
        response.end('Options received');
    }else if(request.method =='PUT'){
        let body = '';
        request.on('data', function(data) {
            body += data;
        });
        
        request.on('end', function() {
            const q= JSON.parse(body);
            console.log(body)
                if(typeof q.id !== 'undefined' ){
                    let sql = "UPDATE `highScore` SET `score` = "+q.score+" WHERE `highScore`.`id` = "+q.id+";";
                    dataBaseCall(db,sql,response)
                }else{
                    returnClient("you are missing key for 'id' and a value for 'id'",500,response);
                }
            
        })
        
    }else if(request.method == 'GET'){
        getDB(response,request);
        
    }else if(request.method == 'DELETE'){
        let body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            let myJson = JSON.parse(body);
            console.log(myJson);
            let sql = "DELETE FROM `name` WHERE `name`.`id` ="+myJson.id ;
            dataBaseCall(db,sql,response);
        });
    }else{
        returnClient("i dont know what you want",500,response);
    }
     
}).listen();
getDB = (response,request) =>{
    const q= url.parse(request.url,true);
        console.log(q.query.name);
        if(q.query.type == "select"){
            console.log(typeof q.query.name === 'undefined')
            if(typeof q.query.name === 'undefined'){
                let sql = "SELECT * FROM `name`";
                dataBaseCall(db,sql,response);
            }else{
               let sql = "SELECT * FROM `name` WHERE '"+q.query.name+"' = `name`";
                dataBaseCall(db,sql,response); 
            }
        }else if( q.query.type == "insert"){
            console.log(q.query.name !== 'undefined' );
            if(typeof q.query.name !== 'undefined' ){
                let sql = "INSERT INTO `name` (`id`, `name`) VALUES (NULL, '"+q.query.name+"')";
                db.query(sql,function (err,result){
                    let sql = "SELECT * FROM `name` WHERE '"+q.query.name+"' = `name`";
                    db.query(sql,function (err,result){
                        let myJson = JSON.stringify(result)
                        myJson = JSON.parse(myJson);
                        let sql = "INSERT INTO `highScore` (`id`, `score`) VALUES ('"+myJson[0].id+"', '"+0+"');";
                        dataBaseCall(db,sql,response);
                    });
                });  
            }else {
                returnClient("you are missing key for 'name' and a value for 'name'",500,response);
            }
              
        }else if(q.query.type == "highScore"){
            if(typeof q.query.id !== 'undefined' ){
                let sql = "SELECT * FROM `highScore` WHERE '"+q.query.id+"' = `id`";
                dataBaseCall(db,sql,response)
            }else{
                returnClient("you are missing key for 'id' and a value for 'id'",500,response);
            }
            
        }else if(q.query.type == "updateScore"){
            if(typeof q.query.id === 'undefined' ||typeof q.query.score === 'undefined' ){
                returnClient("you are missing key for 'id' and 'score' and a value for 'id' and 'score'",500,response);
            }else{
               let sql = "UPDATE `highScore` SET `score` = "+q.query.score+" WHERE `highScore`.`id` = "+q.query.id+";";
                dataBaseCall(db,sql,response) 
            }
            
        }else if(q.query.type == "addTime"){
            if(typeof q.query.id === 'undefined' ||typeof q.query.time === 'undefined' ){
                returnClient("you are missing key for 'id' and 'time' and a value for 'id' and 'time'",500,response);
            }else {
                let sql = "INSERT INTO `time` (`id`, `nameId`, `time`) VALUES (NULL, '"+q.query.id+"', '"+q.query.time+"');";
                dataBaseCall(db,sql,response)
            }
        }else if(q.query.type == "addTurns"){
            if(typeof q.query.id === 'undefined' ||typeof q.query.turns === 'undefined' ){
                returnClient("you are missing key for 'id' and 'turns' and a value for 'id' and 'turns'",500,response);
            }else{
                let sql = "INSERT INTO `turns` (`id`, `nameId`, `turns`) VALUES (NULL, '"+q.query.id+"', '"+q.query.turns+"');";
                dataBaseCall(db,sql,response) 
            }
        }else{
            returnClient("i dont know what you want. if you use key 'type' you can set the value for 'select','insert','highScore','updateScore','addTime','addTurns'",500,response);
        }
    
}

returnClient = (result,returnNum,response) =>{
    response.writeHead(returnNum, {
    "Content-Type":"text/html",
    "Access-Control-Allow-Origin": "*"});
    let myJson = JSON.stringify(result);
    response.end(myJson);
}

dataBaseCall = (db,sql,response) =>{
    db.query(sql,function (err,result){
        if(err){
            returnClient("i dont know what you want",500,response);
        } else {
            returnClient(result,200,response);
        }
        
    });

}