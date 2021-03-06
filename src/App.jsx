import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import EditarCliente from './paginas/EditarCliente'
import Inicio from './paginas/Inicio'
import NuevoCliente from './paginas/NuevoCliente'
import VerCliente from './paginas/VerCliente'



function App() {
  console.log(import.meta.env);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/customers" element={<Layout />} >
          <Route index element={<Inicio />} />
          <Route path="new" element={<NuevoCliente />} />
          <Route path="edit/:id" element={<EditarCliente />} />
          <Route path=":id" element={<VerCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
