'use strict'
const path=require('path');
const loginService=require('../service/login_Service');

class Controller{

    constructor(app){
        this.app=app;
        this.router();
    }

    router(){
        this.app.get("/Login",(req,res)=>{
            console.log(req.body.username);
                res.sendFile(path.join(__dirname,"../client/build/index.html" ) );
         })

         this.app.post("/LoginStatus",(req,res)=>{
            console.log("userStatus",req.session['user'],req.sessionID);
            if(req.session['user'])
                res.send(JSON.stringify({login:true}));
            else
                res.send(JSON.stringify({login:false}));
         })

         this.app.post("/Login",(req,res)=>{
            console.log(req.body);
            loginService.getLoginUserData(req,res);
         });

        this.app.post("/Logout", (req,res)=>{
            req.session.destroy(); 
         })

         this.app.get("*", (req,res)=>{   
             res.sendFile(path.join(__dirname,"../client/build/index.html" ) );      
         })
    }
};

module.exports=Controller;
