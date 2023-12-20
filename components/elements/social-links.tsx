import Link from "next/link";
import { Twitter, Youtube, Github, Linkedin, Instagram } from "lucide-react";

const SocialLink = ({
  platform,
  link,
  isShareURL = false,
}: {
  platform: string;
  link: string;
  isShareURL?: boolean;
}) => {
  // get icon helper function
  const getIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return <Twitter size={16} />;
      case "youtube":
        return <Youtube size={16} />;
      case "github":
        return <Github size={16} />;
      case "linkedin":
        return <Linkedin size={16} />;
      case "instagram":
        return <Instagram size={16} />;
    }
  };

  return (
    <Link href={link}>
      <div
        className={`${
          isShareURL 
            ? "py-2 px-3 bg-neutral-200 rounded-md text-neutral-600 hover:bg-neutral-600 hover:text-neutral-100 duration-150 ease-in-out transition-colors" 
            : ""
        }`}
      >
        {getIcon(platform)}
      </div>
    </Link>
  );
};
export default SocialLink;
