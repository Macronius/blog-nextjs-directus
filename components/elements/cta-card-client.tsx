"use client";
import directus from "@/lib/directus";
import Image from "next/image";
import { FormEvent, useState } from "react";

/* eslint-disable react/no-unscaped-entities */
const CTACard = ({ dictionary }: { dictionary: any }) => {
  //
  const [email, setEmail] = useState("");
  const [isHandling, setIsHandling] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    //
    try {
      // e.preventDefault();
      //
      setIsHandling(true);
      await directus.items("subscribers").createOne({ email });
      //
      setIsHandling(false);
      setEmail("");
    } catch (err) {
      console.log(err);
      setIsHandling(false);
    }
  };

  return (
    <div className="bg-slate-100 rounded-md py-10 px-6 relative overflow-hidden">
      {/* Overlay */}
      <div className="absolute z-10 inset-0 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />
      {/* Image */}
      <Image
        fill
        src="https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80"
        alt="call to action relaxing let-your-guard-down scene"
        className="object-center object-cover rounded-md"
      />
      {/* Content Container */}
      <div className="relative z-20">
        <div className="font-medium text-lg">#eploretheworld</div>
        <h3 className="text-4xl font-semibold mt-3">
          {dictionary.ctaCard.title}
        </h3>
        <p className="text-lg mt-2 max-w-lg">
          {dictionary.ctaCard.description}
        </p>
        {/* Form to collect data */}
        <form
          onSubmit={submitHandler}
          className="mt-6 flex items-center gap-2 w-full"
        >
          <input
            type="email"
            name="email"
            value={email} // make a controlled input
            onChange={e => {setEmail(e.target.value)}}
            // Q:07
            placeholder="gimme your email"
            className="px-3 py-2 text-base rounded-md placeholder:text-sm bg-white/80 outline-none focus:ring-2 ring-neutral-500 w-full md:w-auto"
          />
          <button 
            type="submit"
            className="px-3 py-2 rounded-md bg-neutral-900 text-neutral-200 whitespace-nowrap"
          >
            {!isHandling ? dictionary.ctaCard.button : "Sending..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CTACard;
