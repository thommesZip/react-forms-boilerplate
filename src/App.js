import React from 'react';
import MyForm from './components/MyForm';
import MyOtherForm from './components/MyOtherForm';
import './App.css';

function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function useAsyncData() {
  const [status, setStatus] = React.useState('loading');
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      await sleep(2000);
      setData({
        name: 'Thommes Zipner',
        email: 'thommy@gmail.com',
        country: 'Argentina',
        likeMusic: 'Yes',
        message: 'This is my message! 😎',
        accept: true,
      });
      setStatus('success');
    }
    fetchData();
  }, []);

  return { loading: status === 'loading', data };
}

const App = () => {
  const { loading, data } = useAsyncData();
  return (
    <>
      <section className="section">
        <div className="container">
          <MyForm data={data} isLoading={loading} />
        </div>
      </section>
      {/* <section className="section is-large">
        <div className="container">
          <MyOtherForm />
        </div>
      </section> */}
    </>
  );
};

export default App;
