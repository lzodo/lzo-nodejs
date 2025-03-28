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

- [config]() + [js-yaml]()  + [cross-env]()

    ```javascript
    // config/default.json
    {
      "db": {
        "host": "localhost",
        "prot": "3000"
      }
    }
    // config/production.js
    {
      "db": {
        "host": "192.168.203.132"
      }
    }
    // 如何是 yaml 配置文件
    // config/production.yaml
    db:
    	host:"192.168.203.132"
    
    
    // =======使用 
    // cross-env NODE_ENV=production 运行
    const config = require('config'); 
    import * as config from 'config'
    
    const dbConfig = config.get('db');
    console.log(dbConfig);
    {
        "host": "192.168.203.132"
        "prot": "3000"
     }
    ```

- nestjs 的环境配置 `@nestjs/config`



## 8、数据库

### 数据库设计

#### 三大范式

- 原子性：要求属性具有原子性，不可再分解（将表扁平化）
- 唯一性：要求记录有唯一标识，不存在部分依赖（用户表添加角色字段，角色字段有自己的角色编码，角色名称，角色id，是不合适的）
    - 细分之下会产生很多关联关系
- 冗余性：要求任何字段不能由其他自动派生（比如将学号与学院电话放在同一张表）

#### ER图



### 表关系

`一对一`，`一对多`，`多对多`

### 表设计

> 参考：https://open.yesapi.cn/list.html

### 索引

> 数据库索引是提高数据库查询性能的重要机制，它类似于书籍的目录，可以快速定位数据而无需扫描整个表。

索引是一种特殊的数据结构，它包含表中一列或多列的值以及指向这些值所在数据行的物理位置的指针。当数据库执行查询时，可以先在索引中找到目标数据的位置，然后直接访问这些位置，而不必扫描整个表。

**表的主键自带索引**



### TypeORM

> 对象关系映射器 (ORM)

[TypeORM中文网](https://www.typeorm.org/) [官网](https://nest.nodejs.cn/techniques/database)

#### TypeORM 生成器

> 根据已有数据生成模型

[typeorm-model-generator](https://www.npmjs.com/package/typeorm-model-generator)

#### DI系统，原理部分

先看下nestjs的工作原理

```javascript
/**
 * DI容器切片思想，工作原理
 *  1、注册所有 @Injectable 注解的类 【如：AppService】
 *     @module 下 providers 中的类也会注册重点关注【我们正常业务中，类似 AppService 的类就是反正 provider里的】
 *  2、通过 Controller 了解类与类之前的依赖关系【AppController 中 constructor(private readonly appService: AppService) {}】
 *  3、NestJS会自动创建 @Injectable() 注解的类的实例【 AppController 中不需要 new 就能直接使用 】
 *    如果 AppController 下又遇到 @Injectable() 注解的类就重复上面的过程，全部类都储存在DI容器中
 *  4、NestJS 自动创建依赖关系的实例，按需进行调用
 */
```

<img src=".\statis\images\image-20250327223412463.png" alt="image-20250327223412463" style="zoom:80%;" />

- 在 `UserService` 注册 `TypeORM Repository`，就能在 `UserService` 使用它的 `create()` 、`find()` 等方法



### TypeORM QueryBuilder

> TypeORM 的 QueryBuilder 是一个强大的工具，允许你以编程方式构建 SQL 查询。它比使用简单的 find 方法提供了更多的灵活性和控制力。

```javascript
// 复杂语句转换 select logs.result,count(*) count from logs,user u WHERE u.id=logs.userId and u.id=1 GROUP BY logs.result ORDER BY logs.result DESC;

this.logsRepository
// 查询表logs
    .createQueryBuilder('logs')
// 查询属性 logs.result as 别名位result
    .select('logs.result', 'result')
// 添加聚合属性统计 result 分类的记录综合，并命别名位count
    .addSelect('count(logs.result)', 'count')
// 关联用户表, 并设置关联关系 logs.user 其实就是 userId，指向对应的用户
    .leftJoinAndSelect('logs.user', 'user')
// 找到指定id的用户
    .where('user.id = :id', { id })
// 分组
    .groupBy('logs.result')
// 排序,降序
    .orderBy('logs.result', 'DESC')
// 偏移
    .offset(1)
// 限制数量
    .limit(3)
// 结束
    .getRawMany()
```





## 9、日志

### 日志分类与应用场景

一般分类

- `log`：通用日志
- `warning`：警告日志
- `error`：严重错误日志
- `debug`：调试日志
- `verbose`：详细日志

功能分类

- 错误日志 - 定位问题
- 调试日志 - 方便开发
- 请求日志 - 记录敏感信息

日志位置

- 控制台（方便开发环境调试）
- 文件 （方便追踪）
- 数据库（敏感操作，敏感数据记录）

### Nestjs的日志推荐

<img src=".\statis\images\image-20250328152516480.png" alt="image-20250328152516480" style="zoom: 67%;" />

### 官方推荐的日志工具

#### [pino](https://www.npmjs.com/package/pino)

提供了对nestjs的支持 [nest-pino](https://github.com/pinojs/pino/blob/HEAD/docs/web.md#nest)

项目中只要导入了模块 `LoggerModule` 自动打印请求日志

开发环境日志美化 [pino-pretty]()

生产环境日志处理 [pino-roll]()

### [winston](https://www.npmjs.com/package/winston)

nest 可以用 [nest-winston](https://www.npmjs.com/package/nest-winston)
