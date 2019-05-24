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

   getAll(empId,date,projectId){
        let sql = `select criteria_id, criteria_discription, rate from 
        emp_perf_report where emp_id=? and report_date=? ;`;
        return new Promise((resolve, reject)=>{
                this.con.query(sql,[empId,date], (error, results) => {
                    if (error) {
                        console.error("Error",error.message);
                        reject(error.message);
                    }
                    resolve(results);
        });
    })
   }

   getRecord(fromDate,toDate,empId){
        let filter=[toDate,fromDate]
        let sql;
        if(empId===""){
            sql= `select criteria_id,emp_id,report_date,  rate from 
            emp_perf_report where report_date<=? and report_date>=? ;`;
        }else{
            filter.push(empId)
            sql= `select criteria_id,emp_id,report_date,  rate from 
            emp_perf_report where report_date<=? and report_date>=? and emp_id=?;`;
        }
    return new Promise((resolve, reject)=>{
        this.con.query(sql,filter, (error, results) => {
            if (error) {
                console.error("Error",error.message);
                reject(error.message);
            }
            resolve(results);
    });
    })
   }
    insert(res,obj){
        let sqlT = `insert into emp_perf_report (emp_id,criteria_id,
            report_date,rate,criteria_discription) values ? ;`;
        this.con.query(sqlT, [obj],  (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            res.send("Success")
        });
    }

    async delete(obj){ 
        let sql = `delete from emp_perf_report
        WHERE  (emp_id , criteria_id , report_date) in (?)`;
        return await this.con.query(sql, [obj],  (error, results, fields) => {
            if (error) {
                 console.log(error.message);
            }
            return;
        });
    }
}

module.exports=new PrfCriteriaDao();