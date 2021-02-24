import React from 'react';
import { FakeStudentsProvider } from './student-context';
import StudentList from './components/StudentList';
import MyOtherForm from './components/MyOtherForm';
import './App.css';

const App = () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <FakeStudentsProvider>
            <StudentList />
          </FakeStudentsProvider>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <MyOtherForm />
        </div>
      </section>
    </>
  );
};

export default App;
