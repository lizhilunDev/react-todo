import './TodoItem.css';
import { memo } from 'react';
import { useContext } from 'react';
import { TodoDispacthContext } from '../App';

const TodoItem = ({ todo }) => {
  const { onUpdate, onDelete } = useContext(TodoDispacthContext);

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

export default memo(TodoItem);
