_____
TODO:01     favicon.ico and spacestation.jpg in the app directory do not work.  I am not even sure they are recognized


_____
TODO:02     opengraph-image features do not work anywhere


_____
TODO:03     revist 96. Google Analytics Integration after Vercel deployment and obtain a valid URL
ISSUE-1:      unable to accomplish this task because no valid url exists yet
            -
            uncomment the Script tags in the app>layout RootLayout
ISSUE-2:    the above issue could be caused by a bug in the nextjs code.  The solution presented in #97 is to comment out the formAction function and formAction function call in the cta-component, and then in next-config comment out the experimental object
            -
            confirm that this is still an issue after deploy site and connect to google analytics.  if so, then do ISSUE-2 instrutions


_____
TODO:04     d