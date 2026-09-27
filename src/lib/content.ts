import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const toolsDirectory = path.join(process.cwd(), 'src/content/tools');

export interface ToolFrontmatter {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  shortDescription: string;
  icon: string;
  seoTitle: string;
  metaDesc: string;
  componentName: string;
}

export function getAllToolSlugs(): string[] {
  const fileNames = fs.readdirSync(toolsDirectory);
  return fileNames.map(fileName => fileName.replace(/\.mdx$/, ''));
}

export function getToolData(slug: string): { frontmatter: ToolFrontmatter, content: string } | null {
  try {
    const fullPath = path.join(toolsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { frontmatter: data as ToolFrontmatter, content };
  } catch (e) {
    return null;
  }
}

export function getAllTools(): ToolFrontmatter[] {
  const slugs = getAllToolSlugs();
  return slugs.map(slug => {
    const data = getToolData(slug);
    return data?.frontmatter;
  }).filter(Boolean) as ToolFrontmatter[];
}

const guidesDirectory = path.join(process.cwd(), 'src/content/guides');

export interface GuideFrontmatter {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  shortDescription: string;
  seoTitle: string;
  metaDesc: string;
  publishedAt: string;
}

export function getAllGuideSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(guidesDirectory);
    return fileNames.map(fileName => fileName.replace(/\.mdx$/, ''));
  } catch (e) {
    return [];
  }
}

export function getGuideData(slug: string): { frontmatter: GuideFrontmatter, content: string } | null {
  try {
    const fullPath = path.join(guidesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { frontmatter: data as GuideFrontmatter, content };
  } catch (e) {
    return null;
  }
}

export function getAllGuides(): GuideFrontmatter[] {
  const slugs = getAllGuideSlugs();
  return slugs.map(slug => {
    const data = getGuideData(slug);
    return data?.frontmatter;
  }).filter(Boolean) as GuideFrontmatter[];
}
