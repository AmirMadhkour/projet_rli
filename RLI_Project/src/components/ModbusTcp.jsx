import { useState } from 'react'
import { TextField, Button, Box, Typography, Paper } from '@mui/material'
import React from 'react'


const ModbusTcp = () => {
  const [transactionId, setTransactionId] = useState('0001')
  const [protocolId, setProtocolId] = useState('0000')
  const [length, setLength] = useState('0006')
  const [slaveId, setSlaveId] = useState('01')
  const [functionCode, setFunctionCode] = useState('03')
  const [startAddress, setStartAddress] = useState('0000')
  const [numRegisters, setNumRegisters] = useState('0001')
  const [generatedFrame, setGeneratedFrame] = useState('')

  const generateFrame = () => {
    const mbap = transactionId + protocolId + length
    const pdu = slaveId + functionCode + startAddress + numRegisters
    const frame = `${mbap}${pdu}`
    setGeneratedFrame(frame.toUpperCase())
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Modbus TCP/IP</Typography>
        
        <TextField
          label="ID Transaction (Hex)"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Protocol ID (Hex)"
          value={protocolId}
          onChange={(e) => setProtocolId(e.target.value)}
          fullWidth
          margin="normal"
        />
        
        <TextField
          label="Length (Hex)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          fullWidth
          margin="normal"
        />
        
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
            <Typography variant="subtitle1">Trame générée (Hex):</Typography>
            <Paper elevation={1} sx={{ p: 2, mt: 1, backgroundColor: '#f5f5f5' }}>
              <code>{generatedFrame}</code>
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default ModbusTcp