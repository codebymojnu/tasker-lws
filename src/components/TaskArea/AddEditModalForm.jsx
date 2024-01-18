import { useState } from "react";

export default function AddEditModalForm({
  onSave,
  updateTask,
  handleCloseClick,
}) {
  const [task, setTask] = useState(
    updateTask || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      tags: [],
      priority: "",
      isFavorite: false,
    }
  );
  const [isAdd, setIsAdd] = useState(updateTask ? false : true);

  function handleChange(event) {
    const name = event.target.name;
    let value = event.target.value;
    if (name === "tags") {
      value = value.split(",");
    }
    setTask({
      ...task,
      [name]: value,
    });
  }
  return (
    <>
      <div className="bg-black bg-opacity-70 w-full h-full z-10 absolute top-70 left-0">
        <form className="mx-auto my-4 w-full max-w-[500px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-2 lg:my-20 lg:p-11 z-10">
          {/* <!-- inputs --> */}
          <div className="space-y-2 text-white lg:space-y-2">
            {/* <!-- title --> */}
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="title">Title</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                id="title"
                required
              />
            </div>
            {/* <!-- description --> */}
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="description">Description</label>
              <textarea
                className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                type="text"
                name="description"
                value={task.description}
                onChange={handleChange}
                id="description"
                required
              ></textarea>
            </div>
            {/* <!-- input group --> */}
            <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
              {/* <!-- tags --> */}
              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="tags">Tags</label>
                <input
                  className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                  type="text"
                  name="tags"
                  value={task.tags}
                  onChange={handleChange}
                  id="tags"
                  required
                />
              </div>
              {/* <!-- priority --> */}
              <div className="space-y-2 lg:space-y-3">
                <label htmlFor="priority">Priority</label>
                <select
                  className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  id="priority"
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
          {/* <!-- inputs ends --> */}
          <div className="mt-4 flex justify-center lg:mt-4">
            <button
              className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
              onClick={handleCloseClick}
            >
              Close
            </button>
            <button
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
              onClick={(e) => {
                e.preventDefault();
                onSave(task, isAdd);
              }}
            >
              {isAdd ? "Create new Task" : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
