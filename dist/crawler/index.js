"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const utils_1 = require("./utils/utils");
async function main() {
    console.log("Crawler started");
    const browser = await puppeteer_1.default.launch();
    const progressBar = (0, utils_1.createProgressBar)();
    try {
        // Add your crawling logic here
    }
    finally {
        await browser.close();
    }
}
main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});
