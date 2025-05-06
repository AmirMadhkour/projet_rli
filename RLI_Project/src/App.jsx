import React from 'react'
import { useState } from 'react'
import Tabs from './components/Tabs'
import ModbusAscii from './components/ModbusAscii'
import ModbusRtu from './components/ModbusRtu'
import ModbusTcp from './components/ModbusTcp'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('ascii')

  return (
    <>
    <center>
    <div className='headerproject'>
      Projet RLI 
    </div></center>
    <div className="app-container">
      <h1>Générateur de Trames Modbus</h1>
      
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="tab-content">
        {activeTab === 'ascii' && <ModbusAscii />}
        {activeTab === 'rtu' && <ModbusRtu />}
        {activeTab === 'tcp' && <ModbusTcp />}
      </div>
    </div>
    <div className='amir'>
      <h1>Madhkour Amir</h1>
      <h2>IA2.2</h2>
    </div>
    </>
  )
}

export default App