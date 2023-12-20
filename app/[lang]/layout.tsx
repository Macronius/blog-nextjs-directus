// nextjs framework
import type { Metadata } from "next";
// import Link from "next/link";
// components
import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/navigation/footer";
// style
import "./globals.css";
import { Inter } from "next/font/google";
import { getDictionary } from "@/lib/getDictionary";
import siteConfig from "@/config/site";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const generateMetadata = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  // get dictionary based on language parameter
  const dictionary = await getDictionary(lang);
  //
  return {
    // LL:13, LL:14
    title: {
      template: `${siteConfig.siteName} | %s`,
      default: siteConfig.siteName,
    },
    description: dictionary.footer.description,
    openGraph: {
      title: siteConfig.siteName,
      description: dictionary.footer.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      siteName: siteConfig.siteName,
      images: [
        {
          url: "http://localhost:3000/opengraph-image.png",
          width: 800,
          height: 600,
          alt: "description of the image you cannot see",
        },
      ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        "de-DE": `${process.env.NEXT_PUBLIC_SITE_URL}/de`,
      },
    },
    // google verification
    verification: {
      google: "<content code>"
    }
  };
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return (
    <html lang="en">
      {/* Google ANalytics */}
      {/* <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-11Y5YESB1F"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() {dataLayer.push(arguments)};
          gtag('js', new Date());
          gtag('config', 'G-11Y5YESB1F');
        `}
      </Script> */}

      {/* everything else */}
      <body className={inter.className}>
        {/* ts-expect-error Async Server Component */}
        <Navigation locale={lang} />
        {/*  */}
        <main className="pt-10 min-h-[calc(100vh-300px)]">{children}</main>
        {/* ts-expect-error Async Server Component */}
        <Footer locale={lang} />
      </body>
    </html>
  );
}
