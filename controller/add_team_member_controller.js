'use strict'
const setting_service=require('../service/add_team_member_service');
const service=new setting_service();

class SettingServiceController{
    constructor(app){
        this.app=app;
        this.router();
    }

    router(){
        this.app.post("/insertScreenSetting",function(req,res){
            console.log("insertSettingCriteria",req.body['updatedRecordKey'],req.body['updatedRecord'])
            service.insertScreenSetting(res,JSON.parse(req.body['updatedRecord']),JSON.parse(req.body['updatedRecordKey']));
        })

        this.app.post("/insertTeamMember",function(req,res){
            console.log("t72y499",{empID:req.body["empId"],empName:req.body["empName"]})
            service.insertTeamMember({empID:req.body["empId"],empName:req.body["empName"],supervisorId:"122"/*req.session["userId"]}*/},res);
        })

        this.app.post("/insertProject",function(req,res){
            service.insertProject(JSON.parse(req.body["row"]),res);
        })

        
        this.app.post("/insertNewMember",function(req,res){
            service.insertNewMember(JSON.parse(req.body["data"]),/*req.body["date"],req.session["projectId"]*/res);
        })

        this.app.post("/getProjects",function(req,res){
            service.getProjects(res);
        })

        this.app.post("/getTeamMember",function(req,res){
            service.getTeamMember(req.session["user"],res);
        })

        this.app.post("/getProjectMember",function(req,res){
            service.getProjectMember(res)
        })

        this.app.post("/getScreenSetting",function(req,res){
            service.getScreenSetting(req,res)
        })

        this.app.post("/deleteNewMember",function(req,res){
            service.deleteNewMember(req.body["empId"],res)
        })

        this.app.post("/deleteTeamMember",function(req,res){
            service.deleteTeamMember(req.body["empId"],res)
        })

        this.app.post("/deleteProject",function(req,res){
            console.log("shdfign",typeof( req.body["projectId"]))
            service.deleteProject(res,req.body["projectId"])
        })
        
    }
};

module.exports=SettingServiceController;
