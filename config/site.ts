
export interface SiteConfigType {
    siteName: string,
    description: string,
    currentlyAt: string,
    socialLinks: {
        twitter: string,
        youtube: string,
        github: string,
        linkedin: string,
        instagram: string,
    }
}

// create a config file 
const siteConfig: SiteConfigType = {
    siteName: "Explorer",
    description: "A minimal and lovely travel blog, which shares experiences and cities around the world",
    currentlyAt: "Austin",
    socialLinks: {
        twitter: "https://twitter.com/WorldsOf43880/status/1697383985351885185?s=20",
        youtube: "https://youtube.com",
        github: "https://github.com/Macronius",
        linkedin: "https://www.linkedin.com/in/marcus-richardson-9a356a35/",
        instagram: "https://instagram.com/marconio",
    }
}

export default siteConfig;