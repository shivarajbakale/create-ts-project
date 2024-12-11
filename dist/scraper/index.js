"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils/utils");
async function main() {
    console.log("Scraper started");
    const progressBar = (0, utils_1.createProgressBar)();
    // Add your scraping logic here
}
main().catch((error) => {
    console.error("Error:", error);
    process.exit(1);
});
