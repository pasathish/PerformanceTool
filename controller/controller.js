'use strict'
const path=require('path');

class Controller{

    constructor(app){
        this.app=app;
        this.router();
    }

    router(){
        this.app.get("/Login",(req,res)=>{
            req.session["projectId"]="123"
            console.log(req.body.username);
                res.sendFile(path.join(__dirname,"../client/build/index.html" ) );
         })

         this.app.post("/LoginStatus",(req,res)=>{
            req.session["projectId"]="123"
            console.log("userStatus",req.session['user'],req.sessionID);
            if(req.session['user'])
                res.send(JSON.stringify({login:true}));
            else
                res.send(JSON.stringify({login:false}));
         })

         this.app.post("/Login",(req,res)=>{
            console.log(req.body);
            if(req.body.username==="test"&&req.body.password==="123"){
                req.session['user']=req.body.username;
                req.session['projectId']="123"
                console.log("userMain",req.session['user'],req.sessionID);
                res.send(JSON.stringify({login:true}));
            }else{
                res.send(JSON.stringify({login:false}));
            }
         })

        this.app.post("/Logout", (req,res)=>{
            req.session.destroy(); 
         })

         this.app.get("*", (req,res)=>{   
             res.sendFile(path.join(__dirname,"../client/build/index.html" ) );      
         })
    }
};

module.exports=Controller;
