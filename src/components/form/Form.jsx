import { useState } from "react";
import axiosPublic from "../../service/axiosPublic";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosPublic.post("/createTask", {
                title,
                description
            });
            console.log("tarea creada", res.data);
            navigate("/");
        } catch (error) {
            console.error("error creando tarea: ", error)
        }
    };


    return (

        <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-2xl bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow gap-4"

        >
            <div className='flex flex-col gap-1'>
                <label className="font-medium">
                    Titulo de la tarea:
                </label>
                <input
                    type="text"
                    name="title"
                    placeholder="Escriba un titulo para la tarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400'
                />
            </div>

            <div className='flex flex-col gap-1'>
                <label className='font-medium'>
                    Descripcion de la tarea:
                </label>
                <textarea
                    name="description"
                    placeholder="Escriba una descripcion para la tarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400'

                />
            </div>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="border rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 transition-colors"
                >
                    Enviar
                </button>
            </div>
        </form>



    )
}

export default Form