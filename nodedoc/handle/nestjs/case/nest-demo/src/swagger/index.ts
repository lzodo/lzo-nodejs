// swagger
import type { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';

// const theme = new SwaggerTheme('v3');
const theme = new SwaggerTheme();
const darkStyle = theme.getBuffer(SwaggerThemeNameEnum.DARK); // 内置6种主题: dark, material, monokai 等

export const setupSwagger = (app: NestExpressApplication) => {
  // swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Toimc Nestjs Template Swagger')
    .setDescription('Nestjs backend API')
    .setVersion('1.0')
    .addTag('beta')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document, {
    customCss: darkStyle.toString(),
    customSiteTitle: '我的API文档', // 修改标题
    explorer: true, // 启用搜索框
    swaggerOptions: {
      filter: true, // 显示过滤输入框
      persistAuthorization: true, // 保持认证token
      layout: 'StandaloneLayout', // 改用紧凑布局
      tagsSorter: 'alpha', // 标签排序
      operationsSorter: 'method', // 接口按HTTP方法排序
    },
  });
};
