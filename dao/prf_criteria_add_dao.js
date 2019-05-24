var mysql = require('mysql');

class PrfCriteriaDao{
    constructor(){
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password:"Sathish",
            database:"EMPLOYEE_PERFORMANCE"
        })
    }

   getAll(){
       let sql = `select * from emp_perf_criteria`;
       return  new Promise((resolve,reject)=>{ 
            this.con.query(sql, (error, results) => {
                if (error) {
                    console.log(error.message);
                    reject(error.message)
                }
                resolve(results)
            });
        });
    }

    insert(res,obj){
        let sqlT = `insert into emp_perf_criteria set ?`;
        this.con.query(sqlT, obj,  (error, results, fields) => {
            if (error) {
                return console.log(error.message);
            }
            res.send("Success")
        });
    }

    update(res,obj){ 
            let sql = `UPDATE emp_perf_criteria
        SET criteria_name = ?,criteria_description=?,criteria_enable=?
        WHERE criteria_id = ?`;
        this.con.query(sql, obj,  (error, results, fields) => {
            if (error) {
                return console.log(error.message);
            }
            res.send("Success")
        });
    
    }

    delete(res,obj){ 
        let sql = `delete from  emp_perf_criteria
        WHERE criteria_id = ?`;
        this.con.query(sql, obj,  (error, results, fields) => {
            if (error) {
                return console.log(error.message);
            }
            res.send("Success")
        });
    }
   
}
module.exports=new PrfCriteriaDao();