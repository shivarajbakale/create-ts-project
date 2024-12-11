#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
function createDirectory(dir) {
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
    (0, child_process_1.execSync)("git init");
    // Install dependencies
    console.log("Installing dependencies...");
    (0, child_process_1.execSync)("npm install");
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
