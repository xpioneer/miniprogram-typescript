var through = require('through2');

// 常量
const PLUGIN_NAME = 'gulp-px2rpx';


function px2rpx(contents) {
  const rpxStr = (contents.toString()).replace(/(\s?\d+)px/g, '$1rpx')
  return Buffer.from(rpxStr);
}


function gulpPx2rpx() {

  // 创建一个让每个文件通过的 stream 通道
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // 返回空文件
      cb(null, file);
    }
    if (file.isBuffer()) {
      file.contents = px2rpx(file.contents)
    }
    if (file.isStream()) {
      throw new Error(PLUGIN_NAME, 'Not support stream!');
    }

    cb(null, file);

  });

};

// 暴露（export）插件主函数
module.exports = gulpPx2rpx;