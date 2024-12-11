import * as cheerio from "cheerio";
import { createProgressBar } from "./utils/utils";

async function main() {
  console.log("Scraper started");
  const progressBar = createProgressBar();
  // Add your scraping logic here
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
