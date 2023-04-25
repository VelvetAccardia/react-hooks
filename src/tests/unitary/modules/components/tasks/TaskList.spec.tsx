import TaskList from '@/components/tasks/TaskList';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('TaskList', () => {
  beforeEach(() => {
    render(<TaskList />);
  });

  afterEach(() => {
    cleanup();
  });

  describe('rendering', () => {
    it('renders the Task Input', () => {
      const taskInput = screen.getByPlaceholderText('Digite uma tarefa');
      expect(taskInput).toBeInTheDocument();
    });
  });

  describe('adding tasks', () => {
    beforeEach(() => {
      const addTaskButton = screen.getByText('Adicionar');
      const taskInput = screen.getByPlaceholderText('Digite uma tarefa');
      fireEvent.change(taskInput, { target: { value: 'tarefa 1' } });
      fireEvent.click(addTaskButton);
    });

    it('adds a new task to the list and verify if it shows correctly', () => {
      const taskTitle = screen.getByText('tarefa 1');
      expect(taskTitle).toBeInTheDocument();
    });

    it('shows the checkbox for the new task', () => {
      const taskCheckbox = screen.getByRole('checkbox');
      expect(taskCheckbox).toBeInTheDocument();
    });

    it("has an 'uncompleted' status for the new task", () => {
      const taskCheckbox = screen.getByRole('checkbox');
      expect(taskCheckbox).not.toBeChecked();
    });

    it('adds new tasks to the the list and verify it shows all of them correctly', () => {
      const taskInput = screen.getByPlaceholderText('Digite uma tarefa');
      const addTaskButton = screen.getByText('Adicionar');
      const taskTitles = ['tarefa 2', 'tarefa 3'];

      taskTitles.forEach((title) => {
        fireEvent.change(taskInput, { target: { value: title } });
        fireEvent.click(addTaskButton);
      });

      const expectedTaskTitles = ['tarefa 1', ...taskTitles];
      const renderedTaskTitles = screen.getAllByText(/tarefa \d/);

      expect(renderedTaskTitles).toHaveLength(expectedTaskTitles.length);

      expectedTaskTitles.forEach((expectedTitle) => {
        const matchingTaskTitle = renderedTaskTitles.find(
          (taskTitle) => taskTitle.textContent === expectedTitle,
        );
        expect(matchingTaskTitle).toBeDefined();
        expect(matchingTaskTitle).toBeInTheDocument();
      });
    });
  });

  describe('excluding tasks', () => {
    beforeEach(() => {
      const addTaskButton = screen.getByText('Adicionar');
      const taskInput = screen.getByPlaceholderText('Digite uma tarefa');
      fireEvent.change(taskInput, { target: { value: 'tarefa 1' } });
      fireEvent.click(addTaskButton);
    });

    it('deletes a task from the list', () => {
      const deleteTaskButton = screen.getByText('Remover');
      fireEvent.click(deleteTaskButton);
      const taskTitle = screen.queryByText('tarefa 1');
      expect(taskTitle).not.toBeInTheDocument();
    });

    it('deletes multiple tasks from the list', () => {
      const taskInput = screen.getByPlaceholderText('Digite uma tarefa');
      const addTaskButton = screen.getByText('Adicionar');
      const taskTitles = ['tarefa 2', 'tarefa 3'];

      taskTitles.forEach((title) => {
        fireEvent.change(taskInput, { target: { value: title } });
        fireEvent.click(addTaskButton);
      });

      taskTitles.push('tarefa 1');

      taskTitles.forEach((title) => {
        const deleteTaskButton = screen.getByText('Remover', {
          selector: `button[aria-label="Remover ${title}"]`,
        });
        fireEvent.click(deleteTaskButton);
      });

      const remainingTasks = screen.queryAllByText(/tarefa \d/);
      expect(remainingTasks).toHaveLength(0);
    });
  });

  describe('handling task completion', () => {
    beforeEach(() => {
      const addTaskButton = screen.getByText('Adicionar');
      const taskInput = screen.getByPlaceholderText('Digite uma tarefa');
      fireEvent.change(taskInput, { target: { value: 'tarefa 1' } });
      fireEvent.click(addTaskButton);
    });

    it('marking task as concluded and verifies its checked status', () => {
      const checkbox = screen.getByRole('checkbox');
      fireEvent.change(checkbox, { target: { checked: true } });
      expect(checkbox).toBeChecked();
    });

    it('toggles the textDecoration style based on the task completion status', () => {
      const taskTitle = screen.getByText('tarefa 1');
      const taskContainer = taskTitle.parentElement?.parentElement;
      const taskTitleElement = taskContainer?.querySelector(
        '.task-title',
      ) as HTMLElement;

      expect(taskTitleElement?.style.textDecoration).toBe('none');

      const taskCheckbox = screen.getByRole('checkbox');
      fireEvent.click(taskCheckbox);

      expect(taskTitleElement.style.textDecoration).toBe('line-through');

      fireEvent.click(taskCheckbox);

      expect(taskTitleElement.style.textDecoration).toBe('none');
    });
  });
});
