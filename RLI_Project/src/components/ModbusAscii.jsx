import { useState } from 'react'
import { TextField, Button, Box, Typography, Paper } from '@mui/material'
import React from 'react'


const ModbusAscii = () => {
  const [slaveId, setSlaveId] = useState('01')
  const [functionCode, setFunctionCode] = useState('03')
  const [startAddress, setStartAddress] = useState('0000')
  const [numRegisters, setNumRegisters] = useState('0001')
  const [generatedFrame, setGeneratedFrame] = useState('')

  const calculateLRC = (data) => {
    let lrc = 0
    for (let i = 0; i < data.length; i += 2) {
      const byte = parseInt(data.substr(i, 2), 16)
      lrc = (lrc + byte) & 0xFF
    }
    lrc = ((lrc ^ 0xFF) + 1) & 0xFF
    return lrc.toString(16).padStart(2, '0').toUpperCase()
  }

  const generateFrame = () => {
    // Construction de la trame sans LRC
    const dataPart = slaveId + functionCode + startAddress + numRegisters
    const lrc = calculateLRC(dataPart)
    
    // Formatage final ASCII
    const frame = `:${dataPart}${lrc}\r\n`
    setGeneratedFrame(frame)
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Modbus ASCII</Typography>
        
        <TextField
          label="ID Esclave (Hex)"
          value={slaveId}
          onChange={(e) => setSlaveId(e.target.value)}
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Code Fonction (Hex)"
          value={functionCode}
          onChange={(e) => setFunctionCode(e.target.value)}
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Adresse de Début (Hex)"
          value={startAddress}
          onChange={(e) => setStartAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Nombre de Registres (Hex)"
          value={numRegisters}
          onChange={(e) => setNumRegisters(e.target.value)}
          fullWidth
          margin="normal"
        />
        
        <Button 
          variant="contained" 
          onClick={generateFrame}
          sx={{ mt: 2 }}
        >
          Générer la Trame
        </Button>
        
        {generatedFrame && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">Trame générée:</Typography>
            <Paper elevation={1} sx={{ p: 2, mt: 1, backgroundColor: '#f5f5f5' }}>
              <code>{generatedFrame}</code>
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default ModbusAscii