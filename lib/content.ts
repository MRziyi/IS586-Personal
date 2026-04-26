import fs from "fs";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content");

export function getSiteConfig() {
  const configPath = path.join(contentDirectory, "site.json");
  const raw = fs.readFileSync(configPath, "utf8");
  return JSON.parse(raw) as {
    title: string;
    author: string;
    course: string;
    targetName: string;
    targetUrl: string;
    focusArea: string;
    repoUrl: string;
  };
}
