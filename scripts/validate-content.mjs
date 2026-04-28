import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { extname } from "node:path";

const RAW_SOURCE_DIR = "SUPPORTING_SOURCE_MATERIAL_ORIGINALS/";
const APP_COPY_DIRS = ["src/"];
const TEXT_EXTENSIONS = new Set([
  ".css",
  ".html",
  ".json",
  ".md",
  ".mjs",
  ".toml",
  ".ts",
  ".tsx",
]);

const trackedFiles = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .split(/\r?\n/)
  .filter(Boolean)
  .map((file) => file.replaceAll("\\", "/"));

const failures = [];

for (const file of trackedFiles) {
  if (file.startsWith(RAW_SOURCE_DIR)) {
    failures.push(`Raw source material is tracked: ${file}`);
  }
}

const appCopy = readFiles(
  trackedFiles.filter((file) => APP_COPY_DIRS.some((dir) => file.startsWith(dir))),
).join("\n");

const requiredPillars = [
  "SmartSEA Intermodal APIs",
  "From screens to passenger information",
  "passenger information layer",
  "The value is not the screen",
  "Control",
  "React",
  "Extend",
  "CMS and screens are channels",
  "Connection risk",
  "Recovery action",
  "From static directions to dynamic, operational guidance",
  "The CMS publishes the message",
  "The data layer defines the message",
  "The SmartSEA role",
  "Invitation to engage",
  "Baggage status",
];

for (const pillar of requiredPillars) {
  if (!appCopy.includes(pillar)) {
    failures.push(`Missing required message pillar: "${pillar}"`);
  }
}

const forbiddenInAppCopy = [
  /prior engagement/i,
  /already engaged/i,
  /site visit/i,
  /we already know/i,
  /insider context/i,
  /internal context/i,
  /bid history/i,
  /CMS feed preview/i,
  /cmsPayload/i,
  /JSON\.stringify\(selectedScenario/i,
  /apiResponsePanel/i,
  /rawResponse/i,
  /response-preview/i,
  /json-response/i,
  /payload-panel/i,
  /payload-header/i,
  /feed-chips/i,
  /A word from our CEO/i,
  /Chief Executive Officer/i,
  /Kris Vedat/i,
  /Registered Office/i,
  /Correspondence Address/i,
  /INFO@SMART-SEA\.COM/i,
  /complete installation bid/i,
  /full-scope compliant tender offer/i,
  /cabling contractor/i,
  /Focused strategic proposal/i,
  /value-layer proposal/i,
  /TravelWise/i,
  /ongoing collaboration/i,
];

for (const pattern of forbiddenInAppCopy) {
  if (pattern.test(appCopy)) {
    failures.push(`App copy contains forbidden positioning language: ${pattern}`);
  }
}

const trackedText = readFiles(
  trackedFiles.filter(
    (file) => TEXT_EXTENSIONS.has(extname(file)) && file !== "scripts/validate-content.mjs",
  ),
).join("\n");

const confidentialLeakPatterns = [
  /Confidential Communication/i,
  /This Message Is From an External Sender/i,
  /Do not click on any links or open attachments/i,
  /URGENT\s*\/\/\//i,
  /@sita\.aero/i,
  /mail-thread\.txt/i,
];

for (const pattern of confidentialLeakPatterns) {
  if (pattern.test(trackedText)) {
    failures.push(`Tracked text contains possible internal/source leak: ${pattern}`);
  }
}

if (failures.length > 0) {
  console.error("Validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Content validation passed.");

function readFiles(files) {
  return files.map((file) => readFileSync(file, "utf8"));
}
