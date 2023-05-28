import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

jest.mock('node-fetch', () => jest.fn());

describe('App', () => {
  const mockApiResponse = {
    schedule: [
      {
        date: 'Friday, January 13, 2023',
        events: [
          { name: 'Swag Distribution Starts', time: '3:00 PM', clickable: false },
          { name: 'Event Begins', time: '5:00 PM', clickable: false },
          { name: 'Swag Distribution Ends', time: '', clickable: false },
          { name: 'Opening Ceremony', time: '7:00 PM', clickable: false },
          { name: 'Hacking Begins', time: '9:00 PM', clickable: false },
          { name: 'Resume/Cover Letter', time: '10:00 PM', clickable: true },
          { name: 'MLH Event: Bob Ross Painting', time: '', clickable: true },
          { name: 'Equity In Tech', time: '10:45 PM', clickable: true },
        ],
      },
      {
        date: 'Saturday, January 14, 2023',
        events: [
          { name: 'Adding a Backend and Database to Your App in 3 Lines', time: '9:00 AM', clickable: false },
          { name: 'Intro to Algorithm / Applications', time: '10:00 AM', clickable: true },
          { name: 'Tech Interviews', time: '', clickable: true },
          { name: 'Intro to Github', time: '11:00 AM', clickable: true },
          { name: 'Swag Distribution Starts', time: '', clickable: false },
          { name: 'What Could Go Wrong', time: '', clickable: true },
          { name: 'Basics of HTML', time: '12:00 PM', clickable: true },
          { name: 'Intro to UI Design', time: '1:00 PM', clickable: true },
          { name: 'Android Development', time: '2:00 PM', clickable: true },
          { name: 'Swag Distribution Ends', time: '', clickable: false },
          { name: 'Intro to Python', time: '3:00 PM', clickable: true },
          { name: 'Intro to React', time: '4:00 PM', clickable: true },
          { name: 'Environmental Innovation Guided Discussion', time: '', clickable: true },
          { name: 'MLH Event: Security Challenge', time: '5:30 PM', clickable: true },
        ],
      },
      {
        date: 'Sunday, January 15, 2023',
        events: [
          { name: 'Project Submissions', time: '10:00 AM', clickable: false },
          { name: 'Judging Begins', time: '11:30 AM', clickable: false },
          { name: 'Closing Ceremony', time: '2:00 PM', clickable: false },
          { name: 'End of Event', time: '4:00 PM', clickable: false },
        ],
      },
    ],
  };

  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockApiResponse),
      })
    );
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  test('renders loading message initially', () => {
    render(<App />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  test('renders schedule table after loading data', async () => {
    render(<App />);
    await screen.findByText('Friday, January 13, 2023');

    expect(screen.getByText('Friday, January 13, 2023')).toBeInTheDocument();
    expect(screen.getByText('Swag Distribution Starts')).toBeInTheDocument();
    expect(screen.getByText('Event Begins')).toBeInTheDocument();
  });

  test('opens and closes the event modal', async () => {
    render(<App />);
    await screen.findByText('Friday, January 13, 2023');

    act(() => {
      const viewDetailsButtons = screen.getAllByText('View Details');
      fireEvent.click(viewDetailsButtons[0]);
    });
    expect(screen.getByText('Event Details')).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    });

    expect(screen.queryByText('Event Details')).not.toBeInTheDocument();
  });
});
