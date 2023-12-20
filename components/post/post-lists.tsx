
import PostCard from "./post-card";
import {Post} from '../../types/collection';

interface PostListProps {
    posts: Post[],
    layout?: "vertical" | "horizontal",
    locale: string
}

const PostList = ({posts, layout = "vertical", locale}: PostListProps) => {
  return (
    // <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr gap-10">
      {
        posts.map( post => (
          <PostCard 
            key={post.id} 
            post={post} 
            layout={layout}
            locale={locale}
          />
        ))
      }
    </section>
  )
}

export default PostList