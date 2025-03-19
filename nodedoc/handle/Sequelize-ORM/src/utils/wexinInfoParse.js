const crypto = require('crypto');
const AppError = require('./AppError');

exports.wexinInfoParse = async (sessionKey, encryptedData, iv) => {
	try {
		// 将 sessionKey、encryptedData 和 iv 转换为 Buffer
		const sessionKeyBuffer = Buffer.from(sessionKey, 'base64');
		const encryptedDataBuffer = Buffer.from(encryptedData, 'base64');
		const ivBuffer = Buffer.from(iv, 'base64');

		// 创建解密器
		const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKeyBuffer, ivBuffer);
		decipher.setAutoPadding(true);

		// 解密数据
		let decoded = decipher.update(encryptedDataBuffer, 'binary', 'utf8');
		decoded += decipher.final('utf8');

		// 返回解密后的 JSON 数据
		return JSON.parse(decoded);
	} catch (error) {
		throw new AppError('解密失败: ' + error.message);
	}
};
