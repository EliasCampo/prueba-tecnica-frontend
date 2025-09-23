import { useEffect, useState } from "react"
import axiosPublic from "../service/axiosPublic"

const HomePage = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axiosPublic.get("/tasks");
        console.log(response.data);
        setTask(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, []);

  const handleDelete = async (id) =>{
    try{
      await axiosPublic.delete(`/task/${id}`);
        setTask((prev)=> prev.filter((t) => t.id !== id));
    }catch(err){
      console.log('error al eliminar la tarea')
    }
  };

  if (loading) return <div className="text-center p-8 text-lg">Cargando tareas...</div>;
  if (error) return <div className="text-center p-8 text-red-500 font-semibold">Error: {error}</div>;

  return (
    <div className="p-10 bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Listado de Tareas</h1>

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
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${t.priority === 'high' ? 'bg-red-100 text-red-800' :
                    t.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                    {t.priority}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className='bg-red-400 border rounded-lg p-1 text-white cursor-pointer'
                  >
                    Borrar
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default HomePage