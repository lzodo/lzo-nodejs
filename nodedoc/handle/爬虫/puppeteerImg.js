//http://www.r9it.com/20171106/puppeteer.html

const puppeteer = require("puppeteer");
const readline = require("readline");
const { geturl } = require("./index");

function readSyncByRl(tips) {
    tips = tips || "> ";

    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question(tips, (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
}

//创建一个浏览器实例 Browser 对象
puppeteer
    .launch({
        ignoreHTTPSErrors: true,
        headless: false,
        slowMo: 250,
        timeout: 0,
    })
    .then(async (browser) => {
        //创建页面 Page 对象
        let page = await browser.newPage();
        await page.setJavaScriptEnabled(true);

        await page.goto("https://www.jd.com/");
        const searchInput = await page.$("#key"); //通过 id：key找到查询的输入框
        await searchInput.focus(); //定位到搜索框

        let userenter = await readSyncByRl("请输入任意字符：");
        await page.keyboard.type(userenter); //输入关键字
        const searchBtn = await page.$(".button"); //点击搜索按钮
        await searchBtn.click(); //点击操作

        let pageList = await browser.pages();
        pageList.map((item) => {
            let iurl = item.url();
            if (/^http/.test(iurl)) {
                geturl(iurl, "/" + userenter);
            }
        });

        geturl();
    });
