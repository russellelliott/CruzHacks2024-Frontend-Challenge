import React, { useEffect, useState } from 'react';
import EventModal from './EventModal';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDayIndex, setCurrentDayIndex] = useState(0); // Index of the currently displayed day

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

  const handlePreviousDay = () => {
    setCurrentDayIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextDay = () => {
    setCurrentDayIndex((prevIndex) =>
      Math.min(prevIndex + 1, data.schedule.length - 1)
    );
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
        <div>
          <table>
            <thead>
              <tr>
                <th colSpan="5">Schedule</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <button onClick={handlePreviousDay}>&lt; Previous</button>
                </td>
                <td colSpan="3">
                  <h2>{data.schedule[currentDayIndex].date}</h2>
                </td>
                <td>
                  <button onClick={handleNextDay}>Next &gt;</button>
                </td>
              </tr>
              {data.schedule[currentDayIndex].events.map((event, index) => (
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
            </tbody>
          </table>
        </div>
      )}
      {modalVisible && (
        <EventModal event={selectedEvent} onClose={closeModal} onSubmit={handleSubmit} />
      )}
      <button onClick={fetchData}>Refresh</button>
    </div>
  );
}

export default App;
