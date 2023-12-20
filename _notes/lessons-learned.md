
_____
LL:01   when defining an async helper function of a component function, the component function itself must also be an async function
_____
LL:02   note: because params.category is a slug, post.category.title must be lowercase in order to make a match
_____
LL:03   when something is to be received, but comes up as nothing or null, check to make sure the data returns to and is assigned to an 'awaiting' constant
_____
LL:04   prefix-! means optional,  bc possible manual url-slug entry might be nothing planned for
_____
LL:05   because this component will be a server component, the actions will be 'server actions'.
_____
LL:06   because this component has a form within, it must be an async function component
_____
LL:07   NOTE: prior to Nextjs 13, this was called getStaticPaths
_____
LL:08   correct category type from any to something in particular cannot transform from 'any' to some other type must declare as unknown' type first, then it can be changed
_____
LL:09   note: because params.category is a slug, post.category.title must be lowercase in order to make a match
        _
        const posts = DUMMY_POSTS.filter(
            (post) => post.category.title.toLocaleLowerCase() === params.category
        );
        
        const category = DUMMY_CATEGORIES.find(
            (category) => category.slug === params.category
        );
_____
LL:10   Parse image as Next.js Image
_____
LL:11   generally, when clicking from one url path to the next, Next.js keeps up with values and passes them with the user's progress.  In this case, because we are changing/updating the url pathname, the language preference defined by locale property must also be passed through the link that changes the page language.
I believe, if this was not accounted for, the initial page reload would be the correct language locale, but maybe it would not get passed on... (maybe this could be a rehydration issue, idk)
_____
LL:12   to avoid calling the same function twice (in this case) wrap it in React's cache
_____
LL:13   NOTE: template and default options must be used in the root layout
_____
LL:14   generateMetadata function is what determines the value of the browser tab title.  in this case, the options are default brand name, or if on a category page, the category name is next to the brand name.  There is another option that can be used on any page that describes the browser tab title in the Metadata generation by Nextjs, which is to overwrite the template from root and only use a default value established on the particular page... (note: this is not the default value set on root page, this is whatever absolute value is set in the title object)
_____
LL:15   the sitemap.ts file is only run when the url (in development) http://localhost:3000/sitemap.xml is reached.  Only then will the console.log() run to display the array of dynamicLinks in the backend terminal
_____
LL:16   for some reason, the server action version of callToAction card doesn't work.  
- as a result, the exported function can no longer be async
- as a result, the dictionary data cannot be retrieved with an await
- as a result, this information must instead be passed in to the component as a prop from the 'page' level
_____
LL:17   since we are using the browser to make a form request, we need to establish the CORS settings, because we are fetching or posting data with directus
_____
LL:18   because the environmental variable does not have NEXT_PUBLIC in front, it cannot be accessed by the client, only server.  This means, it is still possible to securely use the directus in the client side, but no longer as an authenticated user
SOLUTION: make the operation publicly available in directus by:
- directus settings
- roles & permissions
- Subscribers change '+' to allow all users
NOTE: this works because in the cta-card form submitHandler logic, the only thing being done is create a subscriber with email
directus.items("subscribers").createOne({})