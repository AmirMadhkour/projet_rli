import { Button, ButtonGroup } from '@mui/material'
import React from 'react'

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <ButtonGroup variant="contained" fullWidth>
      <Button 
        color={activeTab === 'ascii' ? 'primary' : 'inherit'}
        onClick={() => setActiveTab('ascii')}
      >
        Modbus ASCII
      </Button>
      <Button 
        color={activeTab === 'rtu' ? 'primary' : 'inherit'}
        onClick={() => setActiveTab('rtu')}
      >
        Modbus RTU
      </Button>
      <Button 
        color={activeTab === 'tcp' ? 'primary' : 'inherit'}
        onClick={() => setActiveTab('tcp')}
      >
        Modbus TCP/IP
      </Button>
    </ButtonGroup>
  )
}

export default Tabs