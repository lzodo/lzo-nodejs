module.exports = {
	testEnvironment: 'node', // 测试环境
	testMatch: ['**/__tests__/**/*.test.js'], // 测试文件匹配规则
	collectCoverage: true, // 生成测试报告
	coverageDirectory: 'coverage', // 覆盖率报告目录
	collectCoverageFrom: ['src/router/**/*.js'], // 收集覆盖率的文件范围
	coverageReporters: ['text', 'lcov'] // 报告格式
};
