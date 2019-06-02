'use strict'
const report_service=require('../service/emp_prf_report_service');
const service=new report_service();

class PerformanceReportController{
    constructor(app){
        this.app=app;
        this.router();
    }

    router(){
        this.app.post("/insertReport",function(req,res){
            console.log("insertSettingCriteria",req.body['updatedRecordKey'],req.body['updatedRecord'])
            service.insert(res,JSON.parse(req.body['updatedRecord']),JSON.parse(req.body['updatedRecordKey']));
        })

        this.app.post("/getReport",function(req,res){
            console.log("***********************",req.body["date"])
            service.getAll(req.body["empID"],req.body["date"],req.session["projectId"],res,req.session['user']);
        })

        this.app.post("/getTeamReport",function(req,res){
            service.getReport(req.body["fromDate"],req.body["toDate"],req.body["empId"],req.session["projectId"],res)
        })
    }
};

module.exports=PerformanceReportController;
