import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home";
import Steps from "./pages/Steps";

export default function App() {
    const [lessonData, setLessonData] = React.useState([])    
    const [lines, setLines] = React.useState([lessonData[0]])

    React.useEffect(() => {
        setLines([lessonData[0]])
    }, [lessonData])

    return (        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home lessonData={ lessonData } setLessonData={ setLessonData } /> } />
                <Route path="/steps" element={ <Steps lessonData={ lessonData } lines={ lines } setLines={ setLines } /> } />
            </Routes>
        </BrowserRouter>
    )
}