const dao = require("../dao/emp_prf_report_dao");
const teamMemberdao = require("../dao/setting_dao");
const criteria_setting_service = require("../service/criteria_setting_service");
const settingService = new criteria_setting_service();
class CriteriaReportService {
  getAll(empId, date, projectId, res) {
    let criteriaMap = new Map();
    settingService.getAll(null, projectId).then(result => {
      result.forEach(row => {
        if (row.criteria_enable) {
          criteriaMap.set(row.criteria_id, row);
        }
      });
      dao.getAll(empId, date).then(reportList => {
        let reportMap = new Map();
        reportList = reportList.filter(element => {
          if (criteriaMap.get(element.criteria_id)) {
            element.criteria_name = criteriaMap.get(
              element.criteria_id
            ).criteria_name;
            element.criteria_description = criteriaMap.get(
              element.criteria_id
            ).criteria_description;
            element.max_rate = criteriaMap.get(element.criteria_id).max_rate;
            element.min_rate = criteriaMap.get(element.criteria_id).min_rate;
            reportMap.set(element.criteria_id, element);
            return true;
          }
          return false;
        });
        let reportCriteriaIdList = Array.from(reportMap.keys());
        Array.from(criteriaMap.keys()).forEach(criteriaId => {
          if (!reportCriteriaIdList.includes(criteriaId))
            reportList.push(this.getDefaultReport(criteriaMap.get(criteriaId)));
        });
        res.send(reportList);
      });
    });
  }

  getReport(fromDate, toDate, empId, projectId, res) {
    let criteriaMap = new Map();
    settingService.getAll(null, projectId).then(result => {
      result.forEach(row => {
        if (row.criteria_enable) {
          criteriaMap.set(row.criteria_id, row.criteria_name);
        }
      });
      let headerList = Array.from(criteriaMap.keys());
      let headerIdList = ["emp_id", "emp_name", "date"];
      let empIdList = new Set();
      dao.getRecord(fromDate, toDate, empId).then(results => {
        //2019-05-10
        let reportMap = new Map();
        results.forEach(row => {
          empIdList.add(row.emp_id);
        });
        teamMemberdao
          .getMemberName(Array.from(empIdList))
          .then(empNameList => {
            let empNameMap = new Map();
            empNameList.forEach(row => {
              empNameMap.set(row.empId, row.empName);
            });
            results.forEach(row => {
              let criteriaId = criteriaMap.get(row.criteria_id);
              if (
                !headerIdList.includes(criteriaId) &&
                criteriaId !== undefined
              )
                headerIdList.push(criteriaId);
              if (criteriaId === undefined) {
                //Report Criteria is deleted in main table
                //No need to consider this criteria;
              } else if (reportMap.has(row.emp_id + row.report_date)) {
                reportMap.get(row.emp_id + row.report_date)[criteriaId] =row.rate;
              } else {
                let newObject = {};
                newObject[criteriaId] = row.rate;
                newObject["emp_id"] = row.emp_id;
                newObject["date"] = row.report_date;
                newObject["emp_name"] = empNameMap.get(row.emp_id);
                reportMap.set(row.emp_id + row.report_date, newObject);
              }
            });
            let record = Array.from(reportMap.values());
            if (headerIdList.length == 2) headerIdList = [];
            if (record.length == 0) headerIdList = [];
            res.send({ header: headerIdList, data: record });
          })
          .catch(error => {
            console.log(error);
          });
      });
    });
  }

  getDefaultReport(criteria_details) {
    let row = {};
    row.criteria_name = criteria_details.criteria_name;
    row.criteria_description = criteria_details.criteria_description;
    row.criteria_id = criteria_details.criteria_id;
    row.criteria_discription = "";
    row.min_rate = criteria_details.min_rate;
    row.max_rate = criteria_details.max_rate;
    row.rate = 0;
    return row;
  }

  insert(res, objList, delobj) {
    dao.delete(delobj).then(() => {
      dao.insert(res, objList);
    });
  }

  delete(res, obj) {
    let updateData = [obj["criteria_id"]];
    dao.delete(res, updateData);
  }
}
module.exports = CriteriaReportService;
