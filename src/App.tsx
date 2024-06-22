// src/App.tsx
import React from 'react';
import './App.css';
import EventRegistrationForm from './components/EventRegistrationForm';

const App: React.FC = () => {
  return (
    <div className="App">
      <EventRegistrationForm />
    </div>
  );
};

export default App;
