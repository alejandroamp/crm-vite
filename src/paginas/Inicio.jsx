import { useEffect, useState } from 'react'
import Cliente from '../components/Cliente'


const Inicio = () => {

    const [clientes, setClientes] = useState([])

    useEffect(() => {
        const obtenerClientesAPI = async () => {
            try {
                const url = 'http://localhost:4000/customers'
                const response = await fetch(url)
                const resultado = await response.json()

                setClientes(resultado)
                //console.log(resultado)
            } catch (error) {
                console.log(error);
            }
        }
        obtenerClientesAPI()
    }, [])

    const handleEliminar = async id => {
        //console.log('Eliminando...', id)
        const confirmar = window.confirm('Are you sure?')

        if (confirmar) {
            try {
                const url = `http://localhost:4000/customers/${id}`
                const response = await fetch(url, {
                    method: 'DELETE'
                })
                await response.json()
                //console.log(resultado)
                setClientes(clientes.filter(cliente => cliente.id !== id))
                //location.reload() hace llamado a la API y consume recursos
            } catch (error) {
                console.log(error)
            }
        }
    }

  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Customers</h1>
        <p className='mt-3'>Customers Management</p>
        <table className='w-full mt-5 table-auto shadow bg-white'>
            <thead className='bg-gray-400'>
                <tr className='border text-gray-700'>
                    <th className='w-1/4 px-4 py-2'>Name</th>
                    <th className='w-1/4 px-4 py-2'>Company</th>
                    <th className='w-1/4 px-4 py-2'>Contact</th>
                    <th className='w-1/4 px-4 py-2'>Actions</th>
                </tr>
            </thead>
            <tbody className='bg-white'>
                { clientes.map(cliente => (
                    <Cliente key={cliente.id} cliente={cliente} handleEliminar={handleEliminar}/>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default Inicio