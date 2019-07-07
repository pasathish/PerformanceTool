"use strict";
const path = require("path");
const login_service = require("../service/login_service");
const loginService = new login_service();

class Controller {
  constructor(app) {
    this.app = app;
    this.router();
  }

  router() {
    /**
     * Initial Login Operation route
     */
    this.app.get("/Login", (req, res) => {
      console.log(req.body.username);
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });

    /**
     * Checks for login Status when a routing operation performed in client side
     */
    this.app.post("/LoginStatus", (req, res) => {
      console.log("userStatus", req.session["user"], req.sessionID);
      if (req.session["user"]) res.send(JSON.stringify({ login: true }));
      else res.send(JSON.stringify({ login: false }));
    });

    /**
     * Perform Login operation
     */
    this.app.post("/Login", (req, res) => {
      console.log(req.body);
      loginService.getLoginUserData(req, res);
    });

    /**
     * Perform Logout operation
     */
    this.app.post("/Logout", (req, res) => {
      req.session.destroy();
    });


    this.app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });
  }
}

module.exports = Controller;
