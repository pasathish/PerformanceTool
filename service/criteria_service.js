const dao = require("../dao/prf_criteria_add_dao");
class CriteriaService {
  getAll(res) {
    return dao.getAll().then(result => {
      if (res === null) {
        return result;
      }
      res.send(result);
    });
  }

  insert(res, obj) {
    dao.insert(res, obj);
  }

  update(res, obj) {
    let updateData = [];
    updateData.push(obj["criteria_name"]);
    updateData.push(obj["criteria_description"]);
    updateData.push(obj["criteria_enable"]);
    updateData.push(obj["criteria_id"]);
    dao.update(res, updateData);
  }

  delete(res, obj) {
    let updateData = [obj["criteria_id"]];
    dao.delete(res, updateData);
  }
}
module.exports = CriteriaService;
