# fs-i


[![NPM version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]
[![Build Status](https://travis-ci.org/heifade/fs-i.svg?branch=master)](https://travis-ci.org/heifade/fs-i)
[![Coverage Status](https://coveralls.io/repos/github/heifade/fs-i/badge.svg?branch=master)](https://coveralls.io/github/heifade/fs-i?branch=master)

[npm-image]: https://img.shields.io/npm/v/fs-i.svg?style=flat-square
[npm-url]: https://npmjs.org/package/fs-i
[downloads-image]: https://img.shields.io/npm/dm/fs-i.svg

# 源代码及文档
[源代码](https://github.com/heifade/fs-i)
[开发文档](https://heifade.github.io/fs-i/)

# 安装
```bash
npm install fs-i
```

# 介绍

# 方法总览
> getAllFiles 获取指定目录及子目录下的所有文件，返回数组
>
> getFiles 获取指定目录下的所有文件，返回数组
>
> getAllDirs 获取指定目录下的所有目录子目录，返回数组
>
> getDirs 获取指定目录下的所有目录，返回数组
>
> getFileName 从一个文件名称中获取文件名，（移除目录名）
>
> getFilePath 从一个文件名称中获取目录名，（移除文件名）




# 例子
例子1: 获取c盘根目录下所有文件，包含子目录
```js
    let fileList = await getAllFiles('c:/');
```

例子2: 获取c盘根目录下文件，不包含子目录
```js
    let fileList = await getFiles('c:/');
```

例子3：获取c盘根目录下的所有目录子目录
```js
    let fileList = await getAllDirs('c:/');
```

例子4：获取c盘根目录下的直接子目录
```js
    let fileList = await getDirs('c:/');
```

例子5：从一个文件名称中获取文件名，（移除目录名）
```js
    let fileName = await getFileName('c:/a/b/c/d.txt');
    返回 "d.txt"
```

例子6：从一个文件名称中获取目录名，（移除文件名）
```js
    let fileName = await getFilePath('c:/a/b/c/d.txt');
    返回 "c:/a/b/c"
```

