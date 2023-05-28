import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventModal from './EventModal';

describe('EventModal', () => {
  const event = {
    name: 'Test Event',
    time: '10:00 AM',
  };

  test('renders event details', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const position = { top: 100, left: 200 };

    render(
      <EventModal
        event={event}
        onClose={onClose}
        onSubmit={onSubmit}
        position={position}
      />
    );

    expect(screen.getByText('Event Details')).toBeInTheDocument();
    expect(screen.getByText(event.name)).toBeInTheDocument();
    expect(screen.getByText(event.time)).toBeInTheDocument();
  });

  test('calls onSubmit with form data when submitted with valid email', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const position = { top: 100, left: 200 };

    render(
      <EventModal
        event={event}
        onClose={onClose}
        onSubmit={onSubmit}
        position={position}
      />
    );

    const firstNameInput = screen.getByLabelText('First Name:');
    const lastNameInput = screen.getByLabelText('Last Name:');
    const emailInput = screen.getByLabelText('Email:');
    const notifyCheckbox = screen.getByLabelText('Notify:');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      notify: true,
    };

    fireEvent.change(firstNameInput, { target: { value: formData.firstName } });
    fireEvent.change(lastNameInput, { target: { value: formData.lastName } });
    fireEvent.change(emailInput, { target: { value: formData.email } });
    fireEvent.click(notifyCheckbox);
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(formData);
  });

  test('displays an alert when submitted with invalid email', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const position = { top: 100, left: 200 };

    render(
      <EventModal
        event={event}
        onClose={onClose}
        onSubmit={onSubmit}
        position={position}
      />
    );

    const emailInput = screen.getByLabelText('Email:');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('Please enter a valid email address.');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('calls onClose when Close button is clicked', () => {
    const onClose = jest.fn();
    const onSubmit = jest.fn();
    const position = { top: 100, left: 200 };

    render(
      <EventModal
        event={event}
        onClose={onClose}
        onSubmit={onSubmit}
        position={position}
      />
    );

    const closeButton = screen.getByRole('button', { name: 'Close' });

    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

//Mock window.alert
global.alert = jest.fn();
