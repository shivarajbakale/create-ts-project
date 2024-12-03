#!/usr/bin/env node
// index.js

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function main() {
  const projectName = process.argv[2];

  if (!projectName) {
    console.error(
      "Please provide a project name: create-ts-template <project-name>"
    );
    process.exit(1);
  }

  const description = await askQuestion("Project description: ");

  // Create project directory
  fs.mkdirSync(projectName);
  process.chdir(projectName);

  // Initialize package.json
  const packageJson = {
    name: projectName,
    version: "1.0.0",
    description: description,
    main: "dist/index.js",
    scripts: {
      start: "ts-node src/index.ts",
      build: "tsc",
      dev: "ts-node-dev --respawn src/index.ts",
      test: "jest",
    },
  };

  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

  // Create tsconfig.json
  const tsConfig = {
    compilerOptions: {
      target: "es2020",
      module: "commonjs",
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      outDir: "./dist",
      rootDir: "./src",
    },
    include: ["src/**/*"],
    exclude: ["node_modules"],
  };

  fs.writeFileSync("tsconfig.json", JSON.stringify(tsConfig, null, 2));

  // Create src directory and index.ts
  fs.mkdirSync("src");
  const indexContent = `const greeting = (name: string): string => {
  return \`Hello, \${name}!\`;
};

console.log(greeting("World"));
`;

  fs.writeFileSync("src/index.ts", indexContent);

  // Install dependencies
  console.log("Installing dependencies...");
  execSync(
    "npm install typescript @types/node ts-node ts-node-dev --save-dev",
    { stdio: "inherit" }
  );

  console.log(`\nProject ${projectName} created successfully!`);
  console.log("To get started:");
  console.log(`cd ${projectName}`);
  console.log("npm start");

  rl.close();
}

main().catch(console.error);
