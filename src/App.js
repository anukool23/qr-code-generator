import {React, lazy} from 'react';
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import { Container, Heading , ChakraProvider} from '@chakra-ui/react';
const Navbar = lazy(() => import("./components/Navbar"));
const QRCodeGenerator = lazy(()=> import("./components/QRCodeGenerator"))
const QRCodeGeneratorD = lazy(()=> import("./components/QRCodeGeneratorD"))

function App() {
  return (
    <ChakraProvider>
    <Router>
    <Container centerContent>
      <Heading as="h1" size="xl" my={5}>
        QR Code Generator
      </Heading>
      <Navbar />
      <Routes>
          <Route path="/fnvqr" element={<QRCodeGenerator />} />
          <Route path="/dairyqr" element={<QRCodeGeneratorD />} />
        </Routes>
    </Container>
    </Router>
    </ChakraProvider>
  );
}

export default App;
