import { fetchIt } from "../utils/FetchIt"
import { Settings } from "../utils/Settings"



export const getAllPlaylists = () => fetchIt(`${Settings.API}/playlists`)

export const getSinglePlaylist = id => fetchIt(`${Settings.API}/playlists/${id}`)

export const getUserPlaylists = id => fetchIt(`${Settings.API}/playlists?user_id=${id}`)