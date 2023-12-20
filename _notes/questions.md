_____
Q:01    when it comes to passing in arguments to a function, what is the benefit of defining a constant with the value, then passing in the constant value, as opposed to just passing in the value
for example:
const Page = async ({params}: {params: {slug: string, lang: string}}) {
    // function call (version 1):
    const postSlug = params.slug;
    const locale = params.lang;
    const post = await getPostData(postSlug, locale);
    // function call (version 2):
    const post = await getPostData(params.slug, params.lang)
}
QUESTION: which way is better for which reasons?

_____
Q:02    when defining a helper function (or whatever), how do I know when I need to destructure the parameters from an object, or just list them?
for example:
const getPostData = (postSlug: string, locale: string) => {}
versus
const getPostData = ({params}): {params: {postSlug: string, locale: string}} => {}
OBSERVATION: I can see that the first scenario, two parameters are passed in, while the second scenario a single params object is passed in and therefore must be destructured

_____
Q:03    how many different ways are there to type-define?
a

_____
Q:04    when dealing with a nextjs page component, is there an optimal way to stack the following export functions: generateMetadata, generateStaticParams? 

_____
Q:05    when using directus.items("post").readByQuery({fields: ["*", ...]}), what is the reason for reading everything by the wildcard astrisk, but then also reading specific

_____
Q:06    why does the app/[lang]/post page have three exports contained within the react component?
- They serve the purpose of being available for the server to access
- They are on that particular file because the data they offer is unique to that component
- this is required for the backend server to be able to access this data

_____
Q:07    why does the submitHandler function require e to be type-safe, while the onChange callback function does not require e to be type-safe