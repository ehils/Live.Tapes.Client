import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { AddSong } from '../playlist/AddSong';
import { getSinglePlaylist } from '../playlist/PlaylistManager';
import { searchTracks } from './SearchManager';

export const SongSearch = () => {
    const {playlistId} = useParams() 
    const[playlist, setPlaylist] = useState({})
    const [searchState, setSearchState] = useState(
        {
            search_term: ""
        }
    )
    const [foundTracks, setFoundTracks] = useState([])

    useEffect(() => {
        let searchString = ""
        // iterate through object
        // for each key value
        for (const key in searchState) {
            // key is string of each key name
            // i.e. searchState["search_term"]
            // check that value is truthy or falsy
            // truthy = if("value has any non-falsy data")
            if (searchState[key]) {
                // add key value pair to string as "key=value&"
                searchString += `${key}=${searchState[key]}&`
            }
        }
        // delete last character
        if (searchString) {
            searchString = searchString.slice(0, -1)
            searchTracks(searchString).then(
                setFoundTracks
            )
        }
    }, [searchState])

    const changeSearchState = (event) => {
        // TODO: Complete the onChange function
        const newSearch = Object.assign({}, searchState)          // Create copy
        newSearch[event.target.name] = event.target.value    // Modify copy
        setSearchState(newSearch)
    }



    useEffect(() => {
        
        if (playlistId) {
            getSinglePlaylist(playlistId)
                .then((r) => {
                    let copy = r
                    copy.tracks = r.tracks.map((track) => {
                        return track.id
                    })
                    return copy
                })
                .then(setPlaylist)
        }
    }, [])

    // from adds or removes to querystring

    return (
        <>
            <Container><fieldset>
                <div>
                    <Form>
                        <Form.Group>

                        <Form.Label>
                        Search Song
                        </Form.Label>
                        <Form.Control
                        type="text"
                        name="search_term"
                        className='search_term'
                        placeholder="Song"
                        value={searchState.search_term}
                        onChange={changeSearchState} />

                        </Form.Group>
                    </Form>
                    {/* <label htmlFor="search_term"></label>
                    <input
                        type="text"
                        name="search_term"
                        className='search_term'
                        placeholder="Song"
                        value={searchState.search_term}
                        onChange={changeSearchState} /> */}
                </div>
            </fieldset>
                </Container>
            {foundTracks?.map(
                track => {
                    return <Container><div key={track.id}><h3>{track.title}</h3>
                        {track.show?.date}<br></br>
                        <AddSong playlist={playlist} setPlaylist={setPlaylist} trackId={track.id} /><br></br>
                    </div></Container>

                }
            )}
        </>
    )
}