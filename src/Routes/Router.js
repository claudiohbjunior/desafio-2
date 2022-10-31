import React from 'react'
import { BrowserRouter, Routes, Route, Form} from 'react-router-dom'
import { HomePage } from '../Pages/Home'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router