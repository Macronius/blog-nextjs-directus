import React from "react";

import Link from "next/link";
import Image from "next/image";
// types
import { Post } from "@/types/collection";
// components
import PostContent from "./post-content";
import { getDictionary } from "@/lib/getDictionary";

interface PostProps {
  post: Post;
  layout?: "vertical" | "horizontal";
  reverse?: boolean;
  locale: string;
}

const PostCard = async ({
  post,
  layout = "horizontal",
  reverse = false,
  locale
}: PostProps) => {
  //
  return (
    <Link
      href={`/${locale}/post/${post.slug}`}
      className={`@container ${
        layout === "horizontal"
          ? "grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          : "space-y-10"
      }`}
    >
      <Image
        // src={post.image}
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimised`}
        alt={post.title}
        width={600}
        height={300}
        className={`rounded-md w-full object-cover object-center h-full max-h-[300px] ${reverse ? "md:order-last" : ""}`}
      />
      {/* post content */}
      {/* ts-expect-error Async Server Component */}
      <PostContent locale={locale} post={post} />
    </Link>
  );
};

export default PostCard;
