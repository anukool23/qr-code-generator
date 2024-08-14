import React from 'react';
import { Container, Heading } from '@chakra-ui/react';
import QRCodeGenerator from './components/QRCodeGenerator';

function App() {
  return (
    <Container centerContent>
      <Heading as="h1" size="xl" my={5}>
        QR Code Generator
      </Heading>
      <QRCodeGenerator />
    </Container>
  );
}

export default App;
