import parse, { Element } from "html-react-parser";
import Image from "next/image";
// console.log(Element)

const PostBody = ({ body }: { body: string }) => {
  // LL:10  Replace dom node with a Next.js Element(replace elements with the elements that we want)
  const options = {
    // replace function
    replace: (domNode: any) => {
      // check if dom node is an instance of type Element
      // check if dom node has an attribs key
      if (domNode instanceof Element && domNode.attribs) {
        // only work on img elements
        if (domNode.name === "img") {
          const { src, alt } = domNode.attribs;
          return (
            <Image
              className="rounded-md object-cover object-center w-full my-3 h-auto max-h-[300px] md:max-h-[500px]"
              src={src}
              alt={alt}
              width={1280}
              height={760}
            />
          );
        }
      }
    },
  };
  //
  const getParsedHTML = (body: string) => {
    return parse(body, options);
  };

  //
  return (
    // <div className="w-full">{getParsedHTML(body)}</div>
    <div className="rich-text">{getParsedHTML(body)}</div>
  );
};

export default PostBody;
