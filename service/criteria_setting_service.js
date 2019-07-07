const dao = require("../dao/prf_criteria_setting_dao");
const criteria_add_service = require("./criteria_service");
const addService = new criteria_add_service();
class CriteriaSettingService {
  getAll(res, project_id) {
    return new Promise((resolve, reject) => {
      addService.getAll(null).then(result => {
        let criteriaMap = new Map();
        result.forEach(row => {
          if (row.criteria_enable) {
            criteriaMap.set(row.criteria_id, row);
          }
        });
        dao.getAll(project_id).then(settingList => {
          let settingMap = new Map();
          settingList = settingList.filter(element => {
            if (criteriaMap.get(element.criteria_id)) {
              element.criteria_name = criteriaMap.get(
                element.criteria_id
              ).criteria_name;
              element.criteria_description = criteriaMap.get(
                element.criteria_id
              ).criteria_description;
              settingMap.set(element.criteria_id, element);
              return true;
            }
            return false;
          });
          let settingCriteriaIdList = Array.from(settingMap.keys());
          Array.from(criteriaMap.keys()).forEach(criteriaId => {
            if (!settingCriteriaIdList.includes(criteriaId))
              settingList.push(
                this.getDefaultSetting(criteriaMap.get(criteriaId))
              );
          });
          if (res === null) {
            resolve(settingList);
          } else res.send(settingList);
        });
      });
    });
  }

  getDefaultSetting(criteria_details) {
    let element = {};
    element.criteria_name = criteria_details.criteria_name;
    element.criteria_description = criteria_details.criteria_description;
    element.criteria_id = criteria_details.criteria_id;
    element.min_rate = 0;
    element.max_rate = 5;
    element.criteria_enable = 1;
    return element;
  }

  insert(res, objList, delobj, projectId) {
    dao.delete(delobj, projectId).then(() => {
      dao.insert(res, objList);
    });
  }

  delete(res, obj) {
    let updateData = [obj["criteria_id"]];
    dao.delete(res, updateData);
  }
}
module.exports = CriteriaSettingService;
