import Link from "next/link";
import React from "react";
import PaddingContainer from "../layout/padding-container";
import { getDictionary } from "@/lib/getDictionary";
import LangSwitcher from "./lang-switcher";


const navigation = async ({locale}: {locale: string}) => {
  //
  const dictionary = await getDictionary(locale);
  //
  return (
    <div
      className={`
      sticky top-0 left-0 right-0 z-10
      border-b
      bg-opacity-50 backdrop-blur-md
      bg-gray-200
      `}
    >
      <PaddingContainer>
        <div className="flex justify-between items-center py-5">
          <Link href={`/${locale}/`} className="text-lg font-bold">
            Explorer
          </Link>
          {/* category-links */}
          <nav>
            <ul className="flex items-center gap-4 text-neutral-600 font-bold">
              <li><LangSwitcher locale={locale} /></li>
              <li>
                <Link href={`/${locale}/cities`}>{dictionary.navigation.links.cities}</Link>
              </li>
              <li>
                <Link href={`/${locale}/experiences`}>{dictionary.navigation.links.experiences}</Link>
              </li>
            </ul>
          </nav>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default navigation;
