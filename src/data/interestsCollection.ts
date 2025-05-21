import {createListCollection, type ListCollection} from "@chakra-ui/react";

export interface InterestType {
    id: number,
    label: string,
    value: string,
}

const interests: InterestType[] = [
    {id:1, label: 'Sports', value: 'sports'},
    {id:2, label: 'Music', value: 'music'},
    {id:3, label: 'Dancing', value: 'dancing'},
    {id:4, label: 'Reading', value: 'reading'},
    {id:5, label: 'Movies', value: 'movies'},
    {id:6, label: 'Games', value: 'games'},
]

export const interestsCollection: ListCollection<InterestType> = createListCollection({
    items: interests,
})
