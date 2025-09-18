import React, { useState } from "react";
import StudentCard from "../components/StudentCard";
import Button from "../components/Button";

export default function Dashboard() {
  const [attendance, setAttendance] = useState(true);

  const subjects = [
    { id: 1, subject: "Math", completed: true },
    { id: 2, subject: "Science", completed: false },
    { id: 3, subject: "English", completed: true },
  ];

  const student = { name: "Rahul Sharma", age: 20, grade: "A" };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Student Card */}
      <StudentCard student={student} />

      {/* Attendance Toggle */}
      <div className="mb-4">
        <p className="mb-2 font-semibold">Attendance: {attendance ? "Present ✅" : "Absent ❌"}</p>
        <Button theme="primary" onClick={() => setAttendance(!attendance)}>
          Show Attendance
        </Button>
      </div>

      {/* Subjects List */}
      <div>
        <h2 className="text-xl font-bold mb-2">Subjects</h2>
        <ul className="list-disc pl-6">
          {subjects.map((s) => (
            <li key={s.id}>
              {s.subject} - {s.completed ? "Completed ✅" : "Pending ❌"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
