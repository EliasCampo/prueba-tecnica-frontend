import { useEffect, useState } from "react"
import axiosPublic from "../service/axiosPublic"
import { useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosPublic.get("/tasks");
        setTask(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [location.pathname]);

  const handleDelete = async (id) => {
    try {
      await axiosPublic.delete(`/task/${id}`);
      setTask((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.log('error al eliminar la tarea')
    }
  };

  if (loading) return <div className="text-center p-8 text-lg">Cargando tareas...</div>;
  if (error) return <div className="text-center p-8 text-red-500 font-semibold">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className='max-w-2xl mx-auto'>
        <div className='flex w-full justify-between items-center mb-8'>
          <h1 className="text-3xl font-bold text-gray-800">Listado de Tareas</h1>
          <div>
            <button
              className='border rounded-lg bg-blue-400 p-2 cursor-pointer text-white'
              onClick={() => navigate('/create-task')}
            >
              Agregar nueva tarea
            </button>
          </div>
        </div>


        <div className="flex flex-col gap-6 w-full max-w-2xl">
          {task.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">No hay tareas disponibles</div>
          ) : (
            task.map((t) => (
              <div key={t.id} className="flex flex-col gap-3 bg-white border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="font-bold text-xl text-gray-800">{t.title}</h2>
                <p className="text-gray-600">{t.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${t.priorityTask === 'High' ? 'bg-red-100 text-red-800' :
                      t.priorityTask === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                      {t.priorityTask}
                    </span>
                  </div>

                  <div className='flex gap-2'>
                    <div>
                      <button
                        onClick={() => navigate(`/edit-task/${t.id}`)}
                        className='bg-yellow-500 border rounded-lg p-2 text-white cursor-pointer'
                      >
                        Editar
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className='bg-red-400 border rounded-lg p-2 text-white cursor-pointer'
                      >
                        Borrar
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage