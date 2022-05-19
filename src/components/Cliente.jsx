import { useNavigate } from 'react-router-dom'

const Cliente = ({ cliente, handleEliminar }) => {
  const navigate = useNavigate()
  return (
    <tr key={cliente.id} className="border text-gray-700 hover:bg-gray-300">
      <td className="border px-4 py-2">{cliente.name}</td>
      <td className="border px-4 py-2">{cliente.company}</td>
      <td className="border px-4 py-2">
        <p><span className="font-bold uppercase">Email: </span> {cliente.email}</p>
        <p><span className="font-bold uppercase">Tel: </span> {cliente.phone}</p>
      </td>
      <td className="grid grid-cols-3 gap-1 px-4 py-2 mt-1">
      <button type="button" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-full"
      onClick={() => navigate(`/customers/${cliente.id}`)}>
          View
        </button>
        <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={() => navigate(`/customers/edit/${cliente.id}`)}>
          Edit
        </button>
        <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={() => handleEliminar(cliente.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
export default Cliente;
