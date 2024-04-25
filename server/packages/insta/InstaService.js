import {Browser, Builder, By, Key, until} from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from "node:fs";
import {fileURLToPath} from 'url';
import axios from "axios";
import * as path from "path";

class InstaService {
    download_image(url, image_path) {
        axios({
            url,
            responseType: 'stream',
        }).then(
            response =>
                new Promise((resolve, reject) => {
                    response.data
                        .pipe(fs.createWriteStream(image_path))
                        .on('finish', () => resolve())
                        .on('error', e => reject(e));
                }),
        );
    }

    async getImagesByUsername(username) {
        const postsUrl = []
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const driver = await new Builder().forBrowser(Browser.CHROME)
            .setChromeOptions(new chrome.Options().addArguments('--headless=new'))
            .build()
        try {
            await driver.get(`https://www.instagram.com/accounts/login/?next=%2F${username}%2F&source=desktop_nav`)
            await driver.wait(until.elementLocated(By.xpath('//input[@name = \'username\']')), 5 * 1000)
            await driver.findElement(By.xpath('//input[@name = \'username\']')).sendKeys('moskvatriodin')
            await driver.findElement(By.xpath('//input[@name = \'password\']')).sendKeys('Rock26052', Key.RETURN)
            await driver.sleep(5000)
            await driver.get(`https://www.instagram.com/${username}`)
            await driver.wait(until.elementLocated(By.className('_aagv')), 5 * 1000)
            await driver.sleep(5000)
            const temp = await driver.findElements(By.className('_aagv'))
            let idx = 1
            for (const tempElement of temp) {
                if (idx > 10) {
                    break
                }
                const src = await tempElement.findElement(By.tagName('img')).getAttribute('src')
                postsUrl.push(src)
            }
        } finally {
            driver.close()
        }

        if (!fs.existsSync(path.join(__dirname + `/images/${username}`))) {
            fs.mkdirSync(path.join(__dirname + `/images/${username}`), {recursive: true});
        }
        for (let i = 0; i < postsUrl.length; i++) {
            const postUrl = postsUrl[i]
            const image_path = path.join(__dirname + `/images/${username}/` + i + '.jpg')
            this.download_image(postUrl, image_path)
        }
        return postsUrl
    }

    async getTotalImageCount(username) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const dir = path.join(__dirname + `/images/${username}`)
        if (!fs.existsSync(dir)) {
            await this.getImagesByUsername(username)
        }
        return fs.readdirSync(dir).length
    }
}

export default new InstaService()