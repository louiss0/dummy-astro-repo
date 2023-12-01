import { z, defineCollection, type SchemaContext } from "astro:content";
import { Enum, type InferValue } from "better-enums";
import { baseSchema } from "./schemas";

export const CATEGORIES = Enum(["Segment", "Tutorial", "Standalone"])

export type Category = InferValue<typeof CATEGORIES>


const categoryWithPartAndSeriesSchema = z.object({
    category: z.literal(CATEGORIES.accessor.Segment),
    series: z.string({
        required_error: "A post that is a segment must have a series associated with it",
    })
        .max(45)
        .regex(
            /\b[A-Z][A-Za-z0-9\s]*\b/,
            `The series must start with an uppercase and end with a word.
            It can only have characters and spaces in it.   
            `
        )
        .transform((string) => `${string}:`),
    part: z.number({
        required_error: "A post with a segment must have a part number associated with it"
    }).int()
});

const categoryWithoutPartAndSeriesSchema = z.object({
    category: z.literal(CATEGORIES.accessor.Standalone)
        .or(z.literal(CATEGORIES.accessor.Tutorial)),
    part: z.undefined(),
    series: z.undefined()
});


/* 
 TODO: Remember to add images to based on each topic
 TODO: Use imported images as default's for all schema.

*/

const seriesSchema = categoryWithPartAndSeriesSchema
    .or(categoryWithoutPartAndSeriesSchema)


export const postSchema = baseSchema
    .and(seriesSchema)
    .and(z.object({
        tags: z.array(z.string())
    }))


export type Post = z.infer<typeof postSchema>


const getCreatePostSchemaBasedOnIfATagStartsWithPassedInValueAndImageFromSchemaContext =
    (string: string,) => ({ image }: SchemaContext) =>
        postSchema
            .and(z.object({
                heroImage: image(),
                tags: z.array(z.string())
                    .refine(getArrayStartsWithString(string)),
            }))
            .transform((postFrontMatter) => {

                if (postFrontMatter.category !== "Segment") {

                    return postFrontMatter
                }

                const { title, part, series, ...rest } = postFrontMatter

                return {
                    ...rest,
                    title: `${series}${title} part ${part}`
                }

            })



export const collections = {
    astro: defineCollection({
        schema:
            getCreatePostSchemaBasedOnIfATagStartsWithPassedInValueAndImageFromSchemaContext("astro")
    }),
    // html: defineCollection({
    //     schema:
    //         getCreatePostSchemaBasedOnIfATagStartsWithPassedInValueAndImageFromSchemaContext("HTML")
    // }),
    // typescript: defineCollection({
    //     schema:
    //         getCreatePostSchemaBasedOnIfATagStartsWithPassedInValueAndImageFromSchemaContext("typescript")
    // }),
    // css: defineCollection({
    //     schema:
    //         getCreatePostSchemaBasedOnIfATagStartsWithPassedInValueAndImageFromSchemaContext("CSS")
    // }),
    // react: defineCollection({
    //     schema:
    //         getCreatePostSchemaBasedOnIfATagStartsWithPassedInValueAndImageFromSchemaContext("react")
    // }),
    // vue: defineCollection({
    //     schema:
    //         getCreatePostSchemaBasedOnIfATagStartsWithPassedInValueAndImageFromSchemaContext("vue")
    // }),
    // "food-for-thought": defineCollection({
    //     schema:
    //         getCreatePostSchemaBasedOnIfATagStartsWithPassedInValueAndImageFromSchemaContext("food-for-thought")
    // }),
    // "web-development": defineCollection({
    //     schema:
    //         getCreatePostSchemaBasedOnIfATagStartsWithPassedInValueAndImageFromSchemaContext("web-development")
    // }),
};

export const COLLECTION_NAMES = Object.keys(collections) as ReadonlyArray<keyof typeof collections>
export type AllCollectionNames = typeof COLLECTION_NAMES;
export type AllCollectionNamesValues = typeof COLLECTION_NAMES[number];

function getArrayStartsWithString(string: string): (arg: string[]) => unknown {
    return tags => tags.at(0) === string;

}
