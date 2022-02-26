var fs = require("fs");
var path = require("path");
var base_path = path.resolve(__dirname, "../testfiles");

//文件夹的增删改查，参数错误优先，有回调的异步操作演示
fs.mkdir(base_path + "/oldmkdir", (err) => {
    if (!err) {
        console.log("创建成功");
        setTimeout(() => {
            //可修改文件与文件夹名
            fs.rename(base_path + "/oldmkdir", base_path + "/newmkdir", (err) => {
                if (!err) {
                    console.log("修改成功");
                    setTimeout(() => {
                        fs.rmdir(base_path + "/newmkdir", (err) => {
                            if (!err) {
                                console.log("删除空文件夹成功");
                            } else {
                                console.log("删除失败");
                            }
                        });
                    }, 3000);
                } else {
                    console.log("修改错误");
                }
            });
        }, 3000);
    } else {
        console.log(err);
    }
});

//读取文件夹的文件和文件夹
gitAllFiles(base_path)
function gitAllFiles(base_path) {
    fs.readdir(base_path, { withFileTypes: true }, (err, dirs) => {
        if (!err) {
            dirs.forEach((file) => {
                if (file.isDirectory()) {
                    gitAllFiles(path.resolve(base_path,file.name))
                } else {
                    console.log(file.name);
                }
            })
        } else {
            console.log(err);
        }
    });
}

fs.existsSync(base_path + "/read-fs.js"); //同步判断文件或文件夹是否存在

fs.stat(base_path + "/read-fs.js", (err, stats) => {
    //检查path是文件还是文件夹
    if (err) {
        console.log("err");
        return;
    }
    console.log(stats.isFile());
    console.log(stats.isDirectory());
});

//文件的增删改查
fs.writeFile(base_path + "/file.txt", "file内容", (err) => {
    if (!err) {
        console.log("写入成功");
        setTimeout(() => {
            fs.appendFile(base_path + "/file.txt", ",追加内容", (err) => {
                if (!err) {
                    console.log("追加成功");
                    setTimeout(() => {
                        fs.readFile(base_path + "/file.txt", "utf8", (err, res) => {
                            if (!err) {
                                //设置utf8参数或res.toString()可以将默认读取的buffer转正常文字
                                console.log(res);
                                fs.unlink(base_path + "/file.txt", (err) => {
                                    if (!err) {
                                        console.log("删除文件成功");
                                    } else {
                                        console.log("删除文件失败");
                                    }
                                });
                            } else {
                                console.log("读取失败");
                            }
                        });
                    }, 3000);
                } else {
                    console.log("追加错误");
                }
            });
        }, 3000);
    }
});

//加Sync表示同步， 异步是aSync
fs.writeFileSync(base_path + "/fileSync.txt", "file内容f");

//监听文件变化
fs.watchFile(base_path + "/fileSync.txt", (err) => {
    console.log("文件发送变化了");
});

//复制文件
// fs.copyFileSync(path1,path2)