import React, { useState } from 'react';
import './App.css';

function EventModal({ event, onClose, onSubmit, position }) {
  const { top, left } = position;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [notify, setNotify] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    onSubmit({ firstName, lastName, email, notify });
  };

  return (
    <div className="event-modal"
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
    >
      <div className="modal-content">
        <h2>Event Details</h2>
        <p>{event.name}</p>
        <p>{event.time}</p>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Notify:
            <input
              type="checkbox"
              checked={notify}
              onChange={(e) => setNotify(e.target.checked)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default EventModal;