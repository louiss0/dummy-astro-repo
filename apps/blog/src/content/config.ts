import { defineCollection, z } from 'astro:content';


export const collections = {
    blog: defineCollection({
        schema: ({ image }) => z.object({
            title: z.string(),
            heroImage: image()
        })
    })
}

