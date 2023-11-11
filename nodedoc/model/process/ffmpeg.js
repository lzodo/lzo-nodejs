const { execSync } = require("child_process");
// 系统安装好 ffmpeg
// 直接run code运行如果找不到路径，可以在终端直接通过node执行

// 1、基本格式转换
execSync("ffmpeg -i ./src/test_source.mp4 ./output/test.gif", {
  stdio: "inherit", // 执行时输出过程
});

execSync("ffmpeg -i ./src/test_source.gif ./output/gif_to_mp4.mp4", {
  stdio: "inherit",
});

// 2、提取音频
execSync("ffmpeg -i ./src/test_source.mp4 ./output/test.mp3", {
  stdio: "inherit",
});

// 3、裁剪 截取从3秒到6秒的视频
execSync("ffmpeg -ss 3 -to 6 -i ./src/test_source.mp4 ./output/test2.mp4", {
  stdio: "inherit",
});

// 4、添加水印
execSync(
  "ffmpeg -i ./src/test_source.mp4  -vf drawtext=text='lzoxun':fontsize=30:x=10:y=10:fontcolor=red  ./output/drawtext.mp4",
  {
    stdio: "inherit", // 执行时输出过程
  }
);

// 5、删除水印, w宽度的水印文字大小*文字长度
// execSync(
//   "ffmpeg -i ./output/drawtext.mp4  -vf delogo=w=180:h=30:x=10:y=10 ./output/drawtext_clearLogo.mp4",
//   {
//     stdio: "inherit", // 执行时输出过程
//   }
// );
