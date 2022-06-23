import React, { useState } from "react"
import { Col, Container, Row, Card, Button } from 'react-bootstrap';
export const UploadSongs = ({ show, remove, addLocalTrack, tracksArray, obj, update }) => {
    // const [uploadedSong, setUploadedSong] = useState('')
    const checkUploadResult = (e, resultEvent) => {
        if (resultEvent.event === "success") {
            const copy = { ...obj }
            copy.url = resultEvent.info.secure_url
            setUploadedSong(`${resultEvent.info.original_filename}.${resultEvent.info.format}`)
            copy.fileString = `${resultEvent.info.original_filename}.${resultEvent.info.format}`
            update(copy)
            addLocalTrack(e, copy)
        }
    }
    const showWidget = (e) => {
        e.preventDefault()
        let widget = window.cloudinary.createUploadWidget({
            cloudName: "ehils",
            uploadPreset: "ehils_preset"
        },
            (error, result) => { checkUploadResult(e, result) })
        widget.open()
        // addLocalTrack(e, obj)

    }
    return (
        <>
            <button variant="flat" id="uploadBtn" color="success" outline type="file"
                onClick={(e) => {
                    let copy = obj
                    copy.trackNumber = (parseInt(show.tracks.length) + parseInt(tracksArray.length) + 1)
                    update(copy)
                    if (obj.title) {
                        showWidget(e)
                    } else {
                        window.alert("Please fille out all title before upload")
                    }
                }
                } >Add File</button>
            {tracksArray
                ? tracksArray.map((obj) => {
                    return <Row><div key={`track_${obj.trackNumber}`}>
                        <Col key={`track_${obj.trackNumber}`}>Title:{obj.title}</Col>
                        <Col>File:{obj.fileString}</Col>
                        <button
                            id={tracksArray.length}
                            onClick={
                                (e) => {
                                    remove(e.target.id)
                                }}>delete</button>
                    </div>
                    </Row>
                })
                : " "}


        </>
    )
}

