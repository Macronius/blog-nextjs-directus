// js library
import {cache} from 'react'
// js library framework
import { notFound } from "next/navigation";
// components
import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-lists";
import { Post } from "@/types/collection";
// dependencies
import directus from "@/lib/directus";

// LL:09
// LL:12
export const getCategoryData = cache(async (categorySlug: string, locale: string) => {
  try {
    const category = await directus.items("category").readByQuery({
      filter: {
        // set category based on slug value
        slug: {
          _eq: categorySlug,
        },
      },
      fields: [
        "*",
        "translations.*",
        "posts.*",
        "posts.author.id",
        "posts.author.first_name",
        "posts.author.last_name",
        "posts.category.id",
        "posts.category.title",
        "posts.translations.*",
      ],
    });
    //
    const fetchedCategory = category?.data?.[0];
    if (locale === "en") {
      return fetchedCategory;
    } else {
      const localisedCategory = {
        ...fetchedCategory,
        title: fetchedCategory.translations[0].title,
        description: fetchedCategory.translations[0].description,
        posts: fetchedCategory.posts.map((post: any) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            category: {
              ...post.category,
              title: fetchedCategory.translations[0].title,
            },
          };
        }),
      };
      return localisedCategory;
    }
  } catch (err) {
    // console.log(err);
    console.log(
      "Uh oh, from: app > [lang] > [category] > page.tsx > getCategoryData"
    );
    // throw new Error("Error getting category data");
  }
});

// generate dynamic metadata function
export const generateMetadata = async ({
  params: { category, lang },
}: {
  params: { category: string; lang: string };
}) => {
  //
  const urlPath = process.env.NEXT_PUBLIC_SITE_URL;
  // get data from directus: using parameter language and category
  const categoryData = await getCategoryData(category, lang);
  //
  return {
    // option to return brandname with page title, or just page title w/out brand name
    title: categoryData?.title,
    // LL:14
    // title: {
    //   absolute: categoryData?.title,
    // },
    description: categoryData?.description,
    openGraph: {
      title: categoryData?.title,
      description: categoryData?.description,
      url: `${urlPath}/${lang}/${category}`,
      siteName: categoryData?.title,
      // images: [
      //   {
      //     url: `${urlPath}/${lang}${category}/opengraph-image.png`,
      //     width: 800,
      //     height: 600,
      //   },
      // ],
      locale: lang,
      type: 'website',
    },
    alternates: {
      canonical: `${urlPath}/${category}`,
      languages: {
        'en-US': `${urlPath}/en${category}`,
        'de-DE': `${urlPath}/de${category}`,
      },
    },
  };
};

// LL:07
export const generateStaticParams = async () => {
  //
  try {
    const categories = await directus.items("category").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });
    //
    const params = categories?.data?.map((category) => {
      return {
        category: category.slug as string,
        lang: "en",
      };
    });
    //
    const localisedParams = categories?.data?.map((category) => {
      return {
        category: category.slug as string,
        lang: "de",
      };
    });
    //
    const allParams = params?.concat(localisedParams ?? []);
    //
    return allParams || [];
  } catch (err) {
    // console.log(err);
    console.log(
      "Uh oh, from: app > [lang] > [category] > page.tsx > generateStaticParams"
    );
    // throw new Error("Error fetching category data");
  }
};

//
const Page = async ({
  params,
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  // get parameter arguments for getCategoryData from directus function call
  const categorySlug = params.category;
  const locale = params.lang;
  // Call the getCategoryData function
  const category = await getCategoryData(categorySlug, locale);
  // check if category data
  if (!category) {
    notFound();
  }

  // LL:08
  interface CorrectedCategoryType {
    id: string;
    title: string;
    description: string;
    slug: string;
    posts: Post[];
  }
  const typeCorrectedCategory = category as unknown as CorrectedCategoryType;
  // const typeCorrectedCategory = category as unknown as {
  //   id: string;
  //   title: string;
  //   description: string;
  //   slug: string;
  //   posts: Post[];
  // };

  //
  return (
    <PaddingContainer>
      <div className="mb-6">
        <h1 className="text-4xl font-semibold">
          {typeCorrectedCategory?.title}
        </h1>
        <p className="text-xl text-neutral-600">
          {typeCorrectedCategory?.description}
        </p>
      </div>
      <PostList locale={locale} posts={typeCorrectedCategory.posts} />
    </PaddingContainer>
  );
};

export default Page;
