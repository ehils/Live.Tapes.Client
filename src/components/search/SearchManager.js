import { fetchIt } from "../utils/FetchIt"
import { Settings } from "../utils/Settings"

export const searchFilterShows = searchString => fetchIt(`${Settings.API}/shows?${searchString}`)

export const searchTracks = searchString => fetchIt(`${Settings.API}/tracks?${searchString}`)

export const getTracks = () => fetchIt(`${Settings.API}/tracks`)
