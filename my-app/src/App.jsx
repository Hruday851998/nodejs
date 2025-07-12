import React,{ useState, useEffect } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);
""
  return (
    <div>
      <header>
        <h1>Items</h1>
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;