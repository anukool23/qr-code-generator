import {React, lazy} from 'react';
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import { Container, Heading , ChakraProvider} from '@chakra-ui/react';
const Navbar = lazy(() => import("./components/Navbar"));
const QRCodeGenerator = lazy(()=> import("./components/QRCodeGenerator"))
const QRCodeGeneratorD = lazy(()=> import("./components/QRCodeGeneratorD"))
const QRCodeGeneratorDold = lazy(()=> import("./components/QRCodeGeneratorDold"))
function App() {
  return (
    <ChakraProvider>
    <Router>
    <Container centerContent>
      <Navbar />
      <Heading as="h1" size="xl" my={5}>
        QR Code Generator
      </Heading>
      <Routes>
          <Route path="/fnvqr" element={<QRCodeGenerator />} />
          <Route path="/dairyqr" element={<QRCodeGeneratorD />} />
          <Route path="/dairyqrOld" element={<QRCodeGeneratorDold />} />
        </Routes>
    </Container>
    </Router>
    </ChakraProvider>
  );
}

export default App;
