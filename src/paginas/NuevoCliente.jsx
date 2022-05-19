import React from 'react'
import Formulario from '../components/Formulario'


const NuevoCliente = () => {
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>New Customer</h1>
        <p className='mt-3'>New Customer Form</p>
        <Formulario />
    </>
  )
}

export default NuevoCliente