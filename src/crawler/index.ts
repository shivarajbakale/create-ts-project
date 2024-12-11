import puppeteer from "puppeteer";
import { createProgressBar } from "./utils/utils";

async function main() {
  console.log("Crawler started");
  const browser = await puppeteer.launch();
  const progressBar = createProgressBar();

  try {
    // Add your crawling logic here
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
