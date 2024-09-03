import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulasi pengambilan data dari API
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Monolith Frontend</h1>
        {data ? (
          <ul>
            {data.slice(0, 5).map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
};

export default App;
