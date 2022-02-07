export default {
  type: "Person",
  name: "Zachary Przybilski",
  url: "https://www.zacharyp.blog/",
  sameAs: [
    "https://soundcloud.com/zach-przybilski",
    "https://www.zacharyp.dev/",
    "https://www.linkedin.com/in/zachary-przybilski/",
    "https://twitter.com/TweetZachBack",
    "https://dev.to/zacharyp",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    site_name: "zacharyp.blog",
    profile: {
      firstName: "Zachary",
      lastName: "Przybilski",
      gender: "male",
    },
    images: [
      {
        url: "https://res.cloudinary.com/dey85zjmf/image/upload/v1644170623/ZacharypBlogLight_s9fesz.png",
        width: 800,
        height: 600,
        alt: "ZacharyP.blog Light mode logo",
        type: "image/png",
      },
      {
        url: "https://res.cloudinary.com/dey85zjmf/image/upload/v1644170623/ZacharypBlogDark_bjjapj.png",
        width: 800,
        height: 600,
        alt: "ZacharyP.blog Dark mode logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    handle: "@TweetZachBack",
    site: ["https://www.zacharyp.dev/", "https://www.zacharyp.blog/"],
    cardType: "summary_large_image",
  },
};
