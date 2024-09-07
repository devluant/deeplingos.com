import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home";
import Steps from "./pages/Steps";

const AudioContext = React.createContext()

export default function App() {
    const [lessonData, setLessonData] = React.useState([])    
    const [lines, setLines] = React.useState([])
    const [audioFile, setAudioFile] = React.useState(null)

    React.useEffect(() => {
        setLines([lessonData[0]])
    }, [lessonData])

    return (        
        <BrowserRouter>
            <AudioContext.Provider value={ {audioFile: audioFile, setAudioFile: setAudioFile} }>
                <Routes>
                    <Route path="/" element={ <Home lessonData={ lessonData } setLessonData={ setLessonData } /> } />
                    <Route path="/steps" element={ <Steps lessonData={ lessonData } lines={ lines } setLines={ setLines } audioFile={ audioFile } /> } />
                </Routes>
            </AudioContext.Provider>
        </BrowserRouter>
    )
}

export { AudioContext }