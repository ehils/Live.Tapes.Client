// this module takes in a list of shows and lists all of them by the most recent added in the list
// search bar and filter at top of list page'
// show links to show detail
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { getUserShows, getAllShows } from './ShowManager'
export const ShowList = () => {
    const [ showList, setShowList] = useState([])

    const {userId} = useParams()
    
    const userList = userId ? true : false

    useEffect (() => {
        if (userList){
            getUserShows(userId)
                .then(setShowList)
        } else {
            getAllShows().then(setShowList)
        }
    },[])

    return(
        <>
        <body>
            {showList.map(show => { 
                return <div className="showCard" key={show.id}>
                <h4>{show.artist.name}</h4>
                <h4>{show.date}</h4>
                <h4>Uploaded by: {show.user.username}</h4>
                <Link to={`/shows/${show.id}`}>
                    <div className="showLink">
                        Listen
                    </div>
                </Link>
            </div>
                    
                    }

                )
            }
        </body>
        </>
    )
}