var mysql = require('mysql');

class PrfCriteriaSettingDao{
    constructor(){
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password:"Sathish",
            database:"EMPLOYEE_PERFORMANCE"
        })
    }

   getAll(project_id){
        let sql = `select b.criteria_id,IFNULL(b.project_id,"123") as project_id, b.min_rate as min_rate , b.max_rate as max_rate , IFNULL( b.criteria_enable,1) as criteria_enable from prf_criteria_setting b where b.project_id = ?`;
        return new Promise((resolve,reject)=>{ this.con.query(sql, [project_id], (error, results) => {
                if (error) {
                    console.log(error.message);
                    reject(error.message);
                }
                resolve(results);
            });
         });
    }

    insert(res,obj){
        let sqlT = `insert into prf_criteria_setting (criteria_id,project_id,min_rate,max_rate,criteria_enable) values ?`;
        this.con.query(sqlT,[obj] ,  (error, results, fields) => {
            console.log(results)
            if (error) {
                return console.log(error.message);
            }
            console.log(results)
            res.send("Success")
        });
    }

    async delete(obj,projectId){ 
        let sql = `delete from prf_criteria_setting
        WHERE criteria_id in (?) and project_id in (?)`;
        console.log("obj",obj)
        return await this.con.query(sql, [obj,projectId],  (error, results, fields) => {
            if (error) {
                 console.log(error.message);
            }
            return;
        });
    }
   
}
module.exports=new PrfCriteriaSettingDao();