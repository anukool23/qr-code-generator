import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, HStack, FormControl, FormLabel, Select, Text, Grid, Flex } from '@chakra-ui/react';
import { generateQRCode, generateRandomString } from '../qrCodeGenerator';
import { format } from 'date-fns';
import products from './products'; 

const QRCodeGenerator = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedSku, setSelectedSku] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd')); 
  const [quantity, setQuantity] = useState(1);
  const [qrCodes, setQrCodes] = useState([]);
  const [manualSku, setManualSku] = useState('');

  useEffect(() => {
    const product = products.find(p => p.name === selectedProduct);
    if (product) {
      setSelectedSku(product.sku);
      setWeight(product.weight.toString()); 
    } else {
      setSelectedSku('');
      setWeight('');
    }
  }, [selectedProduct]);

  const handleSkuChange = (sku) => {
    const product = products.find(p => p.sku === sku);
    if (product) {
      setSelectedProduct(product.name);
      setWeight(product.weight.toString());
    } else {
      setSelectedProduct('');
      setWeight('');
    }
    setSelectedSku(sku);
  };

  const handleGenerate = () => {
    if (!selectedProduct || !selectedSku || !weight || !date || !quantity) {
      alert('Please fill in all fields.');
      return;
    }

    const formattedDate = format(new Date(date), 'ddMMyy');
    const qrCodesArray = [];
    for (let i = 0; i < quantity; i++) {
      const flag = `${selectedSku}#${formattedDate}#${weight}#ANU#${generateRandomString(8)}`;
      qrCodesArray.push(flag);
    }
    setQrCodes(qrCodesArray);
  };

  useEffect(() => {
    qrCodes.forEach((code, index) => {
      generateQRCode(code, `qrcode-${index}`);
    });
  }, [qrCodes]);

  const handleManualSkuInput = (e) => {
    setManualSku(e.target.value);
    setSelectedSku(e.target.value); 
  };

  return (
    <Grid templateColumns="1fr 2fr" gap={8}>
      {/* Left side: Form */}
      <VStack spacing={4} align="flex-start">
        <FormControl id="product" isRequired>
          <FormLabel>Product</FormLabel>
          <Select
            placeholder="Select Product"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            {products.map((product) => (
              <option key={product.name} value={product.name}>
                {product.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="sku" isRequired>
          <FormLabel>SKU</FormLabel>
          <Select
            placeholder="Select or Enter SKU"
            value={selectedSku}
            onChange={(e) => handleSkuChange(e.target.value)}
          >
            {products.map((product) => (
              <option key={product.sku} value={product.sku}>
                {product.sku}
              </option>
            ))}
            <option value={manualSku}>Enter Manually</option>
          </Select>
          {selectedSku === 'Enter Manually' && (
            <Input
              placeholder="Enter SKU"
              value={manualSku}
              onChange={handleManualSkuInput}
            />
          )}
        </FormControl>
        {selectedSku && selectedSku !== 'Enter Manually' && (
          <Text mt={2}>SKU: {selectedSku}</Text>
        )}
        <FormControl id="weight" isRequired>
          <FormLabel>Weight</FormLabel>
          <Input
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </FormControl>
        <FormControl id="date" isRequired>
          <FormLabel>Date *</FormLabel>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormControl>
        <FormControl id="quantity" isRequired>
          <FormLabel>Quantity</FormLabel>
          <Input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
          />
        </FormControl>
        <Button onClick={handleGenerate} colorScheme="teal">
          Generate QR Codes
        </Button>
      </VStack>

      {/* Right side: Display QR Codes */}
      <Flex flexWrap="wrap" justify="center">
        {qrCodes.map((code, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg" mb={4} mr={4} textAlign="center">
            <canvas id={`qrcode-${index}`}></canvas>
            <Text mt={2}>{code}</Text>
          </Box>
        ))}
      </Flex>
    </Grid>
  );
};

export default QRCodeGenerator;
