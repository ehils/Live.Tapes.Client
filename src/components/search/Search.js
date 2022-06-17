import React, { useState, useEffect } from 'react';
import { searchFilterShows } from './SearchManager';

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
        if(searchString) {
            searchString = searchString.slice(0,-1)
            searchFilterShows(searchString).then(
            setFoundShows
        )}
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
            <button 
            onClick={()=>{
                searchShows()
            }}>
                Search
            </button>
            {foundShows?.map(
                show => {
                    return <div key={show.id}>
                        <h2>{show.date}</h2>
                        <p>{show.artist?.name}</p>
                        </div>
                }
            )}
        </>
    )
}
