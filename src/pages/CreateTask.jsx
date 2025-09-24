import { ArrowLeftImgIcon } from '../components/assets/General'
import Form from '../components/form/Form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const CreateTask = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const isEditing = location.pathname.includes('/edit-task');

    return (
        <div className='flex flex-col justify-center items-center gap-2'>
            <div className='flex items-center max-w-2xl w-full p-6'>
                <div className='flex items-center w-full relative'>
                    <button
                        className='absolute left-0 cursor-pointer'
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeftImgIcon />
                    </button>
                    <h1 className='flex-1 text-center text-2xl'>
                        {isEditing ? 'Editar tarea' : 'Agregar una nueva tarea'}</h1>
                </div>
            </div>
            <div className='flex justify-center items-center w-full h-full '>
                <Form
                    taskId={isEditing ? id : null}
                />
            </div>
        </div>
    )
}

export default CreateTask