import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Trần Hoàng Huy - Software Engineer Portfolio",
    short_name: "THH Portfolio",
    description: "Software Engineer specializing in full-stack development. Explore my portfolio, projects, and technical expertise.",
    start_url: "/",
    display: "standalone",
    background_color: "#100e19",
    theme_color: "#a755f0",
    orientation: "portrait-primary",
    icons: [
      {
        src: "https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "https://res.cloudinary.com/dq8qq2zed/image/upload/v1762854609/logo-portfolio_asrih8.png",
        sizes: "512x512",
        type: "image/png",
      }
    ],
    categories: ["portfolio", "developer", "software", "engineering"],
    screenshots: [
      {
        src: "https://res.cloudinary.com/dq8qq2zed/image/upload/v1762851574/my-img-portfolio_tbp62j.png",
        sizes: "1200x630",
        type: "image/png",
        form_factor: "wide"
      }
    ],
    lang: "vi-VN",
    dir: "ltr",
    scope: "/",
    id: "tran-hoang-huy-portfolio"
  }
}