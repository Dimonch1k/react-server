import "../../../styles/components/todoList/todoItem/CompleteTask.scss";

import checked from "../../../images/todo/checked.jpg";
import unchecked from "../../../images/todo/unchecked.jpg";

const CompleteTask = ({ toggleCompleteHandler, task }) => {
  const toggleComplete = (id) => {
    console.log(`Task id: ${id}`);
    toggleCompleteHandler(id);
  };

  return (
    <>
      <button className="complete-btn" onClick={() => toggleComplete(task.id)}>
        <img
          src={task.completed ? checked : unchecked}
          alt="checked unchecked"
        />
      </button>
    </>
  );
};

export default CompleteTask;
