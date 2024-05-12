import './TodoItem.css';
import { memo } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const onChangeCheckbox = () => {
    onUpdate(todo.id);
  };

  const onClickButton = () => {
    onDelete(todo.id);
  };

  return (
    <div className='TodoItem'>
      <input
        type='checkbox'
        checked={todo.isDone}
        onChange={onChangeCheckbox}
      />
      <div className='content'>{todo.content}</div>
      <div className='date'>{new Date(todo.date).toLocaleDateString()}</div>
      <button onClick={onClickButton}>삭제</button>
    </div>
  );
};

export default memo(TodoItem, (prevProps, nextProps) => {
  if (
    prevProps.todo.id !== nextProps.todo.id ||
    prevProps.todo.isDone !== nextProps.todo.isDone ||
    prevProps.todo.content !== nextProps.todo.content ||
    prevProps.todo.date !== nextProps.todo.date
  ) {
    return false;
  }

  return true;
});
