//https://www.bilibili.com/video/BV15r4y1M7eT

const puppeteer = require("puppeteer");
const path = require("path");
const srcToImg = require("./utils/srcToImg");
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch({
        // slowMo: 500,
        devtools: true,
    });
    //const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://image.baidu.com");
    await page.focus("#kw"); //聚焦 #kw
    await page.keyboard.sendCharacter("辉和科技999f");
    await page.click(".s_newBtn"); //百度的搜索按钮class
    console.log("跳转搜索");


    //页面完成加载操作
    page.on("load", async () => {
        //分析页面,evaluate里的console会在打开的谷歌控制台中打印
        let result = await page.evaluate(async () => {
            const images = document.getElementsByClassName("main_img") ;

            return [...images].map((img) => img.src);
        });

        // if(!hasImgDir){
        //     fs.mkdirSync(path.resolve(__dirname, "img"));
        // }
        result.map(async (item) => {
            await srcToImg(item, path.resolve(__dirname, "img"));
        });
    });
})();
