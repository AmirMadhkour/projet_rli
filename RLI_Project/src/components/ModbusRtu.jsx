import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import React from 'react';

const ModbusRtu = () => {
  const [slaveId, setSlaveId] = useState('01');
  const [functionCode, setFunctionCode] = useState('03');
  const [startAddress, setStartAddress] = useState('0000');
  const [numRegisters, setNumRegisters] = useState('0001');
  const [generatedFrame, setGeneratedFrame] = useState('');
  const [error, setError] = useState('');

  // Calcul CRC-16 Modbus fiable
  const calculateCRC = (data) => {
    let crc = 0xFFFF;
    for (let i = 0; i < data.length; i++) {
      crc ^= data[i];
      for (let j = 0; j < 8; j++) {
        if (crc & 0x0001) {
          crc = (crc >> 1) ^ 0xA001;
        } else {
          crc = crc >> 1;
        }
      }
    }
    return crc;
  };

  const generateFrame = () => {
    try {
      setError('');
      
      // Validation des entrées
      if (!slaveId || !functionCode || !startAddress || !numRegisters) {
        throw new Error('Tous les champs doivent être remplis');
      }

      const hexRegex = /^[0-9A-Fa-f]+$/;
      if (!hexRegex.test(slaveId) || !hexRegex.test(functionCode) || 
          !hexRegex.test(startAddress) || !hexRegex.test(numRegisters)) {
        throw new Error('Tous les champs doivent être en hexadécimal');
      }

      // Construction de la trame
      const dataPart = slaveId + functionCode + startAddress + numRegisters;
      
      // Conversion en tableau d'octets
      const bytes = [];
      for (let i = 0; i < dataPart.length; i += 2) {
        bytes.push(parseInt(dataPart.substr(i, 2), 16));
      }

      // Calcul CRC
      const crcValue = calculateCRC(bytes);
      const crcHex = crcValue.toString(16).padStart(4, '0');
      
      // Formatage little-endian
      const crcLowByte = crcHex.substring(2, 4);
      const crcHighByte = crcHex.substring(0, 2);
      
      // Trame finale
      const frame = `${dataPart}${crcLowByte}${crcHighByte}`.toUpperCase();
      setGeneratedFrame(frame);
      
    } catch (err) {
      setError(err.message);
      setGeneratedFrame('');
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Modbus RTU</Typography>
        
        <TextField
          label="ID Esclave (Hex)"
          value={slaveId}
          onChange={(e) => setSlaveId(e.target.value.replace(/[^0-9A-Fa-f]/g, ''))}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 2 }}
        />
        
        <TextField
          label="Code Fonction (Hex)"
          value={functionCode}
          onChange={(e) => setFunctionCode(e.target.value.replace(/[^0-9A-Fa-f]/g, ''))}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 2 }}
        />
        
        <TextField
          label="Adresse de Début (Hex)"
          value={startAddress}
          onChange={(e) => setStartAddress(e.target.value.replace(/[^0-9A-Fa-f]/g, ''))}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 4 }}
        />
        
        <TextField
          label="Nombre de Registres (Hex)"
          value={numRegisters}
          onChange={(e) => setNumRegisters(e.target.value.replace(/[^0-9A-Fa-f]/g, ''))}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 4 }}
        />
        
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button 
            variant="contained" 
            onClick={generateFrame}
          >
            Générer la Trame
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => {
              setSlaveId('01');
              setFunctionCode('03');
              setStartAddress('0000');
              setNumRegisters('0001');
            }}
          >
            Exemple
          </Button>
        </Box>
        
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            Erreur: {error}
          </Typography>
        )}
        
        {generatedFrame && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1">Trame générée (Hex):</Typography>
            <Paper elevation={1} sx={{ p: 2, mt: 1, backgroundColor: '#f5f5f5' }}>
              <Typography variant="body2" component="div">
                <pre style={{ margin: 0 }}>{generatedFrame}</pre>
              </Typography>
            </Paper>
            
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              Longueur: {generatedFrame.length / 2} octets
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ModbusRtu;