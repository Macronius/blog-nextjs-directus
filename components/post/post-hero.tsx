import { Post } from "@/types/collection";
import PostContent from "./post-content";
import Image from "next/image";

interface PostHeroProps {
  post: Post;
  locale: string
}

const PostHero = ({ post, locale }: PostHeroProps) => {
  return (
    <div>
      {/* this is prop-drilling, right? */}
      <PostContent locale={locale} post={post} isPostPage={true} />
      {/* NOTE: if value true, only required to write prop name */}
      <Image
        priority
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}?key=optimised`}
        alt={post.title}
        width={1280}
        height={500}
        className="rounded-md object-cover object-center h-[300px] md:h-[500px] mt-6"
      />
    </div>
  );
};

export default PostHero;
