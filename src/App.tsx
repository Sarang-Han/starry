import React from 'react';
import './styles/global.css';
import ModelViewer from './components/ModelViewer';
import { StarField } from './components/StarField';
import AudioPlayer from './components/AudioPlayer';

const App: React.FC = () => (
  <div style={{ 
    width: '100vw', 
    height: '100vh',
    backgroundColor: '#000000',
    margin: 0,                 
    padding: 0,               
    overflow: 'hidden'        
  }}>
    <StarField />
    <ModelViewer />
    <AudioPlayer />
  </div>
);

export default App;