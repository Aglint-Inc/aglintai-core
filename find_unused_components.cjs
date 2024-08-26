const fs = require("fs/promises");
const path = require("path");

async function getExportedComponents(indexFile) {
  const content = await fs.readFile(indexFile, "utf8");
  const exports = content.match(/export \* from "(.*?)";/g) || [];
  return exports.map((exp) => path.basename(exp.match(/"(.*?)"/)[1]));
}

async function searchComponentUsage(srcDir, components) {
  const usage = Object.fromEntries(components.map((comp) => [comp, false]));

  async function searchInFile(filePath) {
    const content = await fs.readFile(filePath, "utf8");
    components.forEach((component) => {
      if (content.includes(component)) {
        usage[component] = true;
      }
    });
  }

  async function walkDir(dir) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        await walkDir(filePath);
      } else if (/\.(ts|tsx|js|jsx)$/.test(file)) {
        await searchInFile(filePath);
      }
    }
  }

  await walkDir(srcDir);
  return usage;
}

function generateMarkdownTable(results) {
  let markdown = "| Component | Devlink Source | Used |\n";
  markdown += "|-----------|----------------|------|\n";

  results.forEach(({ devlink, usage }) => {
    Object.entries(usage).forEach(([component, used]) => {
      markdown += `| ${component} | ${devlink} | ${used ? "Yes" : "No"} |\n`;
    });
  });

  return markdown;
}

function generateMarkdownUnusedList(results) {
  let markdown = "\n## Unused Components\n\n";

  const unusedComponents = results.flatMap(({ devlink, usage }) =>
    Object.entries(usage)
      .filter(([_, used]) => !used)
      .map(([component]) => `- ${component} (${devlink})`)
  );

  markdown += unusedComponents.join("\n");
  return markdown;
}

async function main() {
  const srcDir = "apps/aglint-recruiter/src";
  const devlinkSources = [
    "apps/aglint-recruiter/devlink/index.d.ts",
    "apps/aglint-recruiter/devlink2/index.d.ts",
    "apps/aglint-recruiter/devlink3/index.d.ts",
  ];

  try {
    const results = await Promise.all(
      devlinkSources.map(async (indexFile) => {
        const components = await getExportedComponents(indexFile);
        const usage = await searchComponentUsage(srcDir, components);
        return { devlink: path.dirname(indexFile), usage };
      })
    );

    let markdown = "# Component Usage Report\n\n";
    markdown += generateMarkdownTable(results);
    markdown += generateMarkdownUnusedList(results);

    await fs.writeFile("component_usage_report.md", markdown);
    console.log("Report generated: component_usage_report.md");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
