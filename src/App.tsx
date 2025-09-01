import { useEffect, useState } from 'react';
import './App.css'
import RandomListComponent from './components/list/RandomListComponent';
import useFetchList from './hooks/useFetchList';
import type { ListItem } from './types';

function App() {
  const { list: fetchedList, loading, error } = useFetchList();
  const [list, setList] = useState<ListItem[]>(fetchedList);

  useEffect(() => {
    setList(fetchedList);
  }, [fetchedList]);

  const updateList = (updatedList: ListItem[]) => {
    setList(updatedList);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <RandomListComponent list={list} setList={updateList} />
    </>
  )
}

export default App
