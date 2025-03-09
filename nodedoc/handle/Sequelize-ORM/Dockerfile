# 使用官方 Node.js 镜像作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install --production

# 复制项目文件
COPY . . 

# 暴露端口（Express 应用监听的端口）
EXPOSE 5008

# 启动应用
CMD ["npm", "run", "start:test"]


# 项目根目录，构建镜像
# docker build -t express-orm .

# 创建容器
# docker run -d --name nodeorm -p 5008:5008 express-orm