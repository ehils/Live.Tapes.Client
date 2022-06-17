import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./home/Home"
import { PlaylistList } from "./playlist/PlaylistList"
import { PlaylistDetail } from "./playlist/PlaylistDetail"
import { ShowDetail } from "./show/ShowDetail"
import { ShowList } from "./show/ShowList"
import { Search } from "./search/Search"
import { CreatePlaylist } from "./playlist/CreatePlaylist"
import { CreateShow } from "./show/CreateShow"
import { AddTracks } from "./show/AddTracks"
import { SongSearch } from "./search/SongSearch"

export const ApplicationViews = () => {
    return <>
        <Route exact path="/">
            <Home />
        </Route>
        <Route exact path="/shows">
            <ShowList />
        </Route>
        <Route exact path="/shows/:showId(\d+)">
            <ShowDetail />
        </Route>
        <Route exact path="/shows/user/:userId(\d+)">
            <ShowList />
        </Route>
        <Route exact path="/playlists/user/:userId(\d+)">
            <PlaylistList />
        </Route>
        <Route exact path="/playlists">
            <PlaylistList />
        </Route>
        <Route exact path="/playlists/:playlistId(\d+)">            
            <PlaylistDetail />
        </Route>
        <Route exact path="/search">
            <Search />
        </Route>
        <Route exact path="/playlists/create">
            <CreatePlaylist />
        </Route>
        <Route exact path="/shows/create">
            <CreateShow />
        </Route>
        <Route exact path="/playlists/:playlistId(\d+)/songSearch">
            <SongSearch />
        </Route>
        <Route path="/shows/:showId(\d+)/addTracks">
            <AddTracks />
        </Route>
        
    </>
}
