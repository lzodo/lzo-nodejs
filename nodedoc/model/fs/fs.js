var fs = require("fs");
var path = __dirname;

//文件夹的增删改查
fs.mkdir(path + "/oldmkdir", (err) => {
    if (!err) {
        console.log("创建成功");
        setTimeout(() => {
            fs.rename(path + "/oldmkdir", path + "/newmkdir", (err) => {
                if (!err) {
                    console.log("修改成功");
                    setTimeout(() => {
                        fs.rmdir(path + "/newmkdir", (err) => {
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
    }
});

fs.readdir(path, (err, dirs) => {
    //读取文件夹的文件和文件夹
    if (!err) {
        console.log(dirs);
    } else {
        console.log(err);
    }
});

fs.stat(path + "/read-fs.js", (err, stats) => {
    //检查path是文件还是文件夹
    console.log(stats.isFile());
});

//文件的增删改查
fs.writeFile(path + "/file.txt", "file内容", (err) => {
    if (!err) {
        console.log("写入成功");
        setTimeout(() => {
            fs.appendFile(path + "/file.txt", ",追加内容", (err) => {
                if (!err) {
                    console.log("追加成功");
                    setTimeout(() => {
                        fs.readFile(path + "/file.txt", "utf8", (err, res) => {
                            if (!err) {
                                console.log(res);
                                fs.unlink(path + "/file.txt", (err) => {
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
