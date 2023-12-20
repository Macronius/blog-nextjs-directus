_____
ER:01
'CTACard' cannot be used as a JSX component.
Its return type 'Promise<Element>' is not a valid JSX element.
Type 'Promise<Element>' is missing the following properties from type 'ReactElement<any, any>': type, props, key ts(2786)

_____
ER:02
- error RangeError: Invalid time value
    at Date.toISOString (<anonymous>)
    at resolveSitemap (webpack-internal:///(app-metadata-route)/./node_modules/next/dist/build/webpack/loaders/metadata/resolve-route-data.js:76:90)
    at resolveRouteData (webpack-internal:///(app-metadata-route)/./node_modules/next/dist/build/webpack/loaders/metadata/resolve-route-data.js:98:16)
    at GET (webpack-internal:///(app-metadata-route)/./node_modules/next/dist/build/webpack/loaders/next-metadata-route-loader.js?page=%2Fsitemap.xml%2F%5B%5B...__metadata_id__%5D%5D%2Froute&isDynamic=1!./app/sitemap.ts?__next_metadata_route__:43:128)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async eval (webpack-internal:///(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.js:254:37)
NOTES: this occurred when attempting to see url path http://localhost:3000/sitemap.xml, while the category content in the directus CMS did not account for a date_updated feature
RESOLUTION: in the categoryLinks section of sitemap.ts, in lastModified, instead of specifying a time value from the directus cms that does not exist, simply return a lastModified value of new Date()
THOUGHTS:   while this solves the immediate problem, it does not address an actual usable solution, as a new Date() value is meaningless and arbitrary
SOLUTION:   maybe I can add a date_created key/value to category section of directus cms