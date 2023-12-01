
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'
import { Enum, InferValue } from 'better-enums'

export const isSpaced = (value: string) => /\s/gm.test(value)

export function isAPunctualParagraph(value: string) {

  const isProperParagraphRE =
    /^(?<first_word>[A-Z][a-z]+)(?<middle_words>(?:\s?[\w#?.@,!"':;-]+)+)(?<last_word>\s\w+[.!?])$/g


  return isProperParagraphRE.test(value)


}

export const titleSchema = z.string().max(60).min(10)
  .refine(
    isSpaced,
    { message: "Space your titles and make sure they are more than a word" }
  )


const descriptionSchema = z.string().min(30).max(160)
  .refine(
    isAPunctualParagraph,
    {
      message: `Please write a proper paragraph for the description 
            The first word must start with an uppercase letter.
            The words in the middle can only contain letters and one of
            these symbols # ? . @ , ! : ; -
            The last word must be a word followed by a .  ?  `
    })

const layoutSchema = z.undefined({
  invalid_type_error: "Please don't use layouts you are in content collections If you have them. Then put them in pages instead"
})


// TODO: Create refinement to check if the schema is a specific date format.
const pubDateSchema = z.string().refine(
  string => /^\d{4}-\d{2}-\d{2}$/.test(string),
  string => ({
    message: `The date must be written in  YYYY-MM-DD format
         This ${string} is not the right value.
        `
  }))

const updateDateSchema = z.string()
  .refine(
    string => /^\d{4}-\d{2}-\d{2}$/.test(string),
    string => ({
      message: `The date must be written in  YYYY-MM-DD format
         This ${string} is not the right value.
        `
    }))
  .optional()

export const titleAndDescriptionSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
})

export type TitleAndDescription = z.infer<typeof titleAndDescriptionSchema>

const draftAndNoPubDateSchema = z.object({
  draft: z.literal(true),
  pubDate: z.undefined()
})

const noDraftAndPubDateSchema = z.object({
  draft: z.undefined(),
  pubDate: pubDateSchema
})

const draftAndPubDateSchema = draftAndNoPubDateSchema.or(noDraftAndPubDateSchema)

const baseSchema = draftAndPubDateSchema.and(
  titleAndDescriptionSchema.extend({
    layout: layoutSchema,
    updateDate: updateDateSchema,
  })
)


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




const seriesSchema = categoryWithPartAndSeriesSchema
  .or(categoryWithoutPartAndSeriesSchema)


const postSchema = baseSchema
  .and(seriesSchema)
  .and(z.object({
    tags: z.array(z.string())
  }))







export const collections = {
  astro: defineCollection({
    schema: ({ image }) => postSchema
      .and(z.object({
        heroImage: image(),
        tags: z.array(z.string())
          .refine(tags => tags.at(0) === "astro"),
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


  }),

};

export const COLLECTION_NAMES = Object.keys(collections) as ReadonlyArray<keyof typeof collections>
export type AllCollectionNames = typeof COLLECTION_NAMES;
export type AllCollectionNamesValues = typeof COLLECTION_NAMES[number];










