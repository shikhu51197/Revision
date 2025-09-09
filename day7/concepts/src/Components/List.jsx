import React from "react";

const List = () => {
  const tasks = [
    { id: 1, title: "Learn React", completed: true },
    { id: 2, title: "Build a Project", completed: false },
    { id: 3, title: "Practice Tailwind", completed: true },
  ];

  return (
    <ul className="p-6 space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center gap-2">
          {task.completed ? "✅" : "❌"} {task.title}
        </li>
      ))}
    </ul>
  );
};

export default List;
