import React, { useEffect, useState } from 'react';
import EventModal from './EventModal';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchData = () => {
    setLoading(true);
    fetch('/api/schedule')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalVisible(false);
  };

  const handleSubmit = (formData) => {
    // Handle the form submission here
    console.log(formData);
    // ...
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th colSpan="4">Schedule</th>
            </tr>
          </thead>
          <tbody>
            {data.schedule.map((day) => (
              <React.Fragment key={day.date}>
                <tr>
                  <th colSpan="5">{day.date}</th>
                </tr>
                {day.events.map((event, index) => (
                  <tr key={index}>
                    <td>{event.name}</td>
                    <td>{event.time}</td>
                    <td>{event.location}</td>
                    <td>
                      {event.clickable && (
                        <button onClick={() => openModal(event)}>View Details</button>
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
      {modalVisible && (
        <EventModal event={selectedEvent} onClose={closeModal} onSubmit={handleSubmit} />
      )}
      <button onClick={fetchData}>Refresh</button>
    </div>
  );
}

export default App;