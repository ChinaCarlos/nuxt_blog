/**
 * @name mongodb 数据库单体查询操作
 * @params DBModel mongoose 数据模型
 * @params data { Object} 查询数据
 * @reutrn 查询结果
 */
async function dbFindOne(DBModel, data) {
  try {
    const result = await DBModel.findOne(data);
    return result;
  } catch (error) {
    console.log('mongodb 查询单体数据失败！' + error);
  }
}

/**
 * @name 数据库添加数据
 * @params DBModel mongoose 数据模型
 * @params data {Object}  向数据库添加的数据
 * @return {Object} 添加的结果
 */
async function insertData(DBModel, data) {
  try {
    console.log('insert data');
    const dbmodel = new DBModel(data);
    const result = await dbmodel.save();
    console.log(result);
    return true;
  } catch (error) {
    console.log('mongodb 中插入数据失败！' + error);
    return false;
  }
}
module.exports = {
  dbFindOne,
  insertData
};
