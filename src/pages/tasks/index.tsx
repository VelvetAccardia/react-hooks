import styles from '@/styles/Task.module.css';
import TaskList from '@/components/tasks/TaskList';

const Home: React.FC = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Lista de Tarefas</h1>
      <TaskList />
    </div>
  );
};

export default Home;
