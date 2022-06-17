import { fetchIt } from "../utils/FetchIt"
import { Settings } from "../utils/Settings"

// all showlists sent from the backend in order from most recent

export const getAllShows = () => fetchIt(`${Settings.API}/shows`)

export const getSingleShow = id => fetchIt(`${Settings.API}/shows/${id}`)

export const getUserShows = id => fetchIt(`${Settings.API}/shows?user_id=${id}`)

export const searchShowsBySongAndArtist = searchTerm => fetchIt(`${Settings.API}/shows?search_term=${searchTerm}`)

export const filterShowArtist = artistString => fetchIt(`${Settings.API}/shows?artist=${artistString}`)

export const filterShowLocation = locationString => fetchIt(`${Settings.API}/shows?location=${locationString}`)

export const filterShowVenue = venueString => fetchIt(`${Settings.API}/shows?venue=${venueString}`)

export const createShow = show => fetchIt(`${Settings.API}/shows`, "POST", show)

export const addTrack = track => fetchIt(`${Settings.API}/tracks`, "POST", track)

export const deleteTrack = track => fetchIt(`${Settings.API}/tracks/${track.id}`, "DELETE")

export const deleteShow = show => fetchIt(`${Settings.API}/shows/${show.id}`, "DELETE")


