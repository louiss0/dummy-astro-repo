import { type CollectionKey, type CollectionEntry } from "astro:content";
import { COLLECTION_NAMES, type AllCollectionNames, type AllCollectionNamesValues } from "./collections";
import { getCollections } from "@forastro/utilities";


type FilterFunction<T extends ReadonlyArray<CollectionKey>, U extends CollectionEntry<T[number]>> =
    ((entry: CollectionEntry<T[number]>) => unknown)
    | ((entry: CollectionEntry<T[number]>) => entry is U)



interface GetAllCollections {
    <U extends CollectionEntry<AllCollectionNamesValues>>(
        filter?: (entry: CollectionEntry<AllCollectionNamesValues>) => entry is U
    ): Promise<Array<U>>;
    (
        filter?: (entry: CollectionEntry<AllCollectionNamesValues>) => unknown
    ): Promise<
        Array<
            CollectionEntry<AllCollectionNamesValues>
        >
    >
}


export const getAllCollections: GetAllCollections =
    async <U extends CollectionEntry<AllCollectionNamesValues>>
        (filter?: FilterFunction<AllCollectionNames, U>) =>
        await getCollections(COLLECTION_NAMES, filter)

export const attemptToCreateSpacedStringFromLowerCaseAndDashedFileNameByCapturingTheFilenameAndExtension =
    (fileName: string) => {

        const fileNameAndExtensionMatchGroups = fileName.match(/(?<file_name>[\w-]+)(?<extension>\.[a-z]+)/)?.groups

        if (!fileNameAndExtensionMatchGroups) {

            throw new Error(`Please use a proper file name and extension in your file name.
            File names are expected to be dashed and lowercase.`)

        }

        const { file_name } = fileNameAndExtensionMatchGroups

        return file_name.split('-')
            .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
            .join(' ')

    }

