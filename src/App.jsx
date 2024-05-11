import './App.css';
import Editor from './components/Editor';
import Header from './components/Header';
import List from './components/List';
import { useState, useRef, useReducer } from 'react';

const ACTION = Object.freeze({
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
  CREATE: 'CREATE',
});

const mokData = [
  {
    id: 0,
    isDone: false,
    content: 'React 공부하기',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: true,
    content: '빨래하기',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: '노래 연습하기',
    date: new Date().getTime(),
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.DELETE:
      return state.filter((todo) => todo.id !== action.data);
    case ACTION.UPDATE:
      return state.map((todo) =>
        todo.id === action.data ? { ...todo, isDone: !todo.isDone } : todo
      );
    case ACTION.CREATE:
      return [action.data, ...state];
    default:
      return state;
  }
};

function App() {
  const [todos, dispatch] = useReducer(reducer, mokData);
  const idRef = useRef(3);

  const onDelete = (id) => {
    dispatch({
      type: ACTION.DELETE,
      data: id,
    });
  };

  const onUpdate = (id) => {
    dispatch({
      type: ACTION.UPDATE,
      data: id,
    });
  };

  const onCreate = (content) => {
    dispatch({
      type: ACTION.CREATE,
      data: {
        id: idRef.current++,
        isDone: false,
        content,
        date: new Date().getTime(),
      },
    });
  };

  return (
    <div className='App'>
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
