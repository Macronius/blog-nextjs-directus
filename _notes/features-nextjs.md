IMAGE OPTIMIZATION

SERVER ACTIONS
can be created from server components for forms
as components are server by default, this permits user to continue with default server 
must declare "use server" within the server action function
- apparently at the time of this tut making, this was in Alpha, though had a bug that prevented google analytics from distinguishing different page visits despite fact that tab title is not unique

OBSERVATION:
only design the app to use client IFF it cannot be done on the server-side


when a component comes from the server, you cannot use state and you cannot reach dom elements



RESET FORM
revalidate data with server components
NOTE:
because this is a server component, it is ok to expose the ADMIN_ACCESS_TOKEN
NOTE:
if this were a client component, then it would not be safe to expose the ADMIN_ACCESS_TOKEN to just anyone