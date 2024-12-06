import React from 'react';
import RoutineEditor from './components/RoutineEditor';

const App: React.FC = () => {
  const handleAccept = (value: string) => {
    console.log('Accepted routine:', value);
  };

  const handleCancel = () => {
    console.log('Editing canceled');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Routine Editor</h1>
      <RoutineEditor onAccept={handleAccept} onCancel={handleCancel} />
    </div>
  );
};

export default App;
