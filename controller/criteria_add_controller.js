'use strict'
const criteria_service=require('../service/criteria_add_service');
const service=new criteria_service();

class performanceController{

    constructor(app){
        this.app=app;
        this.router();
    }

    router(){
        this.app.post("/insertCriteria",function(req,res){
            service.insert(res,req.body);
        })

        this.app.post("/getCriterias",function(req,res){
            console.log("get update",req.body)
            service.getAll(res);
        })

        this.app.post("/deleteCriteria",function(req,res){
            console.log("get update",req.body)
            service.delete(res,req.body);
        })

        this.app.post("/updateCriterta",function(req,res){
            console.log("update",JSON.parse(req.body['updateRecord']))
            service.update(res,JSON.parse(req.body['updateRecord']))
        });
    }
};

module.exports=performanceController;
