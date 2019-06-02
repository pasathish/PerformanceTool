'use strict'
const criteria_service=require('../service/criteria_setting_service');
const service=new criteria_service();

class CriteriaSettingController{
    constructor(app){
        this.app=app;
        this.router();
    }

    router(){
        this.app.post("/insertSettingCriteria",function(req,res){
            console.log("insertSettingCriteria",req.body['updatedRecordKey'],req.body['updatedRecord'])
            service.insert(res,JSON.parse(req.body['updatedRecord']),JSON.parse(req.body['updatedRecordKey']),JSON.parse(req.body['projectId']));
        })

        this.app.post("/getSettingCriterias",function(req,res){
            service.getAll(res,req.body["project_id"]);
        })

        this.app.post("/updateSettingCriterta",function(req,res){
            console.log("update",JSON.parse(req.body['updateRecord']))
            service.update(res,JSON.parse(req.body['updateRecord']))
        });
    }
};

module.exports=CriteriaSettingController;
