import React from 'react'
import { BrowserRouter, Routes, Route, Form} from 'react-router-dom'
import { FormPage } from '../Pages/Form'
import { HomePage } from '../Pages/Home'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/form' element={<FormPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router