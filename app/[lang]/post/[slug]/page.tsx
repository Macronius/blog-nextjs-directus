// javascript library
import { cache } from "react";
// javascript library framework
import { notFound } from "next/navigation";
// components
import PaddingContainer from "@/components/layout/padding-container";
import PostHero from "@/components/post/post-hero";
import SocialLink from "@/components/elements/social-links";
import PostBody from "@/components/post/post-body";
// import CTACard from "@/components/elements/cta-card-server";
import CTACard from "@/components/elements/cta-card-client";
// dependencies
import directus from "@/lib/directus";
import siteConfig from "@/config/site";
import {getDictionary} from "@/lib/getDictionary"

// define getPostData function in the Post page global scope
export const getPostData = cache(async (postSlug: string, locale: string) => {
  try {
    const post = await directus.items("post").readByQuery({
      filter: {
        slug: {
          _eq: postSlug,
        },
      },
      fields: [
        "*",
        "category.id",
        "category.title",
        "author.id",
        "author.first_name",
        "author.last_name",
        "translations.*",
        "category.translations.*",
      ],
    });
    //
    const postData = post.data?.[0];
    //
    if (locale === "en") {
      return postData;
    } else {
      const localisedPostData = {
        ...postData,
        title: postData?.translations?.[0].title,
        description: postData?.translations?.[0].description,
        body: postData?.translations?.[0].body,
        category: {
          ...postData?.category,
          title: postData?.category?.translations?.[0]?.title,
        },
      };
      //
      return localisedPostData;
    }
  } catch (err) {
    // console.log(err);
    console.log("Uh oh, from: app>[lang]>post>[slug]>page.tsx>Page");
    // throw new Error("Error fetching post data");
  }
});

// Generate the Metadata function
export const generateMetadata = async ({
  params: { slug, lang },
}: {
  params: { slug: string; lang: string };
}) => {
  // retrieve localized post data from directus
  const post = await getPostData(slug, lang);
  //
  const urlPath = process.env.NEXT_PUBLIC_SITE_URL;
  //
  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
      url: `${urlPath}/${lang}/post/${slug}`,
      siteName: post?.title,
      // images: [
      //   {
      //     url: `${urlPath}/${lang}/post/${slug}/opengraph-image.png`,
      //     width: 800,
      //     height: 600,
      //   },
      // ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${urlPath}/post/${slug}`,
      languages: {
        "en-US": `${urlPath}/en/post/${slug}`,
        "de-DE": `${urlPath}/de/post/${slug}`,
      },
    },
  };
};

// Generate the STATIC PARAMS function
export const generateStaticParams = async () => {
  //
  try {
    const posts = await directus.items("post").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });
    //
    const params = posts.data?.map((post) => {
      return { slug: post.slug as string, lang: "en" };
    });
    //
    const localisedParams = posts?.data?.map((post) => {
      return {
        slug: post.slug as string,
        lang: "de",
      };
    });
    // concatenate localised with default params
    const allParams = params?.concat(localisedParams ?? []);
    //
    return allParams || [];
  } catch (err) {
    // console.log(err);
    console.log(
      "Uh oh, from: app>[lang]>post>[slug]>page.tsx>generateStaticParams"
    );
    // throw new Error("Error fetching individual post data");
  }
};

const Page = async ({ params }: { params: { slug: string; lang: string } }) => {
  const publicURL = process.env.NEXT_PUBLIC_SITE_URL;

  //
  const locale = params.lang;
  const postSlug = params.slug;

  // getPostData function call
  const post = await getPostData(postSlug, locale);

  //
  if (!post) {
    notFound();
  }
  // LL:04 prefix-! implies optional (in this case),  bc possible manual url-slug entry might be nothing planned for

  /* structured data for Google SEO */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: `${publicURL}/${locale}/post/${postSlug}/opengraph-image.png`,
    author: `${post.author.first_name} ${post.author.last_name}`,
    genre: post.category.title,
    publisher: siteConfig.siteName,
    url: `${publicURL}/post/${postSlug}`,
    datePublished: new Date(post.date_created).toISOString(),
    dateCreated: new Date(post.date_created).toISOString(),
    dateModified: new Date(post.date_updated).toISOString(),
    description: post.description,
    articleBody: post.body,
  };

  const dictionary = await getDictionary(locale);

  return (
    <PaddingContainer>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Container */}
      <div className="space-y-10">
        {/* Post Hero */}
        <PostHero locale={locale} post={post} />
        {/* Post Body and Social Share */}
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="relative">
            <div className="sticky top-24 flex md:flex-col gap-5 items-center justify-start">
              <div className="font-medium">Share this content:</div>
              <SocialLink
                platform="twitter"
                link={`https://twitter.com/intent/tweet?url=${
                  publicURL + `/post/${post.slug}`
                }`}
                isShareURL={true}
              />
              <SocialLink
                platform="youtube"
                link={`https://www.facebook.com/sharer/sharer.php?u=${
                  publicURL + `/post/${post.slug}`
                }`}
                isShareURL={true}
              />
              <SocialLink
                platform="github"
                link={`https://www.facebook.com/sharer/sharer.php?u=${
                  publicURL + `/post/${post.slug}`
                }`}
                isShareURL={true}
              />
              <SocialLink
                platform="linkedin"
                link={`https://www.linkedin.com/shareArticle?mini=true&url=${
                  publicURL + `/post/${post.slug}`
                }`}
                isShareURL={true}
              />
              <SocialLink
                platform="instagram"
                link={`https://www.facebook.com/sharer/sharer.php?u=${
                  publicURL + `/post/${post.slug}`
                }`}
                isShareURL={true}
              />
            </div>
          </div>
          <PostBody body={post.body} />
        </div>
        {/* Call to Action Card*/}
        {/* ---ts-expect-error Async Server Component */}
        <CTACard dictionary={dictionary} />
      </div>
    </PaddingContainer>
  );
};
export default Page;
