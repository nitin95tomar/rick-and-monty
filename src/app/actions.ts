'use server'

import { getEpisodes } from "rickmortyapi";

export async function fetchEpisodes({ page = 1 }: { page?: number }) {
    const res = await getEpisodes({ page })

    if (res.status != 200) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.data;
}

