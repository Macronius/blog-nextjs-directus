// import React from 'react';
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { revalidateTag } from "next/cache";
import Image from "next/image";

// LL:05  because this component will be a server component, the actions will be 'server actions'.
// LL:06  because this component has a form within, it must be an async function component
const CTACard = async ({locale}: {locale: string}) => {
  //
  const dictionary = await getDictionary(locale);
  // form - to collect user info (email address)
  const formAction = async (formData: FormData) => {
    "use server";
    //
    try {
      const email = formData.get("email");
      //
      await directus.items("subscribers").createOne({ email });
      revalidateTag("subscribers-count")
    } catch (err) {
      // console.log(err);
      console.log("Uh oh, from cta-card.tsx");
      // throw new Error("Error creating email from call to action");
    }
  };

  // get the number of emails/subscribers, but this time use the fetch REST API instead of directus
  const subscribersCount = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}items/subscribers?meta=total_count&access_token=${process.env.DIRECTUS_ADMIN_ACCESS_TOKEN}`,
    {
      next: {
        tags: ["subscribers-count"],
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res.meta.total_count)
    .catch((err) => console.log(err));

  return (
    <div className="bg-slate-100 rounded-md py-10 px-6 relative overflow-hidden">
      {/* Overlay */}
      <div className="absolute z-10 inset-0 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />
      {/* Image */}
      <Image
        src="https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80"
        alt="call to action relaxing let-your-guard-down scene"
        fill
        className="object-center object-cover rounded-md"
      />
      {/* Content Container */}
      <div className="relative z-10">
        <div className="font-medium text-lg">#eploretheworld</div>
        <h3 className="text-4xl font-semibold mt-3">
          {dictionary.ctaCard.title}
        </h3>
        <p className="text-lg mt-2 max-w-lg">
          {dictionary.ctaCard.description}
        </p>
        {/* Form to collect data */}
        <form
          // LL:07 by setting the key to this form as a variable that changes when form is submitted, this enables the form to reset after each submission
          key={subscribersCount + " subscribers-form"}
          action={formAction}
          className="mt-6 flex items-center gap-2 w-full"
          // TO DO: create form action after CMS created
        >
          <input
            type="email"
            name="email"
            placeholder="gimme your email"
            className="px-3 py-2 text-base rounded-md placeholder:text-sm bg-white/80 outline-none focus:ring-2 ring-neutral-500 w-full md:w-auto"
          />
          <button className="px-3 py-2 rounded-md bg-neutral-900 text-neutral-200 whitespace-nowrap">
            {dictionary.ctaCard.button}
          </button>
        </form>

        {/* number of subscribers */}
        <div className="mt-5 text-neutral-700">
          {dictionary.ctaCard.subscriberText1}{" "}
          <span className="bg-neutral-700 rounded-md text-neutral-100 py-1 px-2 text-sm">
            {subscribersCount}
          </span>{" "}
          {dictionary.ctaCard.subscriberText2}
        </div>
      </div>
    </div>
  );
};

export default CTACard;
