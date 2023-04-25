import TaskInput, { TaskInputProps } from '@/components/tasks/TaskInput';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('TaskInput', () => {
  const mockAddTask = jest.fn();
  const taskInputProps: TaskInputProps = {
    addTask: mockAddTask,
  };

  beforeEach(() => {
    render(<TaskInput {...taskInputProps} />);
  });

  describe('rendering', () => {
    it('renders the form to input a task', () => {
      const input = screen.getByPlaceholderText('Digite uma tarefa');
      expect(input).toBeInTheDocument();
    });

    it('renders the add button', () => {
      const addButton = screen.getByText('Adicionar');
      expect(addButton).toBeInTheDocument();
    });
  });

  describe('task submission', () => {
    it('submits the task when the add button is clicked', () => {
      const addButton = screen.getByText('Adicionar');
      const input = screen.getByPlaceholderText('Digite uma tarefa');
      fireEvent.change(input, { target: { value: 'tarefa 1' } });
      fireEvent.click(addButton);
      expect(mockAddTask).toHaveBeenCalledWith('tarefa 1');
    });

    it('does not submit the task when the input is empty', () => {
      const addButton = screen.getByText('Adicionar');
      const input = screen.getByPlaceholderText('Digite uma tarefa');
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.click(addButton);
      expect(mockAddTask).not.toHaveBeenCalled();
    });

    it('clears the input field after successful task submission', () => {
      const addButton = screen.getByText('Adicionar');
      const input = screen.getByPlaceholderText('Digite uma tarefa');
      fireEvent.change(input, { target: { value: 'tarefa 1' } });
      fireEvent.click(addButton);
      expect(input).toHaveValue('');
    });
  });
});
