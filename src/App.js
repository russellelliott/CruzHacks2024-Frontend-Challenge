import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/schedule');
        const jsonData = await response.json();
        setData(jsonData.schedule);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          {data.map((scheduleItem) => (
            <div key={scheduleItem.date}>
              <h3>{scheduleItem.date}</h3>
              <ul>
                {scheduleItem.events.map((event) => (
                  <li key={event.name}>
                    <strong>{event.name}</strong>
                    {event.time && <span> - {event.time}</span>}
                    {event.clickable && <span> (Clickable)</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;