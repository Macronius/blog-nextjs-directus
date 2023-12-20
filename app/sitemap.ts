import directus from "@/lib/directus";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // declare the base url
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL as string;

  // get posts
  const posts = await directus.items("post").readByQuery({
    fields: ["slug", "date_updated"],
  });
  // return array of array of post-links objects
  const postLinks = posts.data?.map((post) => {
    return [
        { 
            url: `${baseURL}/en/${post.slug}`, 
            lastModified: new Date(post.date_updated) 
        }, 
        {
            url: `${baseURL}/de/${post.slug}`,
            lastModified: new Date(post.date_updated)
        },
        {
            url: `${baseURL}/${post.slug}`,
            lastModified: new Date(post.date_updated)
        },
    ];
  });

  // get categories
  const categories = await directus.items("category").readByQuery({
    fields: ["slug", "date_updated"],
  });
  //
  const categoryLinks = categories.data?.map( category => {
    // ER:02
    return [
        {
            url: `${baseURL}/en/${category.slug}`,
            lastModified: new Date()
        },
        {
            url: `${baseURL}/de/${category.slug}`,
            lastModified: new Date()
        },
        {
            url: `${baseURL}/${category.slug}`,
            lastModified: new Date()
        },
    ]
  });

  // combine
  const dynamicLinks = postLinks?.concat(categoryLinks ?? []).flat() ?? [];
//   console.log(dynamicLinks)
// LL: 15

  // return both static and dynamic links for sitemap
  return [
    {
      url: baseURL,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/en`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/de`,
      lastModified: new Date(),
    },
    ...dynamicLinks,
  ];
}
