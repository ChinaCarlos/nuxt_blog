// author:maliao
// time: 2018年11月16日 星期五 10时48分10秒 CST

/**
 * 数据库单体查询操作
 * @param DBModel mongoose 数据模型
 * @param data { Object} 查询数据
 * @returns 查询结果
 */
async function dbFindOne(DBModel, data) {
  let result = '';
  try {
    result = await DBModel.findOne(data);
  } catch (error) {
    console.log('mongodb 查询单体数据失败！' + error);
  }
  return result;
}

/**
 *mongodb 数据多条数据查找
 * @param {Object} DBModel
 * @param {Object} searchData
 * @returns 查询结果
 */
async function dbFindMore(DBModel, searchData) {
  let result = '';
  try {
    result = await DBModel.find(searchData);
  } catch (error) {
    console.log('从MongoDB中查询多条数据失败！' + error);
  }
  return result;
}

/**
 * 数据库添加数据
 * @param DBModel mongoose 数据模型
 * @param data {Object}  向数据库添加的数据
 * @returns 添加的结果
 */
async function insertData(DBModel, data) {
  let result = '';
  try {
    const dbmodel = new DBModel(data);
    result = await dbmodel.save();
  } catch (error) {
    console.log('mongodb 中插入数据失败！' + error);
  }
  return result;
}

/**
 *
 *更新mongodb 对应的数据
 * @param {Object} DBModel
 * @param {Object} updateData // 更新数据
 * @param {Object} filterData 条件匹配数据
 * @returns  更新的数据
 */
async function dbUpdate(DBModel, updateData, filterData) {
  let result = '';
  try {
    result = await DBModel.where(filterData).update(updateData);
  } catch (error) {
    console.log('更新数据失败！' + error);
  }
  return result;
}

/**
 * 数据库删除匹配的数据
 * @param {*} DBModel
 * @param {Object} deleteData
 * @param {Object} filterData
 */
async function dbDelete(DBModel, deleteData, filterData) {
  let result = '';
  try {
    result = await DBModel.where(filterData).remove(deleteData);
  } catch (error) {
    console.log('删除数据失败!' + error);
  }
  return result;
}

module.exports = {
  dbFindOne,
  insertData,
  dbFindMore,
  dbUpdate,
  dbDelete
};
