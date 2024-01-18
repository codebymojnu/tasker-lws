import { useState } from "react";
import AddEditModalForm from "./AddEditModalForm";
import NoTasksFound from "./NoTaskFound";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import TaskSearch from "./TaskSearch";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description: "I must learn to React to remove my mother eye water",
    tags: ["React", "Frontend", "Job", "Ma"],
    priority: "High",
    isFavorite: false,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showModalForm, setShowModalForm] = useState(false);
  const [updateTask, setUpdateTask] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);

  function handleAddClick(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      // Updating an existing task
      const updatedTasks = tasks.map((task) =>
        task.id === newTask.id ? newTask : task
      );
      setTasks(updatedTasks);
    }

    setShowModalForm(false);
  }

  function handleEditTask(task) {
    setUpdateTask(task);
    setShowModalForm(true);
  }

  function handleCloseClick() {
    setShowModalForm(false);
    setUpdateTask(null);
  }

  function handleDeleteTask(deleteTask) {
    const newTasks = tasks.filter((task) => task.id !== deleteTask.id);
    setTasks(newTasks);
  }

  function handleDeleteAllClick() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFavorite(favTask) {
    const favTaskIndex = tasks.indexOf(favTask);
    const newTasks = [...tasks];
    newTasks[favTaskIndex].isFavorite = !newTasks[favTaskIndex].isFavorite;
    setTasks(newTasks);
  }

  // function handle search text

  function handleSearch(searchQuery) {
    const filteredTasks = tasks.filter((task) =>
      task.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    );
    setFilteredTasks(filteredTasks);
  }
  return (
    <section className="mb-20" id="tasks">
      {showModalForm && (
        <AddEditModalForm
          onSave={handleAddClick}
          updateTask={updateTask}
          handleCloseClick={handleCloseClick}
        />
      )}
      <div className="container">
        {/* <!-- Search Box --> */}
        <div className="p-2 flex justify-end">
          <TaskSearch handleSearch={handleSearch} />
        </div>
        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <div className="mb-14 items-center justify-between sm:flex">
            <TaskAction
              handleAddClick={() => setShowModalForm(true)}
              handleDelteAllClick={handleDeleteAllClick}
            />
          </div>
          <div className="overflow-auto">
            {tasks.length > 0 ? (
              <TaskList
                tasks={filteredTasks.length > 0 ? filteredTasks : tasks}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
                handleFavorite={handleFavorite}
              />
            ) : (
              <NoTasksFound />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
