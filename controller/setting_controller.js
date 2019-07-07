"use strict";
const setting_service = require("../service/setting_service");
const service = new setting_service();

class SettingServiceController {
  constructor(app) {
    this.app = app;
    this.router();
  }

  router() {
    this.app.post("/insertScreenSetting", function(req, res) {
      console.log(
        "insertSettingCriteria",
        req.body["updatedRecordKey"],
        req.body["updatedRecord"]
      );
      service.insertScreenSetting(
        res,
        JSON.parse(req.body["updatedRecord"]),
        JSON.parse(req.body["updatedRecordKey"])
      );
    });

    this.app.post("/insertTeamMember", function(req, res) {
      service.insertTeamMember(
        {
          empID: req.body["empId"],
          empName: req.body["empName"],
          supervisorId: req.session["userId"]
        },
        res
      );
    });

    this.app.post("/insertProject", function(req, res) {
      service.insertProject(JSON.parse(req.body["row"]), res);
    });

    this.app.post("/insertNewMember", function(req, res) {
      service.insertNewMember(JSON.parse(req.body["data"]), res);
    });

    this.app.post("/getProjects", function(req, res) {
      service.getProjects(res);
    });

    this.app.post("/getTeamMember", function(req, res) {
      service.getTeamMember(req.session["user"], res);
    });

    this.app.post("/getProjectMember", function(req, res) {
      service.getProjectMember(res);
    });

    this.app.post("/getScreenSetting", function(req, res) {
      service.getScreenSetting(req, res);
    });

    this.app.post("/deleteNewMember", function(req, res) {
      service.deleteNewMember(req.body["empId"], res);
    });

    this.app.post("/deleteTeamMember", function(req, res) {
      service.deleteTeamMember(req.body["empId"], res);
    });

    this.app.post("/deleteProject", function(req, res) {
      service.deleteProject(res, req.body["projectId"]);
    });
  }
}

module.exports = SettingServiceController;
