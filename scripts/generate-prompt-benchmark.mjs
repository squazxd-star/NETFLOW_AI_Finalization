import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.join(projectRoot, "benchmark-reports");
const reportJsonPath = path.join(outputDir, "prompt-regression-report.json");
const reportMdPath = path.join(outputDir, "prompt-regression-report.md");

const formatAggregate = (label, aggregate) => [
  `## ${label}`,
  `- Average Score: ${aggregate.averageScore}`,
  `- Min Score: ${aggregate.minScore}`,
  `- Max Score: ${aggregate.maxScore}`,
  `- Low Risk: ${aggregate.lowRiskCount}`,
  `- Medium Risk: ${aggregate.mediumRiskCount}`,
  `- High Risk: ${aggregate.highRiskCount}`,
  ""
].join("\n");

const formatCaseList = (title, cases) => {
  const lines = [`## ${title}`];
  for (const item of cases) {
    lines.push(`- ${item.id} | score=${item.score} | risk=${item.riskLevel} | issues=${item.issueCount} | topIssues=${item.topIssues.join("; ") || "none"}`);
  }
  lines.push("");
  return lines.join("\n");
};

let server;

try {
  server = await createServer({
    root: projectRoot,
    logLevel: "error",
    server: { middlewareMode: true },
    appType: "custom"
  });

  const benchmarkModule = await server.ssrLoadModule("/src/services/promptBenchmarkService.ts");
  const report = benchmarkModule.runPromptBenchmarkMatrix();

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(reportJsonPath, JSON.stringify(report, null, 2), "utf8");

  const markdown = [
    "# Prompt Regression Report",
    "",
    `- Generated At: ${report.generatedAt}`,
    `- Total Cases: ${report.totalCases}`,
    `- Templates: ${report.templates.join(", ")}`,
    `- Styles: ${report.styles.join(", ")}`,
    `- Scene Counts: ${report.sceneCounts.join(", ")}`,
    "",
    formatAggregate("Overall Aggregate", report.aggregate),
    ...Object.entries(report.byTemplate).flatMap(([key, aggregate]) => [formatAggregate(`Template: ${key}`, aggregate)]),
    ...Object.entries(report.byStyle).flatMap(([key, aggregate]) => [formatAggregate(`Style: ${key}`, aggregate)]),
    ...Object.entries(report.bySceneCount).flatMap(([key, aggregate]) => [formatAggregate(`Scene Count: ${key}`, aggregate)]),
    formatCaseList("Worst Cases", report.worstCases),
    formatCaseList("Best Cases", report.bestCases)
  ].join("\n");

  await fs.writeFile(reportMdPath, markdown, "utf8");

  console.log(JSON.stringify({
    reportJsonPath,
    reportMdPath,
    totalCases: report.totalCases,
    aggregate: report.aggregate,
    worstCases: report.worstCases.slice(0, 5),
    bestCases: report.bestCases.slice(0, 5)
  }, null, 2));
} finally {
  if (server) {
    await server.close();
  }
}
