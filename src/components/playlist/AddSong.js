import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getSinglePlaylist, updatePlaylist } from './PlaylistManager';

export const AddSong = ({ playlistId, trackId }) => {
    // const { playlistId } = useParams()


    const [playlistTracks, setPlaylistTracks] = useState([])
    const [playlist, setPlaylist] = useState({})

    useEffect(() => {
        debugger
        if (playlistId) {
            getSinglePlaylist(playlistId)
                .then((r) => {
                    let copy = r
                    copy.tracks = r.tracks.map((track) => {
                        return track.id
                    })
                        .then(setPlaylist(copy))
                })
        }
    }, [])

    const songAdd = (trackId) => {

        const copy = {...playlist}
        copy.tracks?.concat(trackId)
        updatePlaylist(copy)
    }


    return (
        <>
            {playlistId ?
                songAdd(trackId)
                : window.alert("please select playlist")}
            {/* if in playlistAdd
                then window alert, song added to playlist
                if not
                return user playlist
                select user playlist
                window alert, song added to playlist */}
        </>
    )


}