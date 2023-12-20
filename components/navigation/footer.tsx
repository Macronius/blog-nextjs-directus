import PaddingContainer from "../layout/padding-container";
import siteConfig from "../../config/site";
import Link from "next/link";
import SocialLink from "../elements/social-links";
import { getDictionary } from "@/lib/getDictionary";

const footer = async ({locale} : {locale: string}) => {
  //
  const dictionary = await getDictionary(locale)
  //
  return (
    <div className="py-6 border-t mt-5 bg-gray-200">
      <PaddingContainer>
        <div>
          <h2 className="text-3xl font-bold">{siteConfig.siteName}</h2>
          <p className="max-w-md mt-2 text-lg text-neutral-700">
            {dictionary.footer.description}
          </p>
        </div>
        {/* Social and Currently At */}
        <div className="flex flex-wrap justify-between mt-6">
          <div className="flex flex-col">
            <div className="font-bold text-lg">#exploretheworld</div>
            <hr className="p-1" />
            <div className="flex justify-around items-center gap-3 text-neutral-500 mt-2">
              <div>
                <SocialLink
                  platform={"twitter"}
                  link={siteConfig.socialLinks.twitter}
                />
              </div>
              <div>
                <SocialLink
                  platform={"youtube"}
                  link={siteConfig.socialLinks.youtube}
                />
              </div>
              <div>
                <SocialLink
                  platform={"github"}
                  link={siteConfig.socialLinks.github}
                />
              </div>
              <div>
                <SocialLink
                  platform={"linkedin"}
                  link={siteConfig.socialLinks.linkedin}
                />
              </div>
              <div>
                <SocialLink
                  platform={"instagram"}
                  link={siteConfig.socialLinks.instagram}
                />
              </div>
            </div>
          </div>
          <div className="p-2 flex flex-col items-center">
            <div className="text-sm text-neutral-400">{dictionary.footer.currentlyAtText}</div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-md shadow-md">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              {siteConfig.currentlyAt}
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="flex flex-wrap justify-between items-center gap-4 py-3 mt-16 border-t text-sm">
          <div className="">
            {dictionary.footer.rightsText} {new Date().getFullYear()}
          </div>
          <div className="text-sm">
            {dictionary.footer.creatorText}{" "}
            <Link
              href="https://twitter.com/deployerofworlds"
              className="underline underline-offset-4"
            >
              @deployerofworlds
            </Link>
          </div>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default footer;
