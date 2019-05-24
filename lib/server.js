
'use strict';

var path = require('path');
var criteriaAddController = require('../controller/criteria_add_controller');
var criteriaSettingController = require('../controller/criteria_setting_controller');
var reportController = require('../controller/emp_prf_report_controller');
var controller = require('../controller/controller');
var express = require('express');
var app = express();
var uuid = require('uuid/v4');
var session = require('express-session');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var bcrypt = require('bcrypt-nodejs');
var cors = require('cors');
app.use(session({
    genid: function genid(req) {
        return uuid();
    },
    secret: "dummy-value",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 600000
    }
}));
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/build")));

new reportController(app);
new controller(app);
new criteriaAddController(app);
new criteriaSettingController(app);
app.listen(5000, function () {
    console.log("App is listening to 5000");
});