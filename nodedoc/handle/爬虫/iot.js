//http://www.r9it.com/20171106/puppeteer.html

const puppeteer = require("puppeteer");

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
        await page.setViewport({width:1365, height:620});

        await page.setJavaScriptEnabled(true);

        await page.goto("http://iot.huihezn.com/");

        const userInput = await page.$(".el-input__inner:nth-child(1)");
        await userInput.focus();
        await page.keyboard.type("root"); //输入关键字

        const pwdInput = await page.$("input[placeholder=密码]");
        await pwdInput.focus();
        await page.keyboard.type("1q2w3e"); //输入关键字

        const searchBtn = await page.$(".el-button"); //点击搜索按钮
        await searchBtn.click(); //点击操作

        let pageList = await browser.pages();
        page.on('load',async ()=>{
            const documentSize = await page.evaluate(() => {
                return {
                    width: document.documentElement.clientWidth,
                    height : document.body.clientHeight,
                }
            })
            console.log(documentSize)

            pageList.map(item=>{
                console.log(item.url())
            });
        })
    

        // await searchInput.keyboard.up('Enter')

        // page.close();

        // browser.close();
    });
