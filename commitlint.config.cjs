/**
 * git提交优化
 *    npm install -D commitizen cz-git
 *    1、git add 将内容暂存
 *    2、"commit": "git-cz" 加入scripts 执行 npm run commit
 * commitlint 中文化
 */
module.exports = {
  prompt: {
    // 配置中文化交互提示
    messages: {
      type: "选择你要提交的类型 :",
      scope: "选择一个提交范围（可选）:",
      customScope: "请输入自定义的提交范围 :",
      subject: "填写简短精炼的变更描述 :\n",
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      footer: "列举关联 issue (可选) 例如: #31, #I3244 :\n",
      confirmCommit: "是否提交或修改 commit ?",

      // 其他已有配置...
      breaking: '列举所有破坏性变更（可选）。使用 "|" 换行:\n',
      breakingPrefix: "❗️ 破坏性变更:", // 破坏性变更在最终消息中的前缀
      footerPrefixesSelect: "选择 ISSUES 变更类型（可选）:",
      customFooterPrefix: '输入自定义的 ISSUES 前缀（如 "close"）:',

      // 其他辅助提示---
      upperCaseSubject: "首字母是否大写？",
      skipQuestions: "跳过任何问题（用逗号分隔，如 'body,footer'）:",
      // 范围选择为空时的提示
      emptyScope: "未选择范围，将使用默认值",
      // 范围自定义输入为空时的提示
      customScopePrompt: "是否自定义范围？",
      // 提交类型为空时的警告
      emptyType: "❌ 必须选择提交类型！",
      // 简短描述为空时的警告
      emptySubject: "❌ 简短描述不能为空！",
      // 详细描述为空时的提示
      emptyBody: "未填写详细描述，跳过",
      // 底部信息为空时的提示
      emptyFooter: "未关联 ISSUES，跳过",
      // 范围选择器的搜索提示
      searchScope: "输入关键字搜索范围:",
      // 提交类型选择器的搜索提示
      searchSubject: "输入关键字搜索提交类型:",
    },
    // 汉化提交类型（types）
    types: [
      { value: "feat", name: "特性(feat):     ✨  新增功能" },
      { value: "fix", name: "修复(fix):     🐛  修复缺陷" },
      { value: "docs", name: "文档(docs):     📝  文档变更" },
      { value: "style", name: "格式(style):     💄  代码格式（空格、分号等）" },
      { value: "refactor", name: "重构(refactor):     ♻️  代码重构" },
      { value: "perf", name: "性能(perf):     ⚡️  性能优化" },
      { value: "test", name: "测试(test):     ✅  添加测试" },
      { value: "build", name: "构建(build):     📦️  构建流程变更" },
      { value: "ci", name: "集成(ci):     🎡  CI 配置变更" },
      { value: "chore", name: "其他(chore):     🔨  辅助工具变更" },
    ],
    // 自定义 scope（范围）
    scopes: [
      { name: "默认" },
      { name: "NestJS" },
      { name: "ExpressORM" },
      { name: "其他" },
    ],
    allowCustomScopes: true, // 允许手动输入范围
    // 结合 commitlint 校验
    // extends: ['@commitlint/config-conventional'],
    // rules: {
    // 	'type-case': [0], // 不校验大小写
    // 	'subject-case': [0] // 不校验 subject 大小写
    // }
  },
};
