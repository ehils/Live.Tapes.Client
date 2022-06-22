import React, { useState, useEffect } from 'react';
import { getArtists, getLocations, getVenues, searchFilterShows } from './SearchManager';

export const Search = () => {
    const [searchState, setSearchState] = useState(
        {
            search_term: "",
            date: "",
            artist: 0,
            location: 0,
            venue: 0

        }
    )
    const [foundShows, setFoundShows] = useState([])
    const [artists, setArtists] = useState([])
    const [venues, setVenues] = useState([])
    const [locations, setLocations] = useState([])

    // useEffect(() => {
    //     let searchString = ""
    //     // iterate through object
    //     // for each key value
    //     for (const key in searchState) {
    //         // key is string of each key name
    //         // i.e. searchState["search_term"]
    //         // check that value is truthy or falsy
    //         // truthy = if("value has any non-falsy data")
    //         if (searchState[key]) {
    //             // add key value pair to string as "key=value&"
    //             searchString += `${key}=${searchState[key]}&`
    //         }
    //     }
    //     // delete last character
    //     // if(searchString) {
    //     //     searchString = searchString.slice(0,-1)
    //     //     searchFilterShows(searchString).then(
    //     //     setFoundShows
    //     // )}
    // }, [searchState])
    useEffect (() => {
        getArtists().then(setArtists)
    },[])
    useEffect (() => {
        getLocations().then(setLocations)
    },[])
    useEffect (() => {
        getVenues().then(setVenues) 
    },[])
    const changeSearchState = (event) => {
        // TODO: Complete the onChange function
        const newSearch = Object.assign({}, searchState)          // Create copy
        newSearch[event.target.name] = event.target.value    // Modify copy
        setSearchState(newSearch)
    }
    const searchShows = () => {
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
        if (searchString) {
            searchString = searchString.slice(0, -1)
            searchFilterShows(searchString).then(
                setFoundShows
            )
        }
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
                        placeholder="Content"
                        value={searchState.search_term}
                        onChange={changeSearchState} />
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label htmlFor="date">Enter Show Date</label>
                    <input
                        type="text"
                        name="date"
                        className='date'
                        placeholder="date"
                        value={searchState.date}
                        onChange={changeSearchState} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">

                    <select name="artist"
                        onChange={changeSearchState}
                        defaultValue="0"
                    >
                        <option value="0" hidden>Artist Select</option>
                        {
                            artists.map(
                                (artist) => {
                                    return (
                                        <option key={`artistId--${artist.id}`} value={`${artist.id}`}>
                                            {`${artist.name}`}
                                        </option>
                                    )
                                }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">

                    <select name="location"
                        onChange={changeSearchState}
                        defaultValue="0"
                    >
                        <option value="0" hidden>Location Select</option>
                        {
                            locations.map(
                                (location) => {
                                    return (
                                        <option key={`locationId--${location.id}`} value={`${location.id}`}>
                                            {`${location.location}`}
                                        </option>
                                    )
                                }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">

                    <select name="venue"
                        onChange={changeSearchState}
                        defaultValue="0"
                    >
                        <option value="0" hidden>Venue Select</option>
                        {
                            venues.map(
                                (venue) => {
                                    return (
                                        <option key={`venueId--${venue.id}`} value={`${venue.id}`}>
                                            {`${venue.venue}`}
                                        </option>
                                    )
                                }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <button
                onClick={() => {
                    searchShows()
                }}>
                Search
            </button>
            {foundShows.length > 0
                ? foundShows?.map(
                    show => {
                        return <div key={show.id}>
                            <h2>{show.date}</h2>
                            <p>{show.artist?.name}</p>
                        </div>
                    }
                )
                : "No results match your search criteria"}
        </>
    )
}
