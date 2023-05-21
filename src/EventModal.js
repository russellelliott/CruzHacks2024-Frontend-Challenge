import React, { useState } from 'react';

function EventModal({ event, onClose, onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [notify, setNotify] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ firstName, lastName, email, notify });
  };

  return (
    <div className="modal">
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