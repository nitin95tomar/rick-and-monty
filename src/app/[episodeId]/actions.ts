'use server'

import { getCharacter, getEpisode } from "rickmortyapi";

export async function fetchCharacters({ id }: { id: number }) {
    const res = await getEpisode(Number(id))
    const characterIds = res.data.characters.map((characterUrl) => Number(characterUrl[characterUrl.length-1]))
    const characters = await getCharacter(characterIds)

    if(characters.status!=200){
        throw new Error('Failed to fetch data')
    }

    return characters.data;
}