import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./home/Home"
import { PlaylistList } from "./playlist/PlaylistList"
import { PlaylistDetail } from "./playlist/PlaylistDetail"
import { ShowDetail } from "./show/ShowDetail"
import { ShowList } from "./show/ShowList"

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
        {/* <Route exact path="/shows/:userId(\d+)">
            <ShowList />
        </Route>
        <Route exact path="/playlists/:userId(\d+)">
            <PlaylistList />
        </Route> */}
        <Route exact path="/playlists">
            <PlaylistList />
        </Route>
        <Route exact path="/playlists/:playlistId(\d+)">            
            <PlaylistDetail />
        </Route>
        {/* <Route exact path="/shows/">
            
        </Route> */}
    </>
}
