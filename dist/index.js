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
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function question(query) {
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
        });
    });
}
function createPackageJson(projectName, description) {
    const packageJson = {
        name: projectName,
        version: '1.0.0',
        description: description,
        main: 'dist/index.js',
        scripts: {
            build: 'tsc',
            scrape: 'ts-node src/scraper/index.ts',
            crawl: 'ts-node src/crawler/index.ts',
            'prisma:generate': 'prisma generate',
            'prisma:migrate': 'prisma migrate dev',
        },
        keywords: ['crawler', 'scraper', 'typescript', 'boilerplate'],
        author: '',
        license: 'MIT',
        dependencies: {
            '@prisma/client': '^5.10.2',
            cheerio: '^1.0.0-rc.12',
            puppeteer: '^22.3.0',
            'cli-progress': '^3.12.0',
        },
        devDependencies: {
            '@types/cli-progress': '^3.11.5',
            '@types/node': '^20.11.24',
            prisma: '^5.10.2',
            'ts-node': '^10.9.2',
            typescript: '^5.3.3',
        },
    };
    fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));
}
function createDirectory(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}
function copyTemplateFiles() {
    const currentDir = process.cwd();
    // Create directory structure
    createDirectory(path.join(currentDir, 'src/crawler/utils'));
    createDirectory(path.join(currentDir, 'src/scraper/utils'));
    createDirectory(path.join(currentDir, 'prisma'));
    // Create initial files
    const files = {
        'src/crawler/index.ts': `import puppeteer from "puppeteer";
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
`,
        'src/crawler/utils/utils.ts': `import cliProgress from 'cli-progress';

export function createProgressBar() {
  return new cliProgress.SingleBar({
    format: 'Progress |{bar}| {percentage}% || {value}/{total} Pages',
    barCompleteChar: '\\u2588',
    barIncompleteChar: '\\u2591',
  });
}
`,
        'src/scraper/index.ts': `import * as cheerio from "cheerio";
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
`,
        'src/scraper/utils/utils.ts': `import cliProgress from 'cli-progress';

export function createProgressBar() {
  return new cliProgress.SingleBar({
    format: 'Progress |{bar}| {percentage}% || {value}/{total} Items',
    barCompleteChar: '\\u2588',
    barIncompleteChar: '\\u2591',
  });
}
`,
        'prisma/schema.prisma': `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Add your models here
`,
        'docker-compose.yml': `version: '3.8'
services:
  postgres:
    image: postgres:latest
    environment:
      POSTGRES_USER: \${POSTGRES_USER}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
      POSTGRES_DB: \${POSTGRES_DB}
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
`,
        '.env': `DATABASE_URL="postgresql://postgres:password@localhost:5432/crawler_db?schema=public"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=crawler_db
`,
        'tsconfig.json': `{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "lib": ["es2018", "dom"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
`,
        '.gitignore': `/node_modules
/dist
.env
.env.*
`,
        '.prettierrc': `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
`,
    };
    for (const [filePath, content] of Object.entries(files)) {
        fs.writeFileSync(path.join(currentDir, filePath), content);
    }
}
async function main() {
    try {
        const defaultProjectName = process.argv[2] || 'ts-crawler-project';
        const projectName = (await question(`Project name: (${defaultProjectName}) `)) ||
            defaultProjectName;
        const description = (await question('Project description: ')) ||
            'A TypeScript crawler/scraper project';
        console.log(`\nCreating new TypeScript crawler project: ${projectName}`);
        // Create project directory
        createDirectory(projectName);
        process.chdir(projectName);
        // Create package.json with user input
        createPackageJson(projectName, description);
        // Copy template files
        copyTemplateFiles();
        // Initialize git
        (0, child_process_1.execSync)('git init');
        // Install dependencies
        console.log('Installing dependencies...');
        (0, child_process_1.execSync)('npm install');
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
    catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
    finally {
        rl.close();
    }
}
main();
