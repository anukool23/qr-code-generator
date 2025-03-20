import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack, FormControl, FormLabel, Text, Grid, Flex } from '@chakra-ui/react';
import Select from 'react-select'; // Import react-select for searchable dropdowns
import { generateQRCode, generateRandomString } from '../qrCodeGenerator';
import { format } from 'date-fns';
import products from './productsFnV'; 
import { DownloadIcon } from "@chakra-ui/icons";

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

  const downloadImage = (index) => {
    const canvas = document.getElementById(`qrcode-${index}`);
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `qrcode-${index}.png`;
    link.click();
  };

  // Prepare product options for react-select
  const productOptions = products.map((product) => ({
    value: product.name,
    label: product.name,
  }));

  // Prepare SKU options for react-select
  const skuOptions = products.map((product) => ({
    value: product.sku,
    label: product.sku,
  }));

  return (
    <Grid templateColumns="1fr 3fr" gap={8} height="100vh" width={"100vh"} overflow="hidden">
      {/* Left side: Form */}
      <VStack spacing={4} align="flex-start" overflow="hidden">
        
        {/* Product Select with Search */}
        <FormControl id="product" isRequired>
          <FormLabel>Product</FormLabel>
          <Select
          
            placeholder="Select Product"
            options={productOptions}
            value={productOptions.find(option => option.value === selectedProduct)}
            onChange={(selectedOption) => setSelectedProduct(selectedOption.value)}
            isSearchable // Makes the dropdown searchable
          />
        </FormControl>

        {/* SKU Select with Search */}
        <FormControl id="sku" isRequired>
          <FormLabel>SKU</FormLabel>
          <Select
            placeholder="Select SKU"
            options={skuOptions}
            value={skuOptions.find(option => option.value === selectedSku)}
            onChange={(selectedOption) => handleSkuChange(selectedOption.value)}
            isSearchable // Makes the dropdown searchable
          />
          {selectedSku === 'Enter Manually' && (
            <Input
              placeholder="Enter SKU"
              value={manualSku}
              onChange={handleManualSkuInput}
            />
          )}
        </FormControl>

        {/* {selectedSku && selectedSku !== 'Enter Manually' && (
          <Text mt={2}>SKU: {selectedSku}</Text>
        )} */}

        <FormControl id="weight" isRequired>
          <FormLabel>Weight</FormLabel>
          <Input
            placeholder="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </FormControl>
        <FormControl id="date" isRequired>
          <FormLabel>Date</FormLabel>
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
          Generate Codes
        </Button>
      </VStack>

      {/* Right side: Display QR Codes */}
      <Flex flexWrap="wrap" justify="center" overflowY="auto" height="100vh" p={4}>
        {qrCodes.map((code, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="lg" mb={4} mr={4} textAlign="center">
            <canvas id={`qrcode-${index}`}></canvas>
            <Text mt={2} ml={2}>{code}</Text>
            <Button
              leftIcon={<DownloadIcon />}
              aria-label="Download QR code"
              mt={2}
              onClick={() => downloadImage(index)}
            >
              Download
            </Button>
          </Box>
        ))}
      </Flex>
    </Grid>
  );
};

export default QRCodeGenerator;
