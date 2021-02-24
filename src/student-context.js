import React from 'react';
import faker from 'faker';

const FakeStudentsContext = React.createContext();
const FakeStudentsDispatchContext = React.createContext();

export function FakeStudentsProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    studentReducer,
    generateFakeStudents(8),
  );
  console.log(state);
  return (
    <FakeStudentsContext.Provider value={state}>
      <FakeStudentsDispatchContext.Provider value={dispatch}>
        {children}
      </FakeStudentsDispatchContext.Provider>
    </FakeStudentsContext.Provider>
  );
}

function studentReducer(state, action) {
  switch (action.type) {
    case 'UPSERT_STUDENT': {
      const student = action.data;
      if (student.id) {
        return [...state.filter((s) => s.id !== student.id), student];
      }
      return [...state, { ...student, id: faker.random.uuid() }];
    }
    case 'DELETE_STUDENT': {
      const studentId = action.studentId;
      if (!studentId) {
        return state;
      }
      return state.filter((s) => s.id !== studentId);
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function useStudents() {
  const context = React.useContext(FakeStudentsContext);
  if (context === undefined) {
    throw new Error(
      'useStudents must be used within a FakeStudentsProvider',
    );
  }
  return context;
}

export function useStudent(studentId = null) {
  const students = React.useContext(FakeStudentsContext);
  const [status, setStatus] = React.useState('new');
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      if (!studentId) {
        setData(null);
        return;
      }
      setStatus('loading');
      await sleep(1000);
      setData(students.find((s) => s.id === studentId));
      setStatus('success');
    }
    fetchData();
  }, [studentId, students]);

  return { loading: status === 'loading', data };
}

export function useStudentsDispatch() {
  const context = React.useContext(FakeStudentsDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useStudentsDispatch must be used within a FakeStudentsProvider',
    );
  }
  return context;
}

function generateFakeStudents(amount = 3, count = 0) {
  const students = [...Array(amount).keys()].map(() => {
    return {
      id: faker.random.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      country: 'Argentina',
      likeMusic: faker.random.boolean() ? 'Yes' : 'No',
      message: `${faker.git.commitMessage()} 😎`,
      accept: true,
    };
  });
  return students;
}

export function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
