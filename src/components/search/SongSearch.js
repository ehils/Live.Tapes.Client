import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddSong } from '../playlist/AddSong';
import { searchTracks } from './SearchManager';

export const SongSearch = () => {
    const {playlistId} = useParams() 
    
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


    // from adds or removes to querystring

    return (
        <>
            <fieldset>
                <div>
                    <label htmlFor="search_term">Search Artist or Song</label>
                    <input
                        type="text"
                        name="search_term"
                        className='search_term'
                        placeholder="Artist or Song"
                        value={searchState.search_term}
                        onChange={changeSearchState} />
                </div>
            </fieldset>
            {foundTracks?.map(
                track => {
                    return <div key={track.id}><h3>{track.title}</h3>
                        <button
                            onClick={() => 
                               
                                {return <AddSong playlistId={playlistId} trackId={track.id}/>}
                            }>
                            Add To Playlist</button>
                        {track.artist?.name}<br></br>
                        {track.show?.date}<br></br>
                    </div>

                }
            )}
        </>
    )
}