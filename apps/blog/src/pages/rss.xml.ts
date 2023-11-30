import rss from "@astrojs/rss";

import { getAllCollections } from '../utils';
import { SITE_DESCRIPTION, SITE_TITLE } from "../constants";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {

  const posts = await getAllCollections(entry => !entry.data.draft)

  return rss({
    title: SITE_TITLE,
    stylesheet: "/pretty-feed-v3.xsl",
    description: SITE_DESCRIPTION,
    site: context.site ?? "",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.pubDate || ""),
      link: `/${post.collection}/${post.slug}/`,
    })),
  });

}

