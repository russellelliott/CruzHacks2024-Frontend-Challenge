import React, { useEffect, useState } from 'react';
import EventModal from './EventModal';
import './App.css';
import logo from './logo.svg';

function App() {
  const [data, setData] = useState(null); //the data rom the API
  const [loading, setLoading] = useState(true); //Whether or not the page is loading
  const [modalVisible, setModalVisible] = useState(false); //Whether or not the event modal is visible
  const [selectedEvent, setSelectedEvent] = useState(null); //Event currently selected
  const [currentDayIndex, setCurrentDayIndex] = useState(0); //Index for current displayed day

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
    //Where form handling is
    console.log(formData);
    // ...
  };

  return (
    <div className="app">
      <div className="header">
        <img src={logo}  onClick={fetchData}alt="Reload" className="refresh-icon" />
        <h2>{data?.schedule[currentDayIndex].date}</h2>
        <div className="navigation-buttons">
          <button onClick={handlePreviousDay}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button onClick={handleNextDay}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="table-container">
          <table className="schedule-table">
            <tbody>
              {data?.schedule[currentDayIndex].events.map((event, index) => (
                <tr key={index}>
                  <td>{event.time}</td>
                  <td>{event.name}
                  <br></br>
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
    </div>
  );
}

export default App;
