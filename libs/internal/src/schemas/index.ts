/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'astro/zod'
import { isSpaced, isAPunctualParagraph } from '../utils'



export const titleSchema = z.string().max(60).min(10)
    .refine(isSpaced, { message: "Space your titles and make sure they are more than a word" })


const descriptionSchema = z.string().min(30).max(160)
    .refine(isAPunctualParagraph, {
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

export const baseSchema = draftAndPubDateSchema.and(
    titleAndDescriptionSchema.extend({
        layout: layoutSchema,
        updateDate: updateDateSchema,
    })
)





