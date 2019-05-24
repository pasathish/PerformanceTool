var mysql = require('mysql');

class MemberSettingDao{
    constructor(){
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password:"Sathish",
            database:"EMPLOYEE_PERFORMANCE"
        })
    }

    insertScreenSetting(res,obj){
        let query =`insert into screen_settings set ?`;
        this.con.query(query, [obj],  (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            res.send("Success")
        });
   }

   insertTeamMember(obj,res){
       console.log(obj)
    let query =`insert into  team_member set ?`;
    this.con.query(query, [obj],  (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        res.send("Success")
    });
   }

   insertProject(obj,res){
       console.log(obj)
    let query =`insert into project_list set ?`;
    this.con.query(query, [obj],  (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        res.send("Success")
    });
    }

    insertNewMember(obj,res){
        let query =`insert into team_new_member set ?`;
        this.con.query(query, [obj],  (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            res.send("Success")
        });
    }

    deleteTeamMember(obj,res){
        let query =`delete from team_member where empId= ?`;
        this.con.query(query, [obj],  (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            res.send("Success")
        });
    }

    deleteProject(res,obj){
        console.log(obj)
        let query =`delete from project_list where project_id= ?`;
        this.con.query(query, [obj],  (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            res.send("Success")
        });
    }

    deleteNewMember(obj,res){
        let query =`delete from team_new_member where empId= ?`;
        this.con.query(query, [obj],  (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            res.send("Success")
        });
    }

    getScreenSetting(res,obj){
        let query =`select * from screen_settings`;
        this.con.query(query, [obj],  (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            res.send(results)
        });
   }

   getTeamMember(obj,res){
       console.log(obj)
        let query =`select * from team_member where supervisorId=?`;
        this.con.query(query, [obj],  (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            console.log(results)
            res.send(results)
        });
   }

   getProjects(res){
        let query =`select * from project_list`;
        this.con.query(query,  (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            console.log(results)
            res.send(results)
        });
    }

    getProjectMember(res){
        let query =`select * from team_new_member`;
        this.con.query(query, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            console.log(results)
            res.send(results)
        });
    }
    
}

module.exports=new MemberSettingDao();