import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
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
  return loading ? (
    <Spinner />
  ) : Object.keys(cliente).length === 0 ? (
    <h1 className="font-bold text-4xl">Not Found...</h1>
  ) : (
    <div>
      <h1 className="font-black text-4xl text-blue-900">View Customer</h1>
      <p className="mt-3">Information card about customer</p>

      {cliente.name && (
        <p className="text-4xl text-gray-600 mt-10">
          <span className="text-gray-800 font-bold">Name: </span>
          {cliente.name}
        </p>
      )}
      {cliente.company && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 font-bold">Company: </span>
          {cliente.company}
        </p>
      )}
      {cliente.email && (
        <p className="text-2xl text-gray-800 mt-4">
          <span className="text-gray-800 font-bold">Email: </span>
          {cliente.email}
        </p>
      )}
      {cliente.phone && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 font-bold">Phone: </span>
          {cliente.phone}
        </p>
      )}
      {cliente.info && (
        <p className="text-2xl text-gray-600 mt-4">
          <span className="text-gray-800 font-bold">Info: </span>
          {cliente.info}
        </p>
      )}
    </div>
  );
};

export default VerCliente;
