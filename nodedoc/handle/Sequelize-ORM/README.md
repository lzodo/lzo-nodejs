## 项目结构

> duyi： Node + MySql + ORM + Express

```shell
project /
├── config             # 配置文件
├── controller         # 控制器
├── logs               # 日志存储
├── middleware         # 中间件
├── mock               # 数据模拟
├── models             # 数据库模型
├── public/            # 静态目录
│   ├── case           # 一些测试案例
│   ├── source         # 服务器资源（供下载）
│   ├── uploads        # 图片上传
│   ├── www            # 基于这套系统的前端项目
│   └── index.html     # 测试首页
├── redis              # 数据库缓存
├── router             # 路由
├── services           # 数据库操作
├── spider             # 爬虫数据模拟
├── swagger            # 接口文档自动生成
├── utils              # 工具库
├── package.json       # 项目配置文件
├── README.md          # 项目文档
├── logger.js          # 日志配置
├── nodemon.json       # nodemon 配置文件
├── swagger-autogen.js # swagger渲染配置文件
└── .gitignore         # Git 忽略文件
```
