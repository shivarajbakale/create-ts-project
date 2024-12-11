#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

function createDirectory(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyTemplateFiles() {
  const templateDir = path.join(__dirname, "templates");
  const currentDir = process.cwd();

  // Create directory structure
  createDirectory(path.join(currentDir, "src/crawler/utils"));
  createDirectory(path.join(currentDir, "src/scraper/utils"));
  createDirectory(path.join(currentDir, "prisma"));

  // Copy all template files
  // You'll need to implement the actual file copying logic here
  // This is just a placeholder for the concept
}

function main() {
  const projectName = process.argv[2] || "ts-crawler-project";

  console.log(`Creating new TypeScript crawler project: ${projectName}`);

  // Create project directory
  createDirectory(projectName);
  process.chdir(projectName);

  // Copy template files
  copyTemplateFiles();

  // Initialize git
  execSync("git init");

  // Install dependencies
  console.log("Installing dependencies...");
  execSync("npm install");

  console.log(`
Project ${projectName} created successfully!

To get started:
  cd ${projectName}
  npm run scrape   # To run the scraper
  npm run crawl    # To run the crawler

Don't forget to:
1. Update your .env file with your database credentials
2. Run 'docker-compose up -d' to start the database
3. Run 'npm run prisma:generate' to generate Prisma client
  `);
}

main();
