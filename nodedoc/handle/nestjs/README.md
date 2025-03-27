# nestjs

## 官方提供一系列功能解决方案

<img src=".\statis\images\image-20250326161704996.png" alt="image-20250326161704996" style="zoom:50%;" />

### Nest架构



## 后端开发流程

<img src=".\statis\images\image-20250326155915032.png" style="zoom: 50%;" />

 

<img src=".\statis\images\image-20250326162715580.png" alt="image-20250326162715580" style="zoom:50%;" />

## 快速上手

[中文网](https://nest.nodejs.cn/) [官方提供各种 template](https://github.com/nestjs/awesome-nestjs)

### @nest/Cli

```shell
# 全局安装工具
$ npm i -g @nestjs/cli

# 创建一个项目
$ nest new project-name

# 帮助
$ nest --help

# 创建一个个模板
$ nest g class
│ application   │ application│ 生成新的应用程序工作区
│ class         │ cl         │ 生成新的类
│ configuration │ config     │ 生成CLI配置文件
│ controller    │ co         │ 生成控制器声明
│ decorator     │ d          │ 生成自定义装饰器
│ filter        │ f          │ 生成过滤器声明
│ gateway       │ ga         │ 生成网关声明
│ guard         │ gu         │ 生成守卫宣言
│ interceptor   │ itc        │ 生成拦截器声明
│ interface     │ itf        │ 生成界面
│ library       │ lib        │ 在monorepo中生成一个新的库
│ middleware    │ mi         │ 生成中间件声明
│ module        │ mo         │ 生成模块声明
│ pipe          │ pi         │ 生成管道声明
│ provider      │ pr         │ 生成提供者声明
│ resolver      │ r          │ 生成一个GraphQL resolver声明
│ resource      │ res        │ 生成新的CRUD资源
│ service       │ s          │ 生成服务声明             
│ sub-app       │ app        │ 在monorepo中生成新应用程序

```

### RESTful API

> 一种接口风格，一种交换的约定

重要组成部分

- 接口描述：
- 接口URL：
- 请求方式：`POST`/`DELETE`/`PUT`/`GET`
- 参数：Body/Params/Query/Header 
- 返回示例：
- 返回参数说明：



### 配置文件

#### src 或 功能模块

| 文件                     | 作用                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `app.controller.ts`      | 带有单个路由的基本控制器。                                   |
| `app.controller.spec.ts` | 针对控制器的单元测试。                                       |
| `app.module.ts`          | T应用程序的根模块（root module）。                           |
| `app.service.ts`         | 具有单一方法的基本服务（service）。 method.                  |
| `main.ts`                | 应用程序的入口文件，它使用核心函数 `NestFactory` 来创建 Nest 应用程序的实例。 |

### 目录结构规划

```shell
src/
├── core/                   # 核心框架
│   ├── exceptions/         # 全局异常处理
│   ├── decorators/         # 自定义装饰器
│   └── interceptors/       # 拦截器
│
├── modules/
│   ├── tenant/             # 多租户管理
│   ├── cms/                # CMS核心
│   │   ├── article/        # 文章(含版本控制)
│   │   │   ├── commands/   # CQRS命令
│   │   │   ├── queries/    # CQRS查询
│   │   │   └── events/     # 领域事件
│   │   ├── block/          # 内容块(Block Editor)
│   │   ├── menu/           # 导航菜单
│   │   └── seo/            # SEO管理
│   ├── media/              # 媒体库
...
```

### 代码规范

。。。



## 项目过程

```shell
 $ nest new project-name
 $ cd project-name
 $ pnpm install
 $ npm run start:dev
 
 # 创建一个用户模块，新模块会自动再 app.module.ts 主模块中导入
 $ nest g module user
 # 创建一个路由控制器
 $ nest g controller user -d  # -d 属性可以查看命令会干什么，不会影响工作区
 $ nest g controller user --no-spec # 如果觉得操作没问题，可以执行直接生成文件，影响工作区（ 如果不需要测试文件可以加上 --no-spec ）
 # 创建一个逻辑层
 $ nest g service user  # 创建逻辑层

```

### 控制器调用逻辑层的方法

```javascript
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // 相当于 const userService = new UserService()

  @Get()
  getUser(): any {
    return this.userService.getUser();
  }
}

```



### 添加路由前缀

`main.js` 主入口提交接口前缀

```javascript
 app.setGlobalPrefix('/api/v1');
```

### 调试

> 添加配置：选择 Nodejs 通过 npm 启动

```javascript
"configurations": [ 
    {
        "name": "Launch via NPM",
        "request": "launch",
        "runtimeArgs": [
            "run-script",
            "start:debug" // 使用 package.json scripts 的脚本
        ],
        "runtimeExecutable": "npm",
        "runtimeVersion": "default", // 指定node版本
        "internalConsoleOptions": "neverOpen", // 不要用它内置的console
        "skipFiles": [
            "<node_internals>/**"
        ],
        "type": "node"
    }
]
```

## 6、编程思想

### 5.nest的核心概念

#### 主流程

<img src=".\statis\images\image-20250326231018516.png" alt="image-20250326231018516" style="zoom: 67%;" />

#### 生命周期

![image-20250326231549842](.\statis\images\image-20250326231549842.png)

### 6.nest的模块化

![image-20250326232344929](.\statis\images\image-20250326232344929.png)

```javascript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RangerModule } from './ranger/ranger.module';

/**
 * nestjs 中所有东西都与模块相关联，所有服务，路由都是模块的分支
 * 最终 main.js 也是从这里导入使用
 */
@Module({
  imports: [UserModule, RangerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

![image-20250326232707158](.\statis\images\image-20250326232707158.png)

### 7.DTO、DAO、MVC

#### MVC

> MVC只是一种思想，指导我们对代码合理分块的东西

- 模型：3、【模型】通过一系列操作处理，将处理好的数据，反馈给视图层

- 视图：1、【视图】发送请求与控制器交互 （前后端分离后就是接口数据，之前就是模板 ejs、pub等模板引擎）

- 控制器（路由）：2、【控制器】控制逻辑走向，访问到不同模型 

<img src=".\statis\images\image-20250326234324463.png" alt="image-20250326234324463" style="zoom: 67%;" />

#### DTO

> 数据传输对象（前端请求后端，传输过程，对传输数据进行筛选）

![image-20250326235557188](.\statis\images\image-20250326235557188.png)

#### DAO

> 数据访问过程（访问数据库），等同于 sequelize ，他不是一个功能，而是一个对代码的分层

![image-20250326235752560](.\statis\images\image-20250326235752560.png)

![image-20250326235355690](.\statis\images\image-20250326235355690.png)

## 7、next业务框架设计

### 1.核心概念

![image-20250327001054126](.\statis\images\image-20250327001054126.png)



![image-20250327001415534](.\statis\images\image-20250327001415534.png)

### 2.四大核心模块

> 配置、功能、安全、数据库

从开发层面思考

- 配置（开发生产环境:数据库不同、是否热加载、打包规范...）

从功能层面思考

- 通用模块（用户、角色、菜单、部门、日志...）

从接口安全层面思考

- 接口文档、请求安全（DTO对用户请求数据进行赛选，安全请求头...）、性能...

### 3.多环境配置方案

- [dotenv](https://www.npmjs.com/package/dotenv) + [cross-env]()

    -  window 需要通过 cross-env 定义环境变量，就是普通环境变量，linux直接设置的

    ```javascript
    // package.json 
    // cross-env NODE_ENV=production node ./app.js 
    
    const dotenv = require('dotenv');
    
    // 根据环境加载对应的 .env 文件
    if (process.env.NODE_ENV === 'development') {
    	dotenv.config(); // 默认加载 .env
    } else {
    	dotenv.config({ path: '.env.test' }); //将 .env.test 配置信息写入到 process.env 环境变量中
    }
    ```

- [config]() + [js-yarm]()

- 
