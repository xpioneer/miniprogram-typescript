# Miniprogram-Typescript

### 简介
一款基于Typescript语言开发的微信小程序模板，使用gulp基于流构建，样式使用scss模块化开发，主要用来迁移样式，让我们方便快速的开发小程序

### 主要技术
* Typescript
* sass
* gulp
* uglify

### 使用

开发模式:

```sh
git clone git@github.com:xpioneer/miniprogram-typescript.git
cd miniprogram-typescript
yarn
yarn start
```

### 自动生成模块文件

```sh
#使用命令:
yarn gen:page login

#可以生成src/pages/目录下的login文件夹，并且初始化小程序的四个文件
```

### 构建

```sh
yarn build
```