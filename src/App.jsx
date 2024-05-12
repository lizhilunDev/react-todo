import './App.css';
import Editor from './components/Editor';
import Header from './components/Header';
import List from './components/List';
import {
  useState,
  useRef,
  useReducer,
  useCallback,
  createContext,
  useMemo,
} from 'react';

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

export const TodoStateContext = createContext();
export const TodoDispacthContext = createContext();

function App() {
  const [todos, dispatch] = useReducer(reducer, mokData);
  const idRef = useRef(3);

  const onCreate = useCallback((content) => {
    dispatch({
      type: ACTION.CREATE,
      data: {
        id: idRef.current++,
        isDone: false,
        content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((id) => {
    dispatch({
      type: ACTION.UPDATE,
      data: id,
    });
  }, []);

  const onDelete = useCallback((id) => {
    dispatch({
      type: ACTION.DELETE,
      data: id,
    });
  }, []);

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className='App'>
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispacthContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispacthContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
