import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Spinner from "../components/Spinner";
import Alerta from "./Alerta";

const Formulario = ({ cliente, loading }) => {

  const [addedCustomer, setAddedCustomer] = useState(false);

  const navigate = useNavigate();
  const nuevoCLienteSchema = Yup.object().shape({
    name: Yup.string().required().min(3).max(40),
    company: Yup.string().required(),
    email: Yup.string().required().email(),
    phone: Yup.number()
      .typeError("must be a valid phone number")
      .integer("phone number not valid")
      .positive("phone number not valid"),
    info: Yup.string(),
  });

  const handleSubmit = async (values) => {
    //console.log(values)
    try {
      if (cliente.id) {
        //Editando Registro
        //console.log("Editando...");
        const url = `http://localhost:4000/customers/${cliente.id}`;
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        const resultado = await response.json();
        console.log(resultado);

        navigate("/customers");
      } else {
        //Nuevo Registro
        //console.log('Nuevo registro');
        const url = "http://localhost:4000/customers";
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        const resultado = await response.json();
        console.log(resultado);
        setAddedCustomer(true);
        setTimeout(() => {
          setAddedCustomer(false);
        }
          , 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.name ? "Edit Customer" : "Add Customer"}
      </h1>
      {addedCustomer ? (<Alerta><p>Customer added</p></Alerta>) : null}
      <Formik
        initialValues={{
          // sintaxis para buscar si existe cliente.nombre, si existe agregalo, sino dejalo vacio,
          // se puede usar un ternario tambien
          name: cliente?.name || "",
          company: cliente?.company || "",
          email: cliente?.email || "",
          phone: cliente?.phone || "",
          info: cliente?.info || "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoCLienteSchema}
      >
        {({ errors, touched }) => {
          //console.log(data)
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                  Name:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="mt-2 blovk w-full p-3 bg-gray-50"
                  placeholder="Customer Name"
                />
                {errors.name && touched.name ? (
                  <p className="text-red-500 text-xs italic">{errors.name}</p>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="company">
                  Company:
                </label>
                <Field
                  type="text"
                  id="company"
                  name="company"
                  className="mt-2 blovk w-full p-3 bg-gray-50"
                  placeholder="Company Name"
                />
                {errors.company && touched.company ? (
                  <p className="text-red-500 text-xs italic">
                    {errors.company}
                  </p>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-2 blovk w-full p-3 bg-gray-50"
                  placeholder="Email"
                />
                {errors.email && touched.email ? (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="phone">
                  Phone:
                </label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-2 blovk w-full p-3 bg-gray-50"
                  placeholder="Phone"
                />
                {errors.phone && touched.phone ? (
                  <p className="text-red-500 text-xs italic">{errors.phone}</p>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="info">
                  Info:
                </label>
                <Field
                  type="text"
                  as="textarea"
                  id="info"
                  name="info"
                  className="mt-2 blovk w-full p-3 bg-gray-50 h-40 resize-none"
                  placeholder="Additional Information"
                />
              </div>
              <input
                type="submit"
                value={cliente?.name ? "Edit Customer" : "Add Customer"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

//setea por defecto un objeto de cliente vacio
Formulario.defaultProps = {
  cliente: {},
  loading: false,
};
export default Formulario;
