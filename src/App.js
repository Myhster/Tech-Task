import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Datatable from './Datatable';
import './App.css';

/* url that gets called, reduced  to the necessary parts - gender, name, nationality,
 location and email. Ten results are requested.  */
const url =
  'https://randomuser.me/api/?inc=gender,name,nat,location,email&results=10';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');

  /* fetch logic in order to get data from randomuser */
  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setData(data.results);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  /* perform fetch logic only once */
  useEffect(() => {
    fetchData();
  }, []);

  /* filter logic */
  function search(rows) {
    return rows.filter(
      (row) =>
        row.location.country.toLowerCase().indexOf(q.toLocaleLowerCase()) > -1
    );
  }

  /* return while data gets fetched */
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  /* Return when data is loaded. Styling is provided by bootstrap classes */
  return (
    <main>
      <div className='container dist'>
        <div class='container-sm'>
          <div className=''>
            <h1>Tech Task</h1>
          </div>
          <input
            type='text'
            class='form-control'
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder='Filter by country name'
          />
        </div>
        <Datatable data={search(data)} />
      </div>
    </main>
  );
}

export default App;
