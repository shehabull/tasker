import { useState } from "react";
import ActionTask from "./ActionTask";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";
import SearchTask from "./SearchTask";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const deafultTask = {
    id: crypto.randomUUID(),
    title: "Todo 1",
    description: "dfad fadfadf af asdfa",
    tags: ["react", "next"],
    priority: "High",
    isFavourite: true,
  };
  const [tasks, setTasks] = useState([deafultTask]);
  const [showModal, setShowModal] = useState(false);
  const [TaskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddEditTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    handleClose();
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowModal(true);
  }

  function handleClose() {
    setTaskToUpdate(null);
    setShowModal(false);
  }

  function handleDelete(TaskId) {
    const TasksAfterDelete = tasks.filter((task) => task.id !== TaskId);
    setTasks(TasksAfterDelete);
  }

  function handleDeleteAll() {
    tasks.length = 0;
    setTasks([...tasks]);
  }

  function handleFavourite(TaskId) {
    setTasks(
      tasks.map((task) => {
        if (task.id == TaskId) {
          return { ...task, isFavourite: !task.isFavourite };
        }
        return task;
      })
    );
  }

  function handleSearch(searchTerm) {
    const filterdTask = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTasks([...filterdTask]);
  }

  return (
    <>
      {showModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskForUpdate={TaskToUpdate}
          onClose={handleClose}
        />
      )}

      <section className="mb-20" id="tasks">
        <div className="container">
          <div className="p-2 flex justify-end">
            <SearchTask onSearch={handleSearch} />
          </div>

          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <ActionTask
              onAddClick={() => setShowModal(true)}
              onDeleteAll={handleDeleteAll}
            />
            {tasks.length > 0 ? (
              <TaskList
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDelete}
                onFav={handleFavourite}
              />
            ) : (
              <NoTaskFound />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
