const fs = require('fs');
const path = require('path');

function deleteAllFilesInDirectory(directoryPath) {
	// 判断文件夹是否存在
	if (fs.existsSync(directoryPath)) {
		/**
		 * recursive: true：递归删除目录及其内容
		 * force: true：即使目录不存在也不会报错。
		 */
		fs.rm(directoryPath, { recursive: true }, (err, res) => {
			console.log(err, res);
		});
	}
}

deleteAllFilesInDirectory(path.resolve(__dirname, '../public/uploads'));
module.exports = {
	deleteAllFilesInDirectory
};
