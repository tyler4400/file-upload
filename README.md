# Implement Large File Upload and Resume Feature

English | [中文](./README-zh_CN.md)

[Blog](https://medium.com/p/1ca551e43950)

> Node14 is recommended

To retry the upload, you need to delete the file in `/target` directory, otherwise the upload will succeed directly because the server cache the file

download demo file: https://v0c98mphqw.feishu.cn/file/boxcnZ34jCyQziXxsS9NaV0zfre


Frontend
* Vue@2
* Element-ui
* Blob#slice: file slice
* FileReader + WebWorker + spark-md5: create file hash
* xhr: send formData

Backend
* Nodejs@14
* multiparty: resolve formData

# start
启动前端
```shell
npm install
npm run dev
# or in production
npm run prod 
```
启动后端
```shell
cd server
npm install
npm run serve
```

# 部署流程
将client 和服务端代码分开来， 制作成镜像并部署
> 虽然client是个前端项目， 这里也当作后端项目来部署
1. 检出代码
2. 登录到TCR镜像服务平台
2. dockerfile制作镜像，并将镜像push到TCR
3. 替换dokcer-compose文件的版本信息
2. 将.env， docker-compose文件拷贝到cvm
3. 登录cvm， docker-compose up -d
