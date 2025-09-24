import { useEffect, useState } from "react";
import axiosPublic from "../../service/axiosPublic";
import { useNavigate } from "react-router-dom";

const Form = ({ taskId }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axiosPublic.get(`/task/${taskId}`);
                setTitle(response.data.title);
                setDescription(response.data.description);
            } catch (error) {
                console.error("Error al obtener la tarea:", error);
            }
        };

        if (taskId) fetchTask();
    }, [taskId]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (taskId) {
                await axiosPublic.put(`/task/${taskId}`, {
                    title,
                    description,
                });
            } else {
                await axiosPublic.post("/createTask", {
                    title,
                    description
                });
            }
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
                    {taskId ? 'Actualizar' : 'Agregar'}

                </button>
            </div>
        </form>



    )
}

export default Form