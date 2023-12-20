_____
TRICK:01    npm run dev --port ${PORT-3000}
supposedly this allows the server to better connect to directus better
I am not sure this is the solution, but for now it works

_____
TRICK:02    in the sitemap file, the objective is to get a list of links.  The process used to obtain these data results in two arrays of arrays (which might as well be combined into another array, outer array of two arrays, where each is composed of arrays).
Since I only want a list of objects, use the Array.prototype.flat() method
The flat() method of Array instances creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.