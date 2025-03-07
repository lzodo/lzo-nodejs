const Admin = require('../models/admin');
const { fn, col, Op } = require('sequelize');
const md5 = require('md5');
const { pick, visHandler } = require('../utils/tools');
const { adminCreateVis, adminDeleteVis, adminUpdateVis } = require('./optionValids/adminValid');

// 添加
exports.create = async function (adminObj) {
	const data = pick(adminObj, 'name', 'loginId', 'loginPwd');
	const visRes = visHandler(adminCreateVis, data);

	if (!visRes) {
		/**
		 * create = build + save ，最终返回创建的实例
		 * bulkCreate([{}]) 批量插入数据
		 */
		data.loginPwd = md5(data.loginPwd);
		const res = await Admin.create(data);
		return res.toJSON();
	} else {
		throw new Error(JSON.stringify(visRes));
	}
};

// 删除
exports.delete = async function (deleteObj) {
	const visRes = visHandler(adminDeleteVis, deleteObj);
	console.log();
	if (!visRes) {
		// 返回影响的数目
		return await Admin.destroy({
			where: {
				id: {
					[Op.or]: deleteObj.ids
				}
			}
		});
	} else {
		throw new Error(JSON.stringify(visRes));
	}
};

// 修改
exports.update = async function (adminObj, id) {
	const data = pick(adminObj, 'name', 'loginId', 'loginPwd');
	console.log(data, 33);

	const visRes = visHandler(adminUpdateVis, data);
	if (!visRes) {
		// 返回影响的数目
		let result = await Admin.update(data, {
			where: { id }
		});
		return result[0] == 1 ? '更新成功' : '未更新';
	} else {
		throw new Error(JSON.stringify(visRes));
	}
};

// 通过分页查询
exports.findByPage = async function (searchObj) {
	const { page, limit } = searchObj;
	const where = {};
	const findObj = {
		attributes: ['name', 'loginId'],
		offset: (page - 1) * limit,
		limit: limit
	};
	for (const key in searchObj.where) {
		where[key] = { [Op.like]: `%${searchObj.where[key]}%` };
	}
	if (Object.keys(where).length) {
		findObj.where = where;
	}

	const res = await Admin.findAndCountAll(findObj);
	return JSON.parse(JSON.stringify(res));
};

// 通过id查询
exports.findById = async function (id) {
	const res = await Admin.findOne({
		attributes: ['name', 'loginId'],
		where: {
			id
		}
	});
	return res?.toJSON();
};

// 登录
exports.login = async function (adminObj) {
	let result = await Admin.findOne({
		attributes: ['id', 'loginId', 'name'],
		where: {
			loginId: adminObj.loginId,
			loginPwd: md5(adminObj.loginPwd)
		}
	});

	if (result) {
		return result.toJSON();
	} else {
		throw new Error('账号或密码错误');
	}
};

// 查询
exports.findAll = async function (pageSize = 10, pageNumber = 1) {
	// 中文文档 https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/core-concepts/model-querying-basics.md

	if (false) {
		// select * from `admin`;
		var res = await Admin.findAll();

		// select * from `admin` limit 0,10;
		var res = await Admin.findAll({
			offset: (pageNumber - 1) * pageSize,
			limit: pageSize
		});

		// select name,loginId from admins;
		var res = await Admin.findAll({
			attributes: ['name', 'loginId']
		});

		// select name,loginId from admins;
		var res = await Admin.findAll({
			attributes: ['name', 'loginId']
		});

		// select name as userName,loginId from admins;
		var res = await Admin.findAll({
			attributes: [['name', 'userName'], 'loginId']
		});

		// select count(id) as n_hats from admins;
		var res = await Admin.findAll({
			attributes: [[fn('COUNT', col('id')), 'n_hats']]
		});

		// SELECT `name`, COUNT(`id`) AS `数量` FROM `Admins` WHERE (`Admin`.`deletedAt` IS NULL) GROUP BY `name`;
		var res = await Admin.findAll({
			attributes: ['name', [fn('COUNT', col('id')), '数量']],
			group: 'name'
		});

		// select * from admins order by id desc;
		var res = await Admin.findAll({
			order: [['id', 'DESC']]
		});

		// SELECT `loginId`, `loginPwd`, `createdAt`, `updatedAt`, `deletedAt` FROM `Admins`  排除指定属性不查
		var res = await Admin.findAll({
			attributes: { exclude: ['name', 'id'] }
		});

		// ============= where 子句 ======================
		var res = await Admin.findAll({
			attributes: ['id', 'name', 'loginId'],
			where: {
				// id: 3,
				// 基本
				id: {
					[Op.eq]: 3
				}
				// [Op.eq]: 3, // = 3
				// [Op.ne]: 20, // != 20
				// [Op.is]: null, // IS NULL
				// [Op.not]: true, // IS NOT TRUE
				// [Op.or]: [5, 6], // (someAttribute = 5) OR (someAttribute = 6)
				// 数字比较
				// [Op.gt]: 6, // > 6
				// [Op.gte]: 6, // >= 6
				// [Op.lt]: 10, // < 10
				// [Op.lte]: 10, // <= 10
				// [Op.between]: [6, 10], // BETWEEN 6 AND 10
				// [Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15
				// [Op.in]: [1, 2], // IN [1, 2]
				// [Op.notIn]: [1, 2], // NOT IN [1, 2]
				// [Op.like]: "%hat", // LIKE '%hat'
				// [Op.notLike]: "%hat", // NOT LIKE '%hat'
			}
		});
	}

	// select * from admins order by id desc;
	var res = await Admin.findAll({
		order: [['id', 'DESC']]
	});

	return JSON.parse(JSON.stringify(res));
};
