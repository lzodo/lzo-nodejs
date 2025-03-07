const { servers } = require('./config');

const swaggerAutogen = require('swagger-autogen')();
const { port } = servers;
const doc = {
	info: {
		title: 'My API',
		description: 'Description'
	},
	host: `localhost:${port}`,
	schemes: ['http']
};

const outputFile = './swagger/swagger-output.json'; // 生成的 Swagger 文件
const endpointsFiles = ['./routes/**/*.js']; // 指定包含 API 注释的文件

// 自动生成 Swagger 文档
swaggerAutogen(outputFile, endpointsFiles, doc);
