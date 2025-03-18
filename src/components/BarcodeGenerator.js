import React, { useState } from "react";
import { ChakraProvider, Box, Select, Heading, VStack } from "@chakra-ui/react";
import Barcode from "react-barcode";
import productsBarcode from "./productsBarcode";  // Importing product data

function App() {
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleSelectChange = (e) => {
    const productId = e.target.value;
    const product = productsBarcode.find((prod) => prod.id.toString() === productId);
    setSelectedProduct(product ? product.code : "");
  };

  return (
    <ChakraProvider>
      <Box w="100vw" h="100vh" display="flex" justifyContent="center" alignItems="center" bg="gray.50">
        <VStack spacing={8} p={10} borderRadius="md" bg="white" boxShadow="xl">
          <Heading as="h1" size="lg">
            Barcode Generator
          </Heading>
          <Select placeholder="Select a product" onChange={handleSelectChange} size="lg" w="300px">
            {productsBarcode.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </Select>
          {selectedProduct && (
            <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md" bg="gray.100">
              <Barcode value={selectedProduct} />
            </Box>
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
