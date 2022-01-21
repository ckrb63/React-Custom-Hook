import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useFetch from './hooks/use-Fetch';

function App() {
  const [tasks, setTasks] = useState([]);

  const applyData = (data) => {
    const loadedTasks = [];
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }
      setTasks(loadedTasks);
  };

  const {isLoading, error, sendRequest} = useFetch();

  useEffect(() => {
    sendRequest({
      url : 'https://react-http-89f64-default-rtdb.firebaseio.com/tasks.json'
    },applyData);
  }, [sendRequest]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={sendRequest}
      />
    </React.Fragment>
  );
}

export default App;
