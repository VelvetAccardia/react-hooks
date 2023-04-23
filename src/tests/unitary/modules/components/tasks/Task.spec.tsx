import { fireEvent, render, screen } from '@testing-library/react';
import Task, { TaskProps } from '@/components/tasks/Task';
import '@testing-library/jest-dom';

describe('Task', () => {
  const mockToggleTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const taskProps: TaskProps = {
    id: '1',
    title: 'Test Task',
    completed: false,
    toggleTask: mockToggleTask,
    deleteTask: mockDeleteTask,
  };

  beforeEach(() => {
    render(<Task {...taskProps} />);
  });

  it('renders the task title', () => {
    expect(screen.getByText(taskProps.title)).toBeInTheDocument();
  });

  it('renders the task checkbox', () => {
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders the delete button', () => {
    const deleteButton = screen.getByText('Remover');
    expect(deleteButton).toBeInTheDocument();
  });

  it('toggles task completion status when checkbox is clicked', () => {
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockToggleTask).toHaveBeenCalledWith(taskProps.id);
  });

  it('deletes the task when the delete button is clicked', () => {
    const deleteButton = screen.getByText('Remover');
    fireEvent.click(deleteButton);
    expect(mockDeleteTask).toHaveBeenCalledWith(taskProps.id);
  });
});
