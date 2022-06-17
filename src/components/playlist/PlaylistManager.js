import { fetchIt } from "../utils/FetchIt"
import { Settings } from "../utils/Settings"



export const getAllPlaylists = () => fetchIt(`${Settings.API}/playlists`)

export const getSinglePlaylist = id => fetchIt(`${Settings.API}/playlists/${id}`)

export const getUserPlaylists = id => fetchIt(`${Settings.API}/playlists?user_id=${id}`)

export const createPlaylist = playlist => fetchIt(`${Settings.API}/playlists`, "POST", playlist)

export const updatePlaylist = playlist => fetchIt(`${Settings.API}/playlists/${playlist.id}`, "PUT", playlist)

export const deletePlaylist = playlist => fetchIt(`${Settings.API}/playlists/${playlist.id}`, "DELETE")

