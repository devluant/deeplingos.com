import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home";
import Steps from "./pages/Steps";

export default function App() {
    const [lessonData, setLessonData] = React.useState([])    
    return (        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home lessonData={ lessonData } setLessonData={ setLessonData } /> } />
                <Route path="/steps" element={ <Steps lessonData={ lessonData } /> } />
            </Routes>
        </BrowserRouter>
    )
}