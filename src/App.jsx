import React from "react";
import UploadMP3File from "./components/UploadMp3File";

export default function App() {
    const [lessonData, setLessonData] = React.useState([])

    return (
        <>
            <UploadMP3File setLessonData={ setLessonData } />
            {
                lessonData.length > 0 ? <h1>{ lessonData[0].translation }</h1> : <h1>No Lesson Text Found</h1>
            }
        </>
    )
}