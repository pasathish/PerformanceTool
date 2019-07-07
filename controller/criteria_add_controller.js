"use strict";
const criteria_service = require("../service/criteria_service");
const service = new criteria_service();

class criteriaController {
  constructor(app) {
    this.app = app;
    this.router();
  }

  /**
   * Insert new Criteria
   */
  router() {
    this.app.post("/insertCriteria", function(req, res) {
      service.insert(res, req.body);
    });

    /**
     * Get all the Criterias
     */
    this.app.post("/getCriterias", function(req, res) {
      service.getAll(res);
    });

    /**
     * Delete a Criteria
     */
    this.app.post("/deleteCriteria", function(req, res) {
      service.delete(res, req.body);
    });

    this.app.post("/updateCriterta", function(req, res) {
      console.log("update", JSON.parse(req.body["updateRecord"]));
      service.update(res, JSON.parse(req.body["updateRecord"]));
    });
  }
}

module.exports = criteriaController;
