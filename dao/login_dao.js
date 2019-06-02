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

    insertNewUser(res,obj){
        let query =`insert into screen_settings set ?`;
        this.con.query(query, [obj],  (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            res.send("Success")
        });
   }

   getLoginUserData(userId,password){
        let query =`select * from userDB where emp_id = ? and password = ?`;
        return new Promise((resolve,reject)=>{this.con.query(query, [userId,password],  (error, results, fields) => {
                if (error) {
                    return reject(error.message);
                }
                resolve(results);
            });
        });
    }
    
}

module.exports=new MemberSettingDao();