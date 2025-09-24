import { useEffect, useState } from "react";
import axiosPublic from "../../service/axiosPublic";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify"

const Form = ({ taskId }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priorityTask, setpriorityTask] = useState("High");


    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axiosPublic.get(`/task/${taskId}`);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setpriorityTask(response.data.priorityTask);
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
                    priorityTask
                });
                toast.success("Tarea editada correctamente", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "dark"
                })
            } else {
                await axiosPublic.post("/createTask", {
                    title,
                    description,
                    priorityTask
                });
                toast.success("Tarea creada correctamente", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "dark"
                })
            }
            navigate("/");
        } catch (error) {
            console.error("error creando tarea: ", error);
            toast.error("Error al guardar la tarea", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark"
            });
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
                    required
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
                    required

                />
            </div>

            <div className='flex flex-col gap-1'>
                <label className='font-medium'>
                    Prioridad de la tarea:
                </label>
                <select
                    name="priorityTask"
                    value={priorityTask}
                    onChange={(e) => setpriorityTask(e.target.value)}
                    className='px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400'
                >
                    <option value='High'>High</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                </select>
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