import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  //console.log(id)
  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/customers/${id}`;
        const response = await fetch(url);
        const resultado = await response.json();
        //console.log(resultado)
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setLoading(!loading);
    };
    obtenerClienteAPI();
  }, []);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Edit Customer</h1>
      <p className="mt-3">Edit Customer Form</p>
      {cliente?.name ? (
        <Formulario cliente={cliente} loading={loading} />
      ) : (
        <h1 className="font-bold text-2xl">Customer ID not valid...</h1>
      )}
    </>
  );
};

export default EditarCliente;
