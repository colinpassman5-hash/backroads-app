import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");
const socialFile = path.join(dataDir, "backroads-social.json");

export type BackroadsComment = {
  id: string;
  postId: string;
  author: string;
  body: string;
  createdAt: string;
};

export type BackroadsPost = {
  id: string;
  author: string;
  title: string;
  summary: string;
  vibe: string[];
  obfuscatedStart: string;
  obfuscatedEnd: string;
  safetyRadiusMiles: number;
  likes: number;
  createdAt: string;
};

type SocialStore = {
  posts: BackroadsPost[];
  comments: BackroadsComment[];
};

async function readSocialStore(): Promise<SocialStore> {
  try {
    const raw = await readFile(socialFile, "utf8");
    const parsed = JSON.parse(raw) as SocialStore;
    return {
      posts: parsed.posts || [],
      comments: parsed.comments || []
    };
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === "ENOENT") {
      return { posts: [], comments: [] };
    }
    throw error;
  }
}

async function writeSocialStore(store: SocialStore) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(socialFile, JSON.stringify(store, null, 2));
}

export async function listCommunityPosts() {
  const store = await readSocialStore();
  return store.posts
    .map((post) => ({
      ...post,
      comments: store.comments.filter((comment) => comment.postId === post.id)
    }))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function addCommunityPost(input: {
  author: string;
  title: string;
  summary: string;
  vibe: string[];
  obfuscatedStart: string;
  obfuscatedEnd: string;
  safetyRadiusMiles: number;
}) {
  const store = await readSocialStore();
  const nextPost: BackroadsPost = {
    id: `post_${Date.now()}`,
    author: input.author,
    title: input.title,
    summary: input.summary,
    vibe: input.vibe,
    obfuscatedStart: input.obfuscatedStart,
    obfuscatedEnd: input.obfuscatedEnd,
    safetyRadiusMiles: input.safetyRadiusMiles,
    likes: 0,
    createdAt: new Date().toISOString()
  };
  store.posts.push(nextPost);
  await writeSocialStore(store);
  return nextPost;
}

export async function addCommunityComment(input: {
  postId: string;
  author: string;
  body: string;
}) {
  const store = await readSocialStore();
  const comment: BackroadsComment = {
    id: `comment_${Date.now()}`,
    postId: input.postId,
    author: input.author,
    body: input.body,
    createdAt: new Date().toISOString()
  };
  store.comments.push(comment);
  await writeSocialStore(store);
  return comment;
}
