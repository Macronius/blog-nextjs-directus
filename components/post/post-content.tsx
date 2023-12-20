import { ArrowRight } from "lucide-react";
import { Post } from "../../types/collection";
import { getReadingTime, getRelativeDate } from "@/lib/helpers";
import { getDictionary } from "@/lib/getDictionary";

interface PostContentProps {
  post: Post;
  isPostPage?: boolean;
  locale: string;
}

const PostContent = async ({
  post,
  isPostPage = false,
  locale,
}: PostContentProps) => {
  //
  const dictionary = await getDictionary(locale);
  //
  return (
    <div className="space-y-2">
      {/* Tags */}
      <div
        className={`flex items-center flex-wrap gap-2 text-neutral-400 ${
          isPostPage ? "text-sm" : "text-xs @md:text-sm"
        }`}
      >
        <div
          className={`font-medium ${
            post.category.title === "Cities"
              ? "text-emerald-600"
              : "text-indigo-600"
          }`}
        >
          {post.category.title}
        </div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div className="">{`${post.author.first_name} ${post.author.last_name}`}</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div>{getReadingTime(post.body, locale)}</div>
        <div className="w-2 h-2 rounded-full bg-neutral-200" />
        <div className="">{getRelativeDate(post.date_created, locale)}</div>
      </div>
      {/* Title */}
      <h2
        className={`${
          isPostPage
            ? "text-2xl md:text-3xl lg:text-4x font-extrabold"
            : "@lg:text-3xl text-xl @md:text-2xl font-semibold"
        }`}
      >
        {post.title}
      </h2>
      {/* Description */}
      <p className="text-base @lg:text-lg leading-snug text-neutral-600">
        {post.description}
      </p>
      {!isPostPage && (
        <div className="flex items-center gap-2 text-sm pt-4">
          {dictionary.buttons.readMore}
          <ArrowRight size={12} className="-rotate-45" />
        </div>
      )}
    </div>
  );
};

export default PostContent;
