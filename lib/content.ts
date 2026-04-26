import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface Frontmatter {
  title: string;
  date?: string;
  phase?: string;
  status?: string;
  tags?: string[];
  relatedLinks?: { label: string; url: string }[];
  [key: string]: unknown;
}

export interface ContentFile {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

export function getContentFile(filePath: string): ContentFile | null {
  const fullPath = path.join(contentDirectory, filePath);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const slug = path.basename(filePath, path.extname(filePath));

  return {
    slug,
    frontmatter: data as Frontmatter,
    content,
  };
}

export function getContentFiles(dirPath: string): ContentFile[] {
  const fullDir = path.join(contentDirectory, dirPath);
  if (!fs.existsSync(fullDir)) return [];

  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const filePath = path.join(dirPath, file);
      return getContentFile(filePath);
    })
    .filter((f): f is ContentFile => f !== null)
    .sort((a, b) => {
      const dateA = a.frontmatter.date ? new Date(a.frontmatter.date).getTime() : 0;
      const dateB = b.frontmatter.date ? new Date(b.frontmatter.date).getTime() : 0;
      return dateB - dateA;
    });
}

export function getSiteConfig() {
  const configPath = path.join(contentDirectory, "site.json");
  const raw = fs.readFileSync(configPath, "utf8");
  return JSON.parse(raw) as {
    title: string;
    teamName: string;
    members: { name: string; role: string }[];
    targetName: string;
    targetUrl: string;
    repoUrl: string;
    timesheetUrl: string;
    forumThreadUrl: string;
    deploymentUrl: string;
    consultingRate: number;
    currency: string;
  };
}

export function getAllPhases(): ContentFile[] {
  const phases = ["3a", "3b", "3c", "3d", "3e", "3f"];
  return phases
    .map((p) => getContentFile(`phases/${p}.md`))
    .filter((f): f is ContentFile => f !== null);
}

export function getLatestUpdate(): ContentFile | null {
  const updates = getContentFiles("updates");
  return updates.length > 0 ? updates[0] : null;
}
