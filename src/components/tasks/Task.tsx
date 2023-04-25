export interface TaskProps {
  id: string;
  title: string;
  completed: boolean;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  title,
  completed,
  toggleTask,
  deleteTask,
}) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTask(id)}
      />
      <div
        className="task-title"
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
      >
        {title}
      </div>
      <button aria-label={`Remover ${title}`} onClick={() => deleteTask(id)}>
        Remover
      </button>
    </div>
  );
};

export default Task;
