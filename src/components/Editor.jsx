import './Editor.css';
import { TodoDispacthContext } from '../App';
import { useState, useRef, useContext } from 'react';

const Editor = () => {
  const { onCreate } = useContext(TodoDispacthContext);

  const [content, setContent] = useState('');
  const inputRef = useRef();

  const onKeyDown = (e) => {
    if (e.keyCode === 13) onSubmit();
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (content === '') {
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent('');
  };

  return (
    <div className='Editor'>
      <input
        ref={inputRef}
        type='text'
        placeholder='새로운 Todo...'
        value={content}
        onChange={onChangeContent}
        onKeyDown={onKeyDown}
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
