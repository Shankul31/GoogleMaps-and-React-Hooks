import React from 'react';
import { MapProvider } from './components/MapContext/MapContext'
import ListPanel from './components/ListPanel'
import Maps from './components/Maps'

function App() {
  return (
    <MapProvider>
      <div className="container mt-4">
        <div className='row'>
            <div className='col-6'>
                <Maps />
            </div>
            <div className='col-sm-6'>
                <ListPanel />
            </div>
        </div>
      </div>
    </MapProvider>
  );
}

export default App;
