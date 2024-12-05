import React from 'react';
import './styles/global.css';
import ModelViewer from './components/ModelViewer';

const App: React.FC = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <ModelViewer />
  </div>
);

export default App;