import fs from 'fs/promises';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  keywords?: string[];
  author?: string;
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export async function getPosts(): Promise<BlogPost[]> {
  try {
    await fs.access(POSTS_DIR);
  } catch {
    return [];
  }

  const files = await fs.readdir(POSTS_DIR);
  const jsonFiles = files.filter((f) => f.endsWith('.json'));

  const posts: BlogPost[] = [];
  for (const file of jsonFiles) {
    try {
      const filePath = path.join(POSTS_DIR, file);
      const raw = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(raw) as BlogPost;
      const slug = data.slug ?? path.basename(file, '.json');
      posts.push({ ...data, slug });
    } catch (err) {
      console.warn(`[blog-posts] Skipping invalid post file: ${file}`, err);
    }
  }

  posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return posts;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, '');
  const filePath = path.join(POSTS_DIR, `${safeSlug}.json`);

  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(raw) as BlogPost;
    return { ...data, slug: data.slug ?? safeSlug };
  } catch {
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getPosts();
  return posts.map((p) => p.slug);
}
