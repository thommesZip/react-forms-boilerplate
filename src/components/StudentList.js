import React from 'react';
import StudentForm from './StudentForm';
import { useStudents, useStudentsDispatch } from '../student-context';

export default function StudentList() {
  const students = useStudents();
  const [currentStudent, setCurrentStudent] = React.useState(null);
  const [newStudent, setNewStudent] = React.useState(false);
  const dispatch = useStudentsDispatch();

  function addNewStudent() {
    setCurrentStudent(null);
    setNewStudent(true);
  }
  console.log('useStudents', currentStudent, students);
  return (
    <div className="columns">
      <div className="column">
        <div className="is-centered box p-5">
          <div className="is-flex is-justify-content-space-between">
            <h2 className="title is-3">Students</h2>
            <button
              className="button is-rounded is-primary"
              onClick={(e) => addNewStudent()}
            >
              New Student
            </button>
          </div>
          <table className="table is-striped is-hoverable is-fullwidth">
            <tbody>
              {students.map((s) => (
                <tr
                  className={
                    s.id === currentStudent ? 'is-selected' : ''
                  }
                >
                  <td onClick={(e) => setCurrentStudent(s.id)}>
                    <span className="is-clickable">{s.name}</span>
                  </td>

                  <td
                    onClick={(e) => {
                      const result = window.confirm(
                        `Are you sure you want to delete ${s.name}?`,
                      );
                      if (result) {
                        if (currentStudent === s.id) {
                          setCurrentStudent(null);
                        }

                        dispatch({
                          type: 'DELETE_STUDENT',
                          studentId: s.id,
                        });
                      }
                    }}
                  >
                    <span className="is-clickable">delete</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="column">
        <StudentForm
          studentId={currentStudent}
          disabled={!currentStudent && !newStudent}
          onSuccess={() => {
            setNewStudent(null);
          }}
        />
      </div>
    </div>
  );
}
