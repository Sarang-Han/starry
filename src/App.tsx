import React from 'react';
import './styles/global.css';
import ModelView from './components/ModelView';
import { StarField } from './components/StarField';
import AudioPlayer from './components/AudioPlayer';

const App: React.FC = () => (
  <div style={{ 
    width: '100vw',
    height: '100vh',
    background: 'linear-gradient(rgb(6, 2, 22) 0%,rgb(14, 4, 26) 65%,rgb(8, 22, 45) 100%)',
    margin: 0,
    padding: 0,
    overflow: 'hidden'        
  }}>
    <StarField />
    <ModelView />
    <AudioPlayer />
  </div>
);

export default App;