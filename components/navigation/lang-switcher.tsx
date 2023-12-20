"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/* 
this is a component that toggles the English and German languages
- it works by reading the first pathname word, then editing the pathname 
  to include the new pathname updated to reflect language of choice
*/
const LangSwitcher = ({locale}: {locale: string}) => {
    //
    const targetLanguage = locale === 'en' ? 'de' : 'en';
    //
    const pathname = usePathname();
    //
    const redirectTarget = () => {
        if (!pathname) return "/";
        //
        const segments = pathname.split("/");
        segments[1] = targetLanguage;
        // return string pathname with new language
        return segments.join("/");
    }

  return (
    <Link 
        className="ml-8 font-light flex items-center gap-1"
        href={redirectTarget()}
        locale={targetLanguage}
        // LL:11
    >
        <span>{targetLanguage === 'en' ? "🇺🇸" : "🇩🇪"}</span>
        <span>{targetLanguage.toUpperCase()}</span>
    </Link>
  )
}

export default LangSwitcher