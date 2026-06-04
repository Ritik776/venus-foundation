import { Navigate, useParams } from "react-router-dom";
import { Article } from "@/components/blog/Article";
import { RelatedPosts } from "@/components/sections/BlogSections";
import { getPostBySlug, getRelated } from "@/content/blog";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useDocumentMeta({
    title: post ? `${post.title} — Venus Foundation Blog` : "Story not found",
    description: post?.excerpt,
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <Article post={post} />
      <RelatedPosts related={getRelated(post.slug)} />
    </>
  );
}
