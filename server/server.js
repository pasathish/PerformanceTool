"use strict";

/**
 * 
 *Configure FireBase DataBase
 *Configuration details are present in firebaseDBConfig.js file
 */
const admin = require('firebase-admin');
const config = require('../firebaseDBConfig.js')
admin.initializeApp(config);

/**
 * Import Controller Part for routing
 */
const criteriaAddController = require("../controller/criteria_add_controller");
const criteriaSettingController = require("../controller/criteria_setting_controller");
const reportController = require("../controller/emp_prf_report_controller");
const settingControlle = require("../controller/setting_controller");
const controller = require("../controller/controller");
const path = require("path");
const express = require("express");
const app = express();
const uuid = require("uuid/v4");
const session = require("express-session");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
app.use(
  session({
    genid: req => {
      return uuid();
    },
    secret: "dummy-value",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 600000
    }
  })
);
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/build")));
new reportController(app);
new controller(app);
new criteriaAddController(app);
new criteriaSettingController(app);
new settingControlle(app);
app.listen(5000,function() {
  console.log("App is listening to 5000");
});
