var mysql = require("mysql");
const admin = require("firebase-admin");
let db = admin.firestore();
db.collection("testDocument")
  .get()
  .then(data => {
    let res = [];
    data.forEach(dat => {
      res.push(dat.data());
    });
    console.log(res, data);
  })
  .catch(error => {
    console.error(error);
  });

let docRef = db.collection("users").doc("alovelace");

let setAda = docRef.set({
  first: "Ada",
  last: "Lovelace",
  born: 1815
});

/**
 * This Class maintain all setting related operation (Adding new members to the project,
 * Setting up the admin account,Screen settings)
 */

class MemberSettingDao {
  constructor() {
    this.con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Sathish",
      database: "EMPLOYEE_PERFORMANCE"
    });
  }

  /**
   * Insert Screen setting into screen_settings
   * @param {response} res
   * @param {object} obj
   */
  insertScreenSetting(res, obj) {
    let query = `insert into screen_settings set ?`;
    this.con.query(query, [obj], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send("Success");
    });
  }

  /**
   * Insert Team member
   * @param {response} res response
   * @param {object} obj
   */
  insertTeamMember(obj, res) {
    let query = `insert into  team_member set ?`;
    this.con.query(query, [obj], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send("Success");
    });
  }

  /**
   * Return employee Name base on employee Id
   * @param {*} empIdList
   */
  getMemberName(empIdList) {
    let query = `select empId, empName from team_member where empId in (?)`;
    return new Promise((resolve, reject) =>
      this.con.query(query, [empIdList], (error, results, fields) => {
        if (error) resolve([]);
        resolve(results);
      })
    );
  }

  /**
   * Insert new projects
   * @param {*} res response
   * @param {*} obj
   */
  insertProject(obj, res) {
    let query = `insert into project_list set ?`;
    this.con.query(query, [obj], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send("Success");
    });
  }

  /**
   * Insert new Members into the project
   * @param {*} res response
   * @param {*} obj
   */
  insertNewMember(obj, res) {
    let query = `insert into team_new_member set ?`;
    this.con.query(query, [obj], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send("Success");
    });
  }

  deleteTeamMember(obj, res) {
    let query = `delete from team_member where empId= ?`;
    this.con.query(query, [obj], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send("Success");
    });
  }

  deleteProject(res, obj) {
    let query = `delete from project_list where project_id= ?`;
    this.con.query(query, [obj], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send("Success");
    });
  }

  deleteNewMember(obj, res) {
    let query = `delete from team_new_member where empId= ?`;
    this.con.query(query, [obj], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send("Success");
    });
  }

  getScreenSetting(res, obj) {
    let query = `select * from screen_settings`;
    this.con.query(query, [obj], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send(results);
    });
  }

  getTeamMember(obj, res) {
    let query = `select * from team_member where supervisorId in (?)`;
    this.con.query(query, [obj], (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send(results);
    });
  }

  getProjects(res) {
    let query = `select * from project_list`;
    this.con.query(query, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send(results);
    });
  }

  getProjectMember(res) {
    let query = `select * from team_new_member`;
    this.con.query(query, (error, results, fields) => {
      if (error) {
        return console.error(error.message);
      }
      res.send(results);
    });
  }
}

module.exports = new MemberSettingDao();
