import { Flex, Box, Link, Image } from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";
import qrLogo from "../assets/homeLogo.png"; // Replace with the actual path to your QR logo

function NavBar() {
  const activeLinkStyle = {
    backgroundColor: "teal.500",
    color: "white",
    borderRadius: "md",
  };

  return (
    <Flex
      as="nav"
      bg="gray.800"
      color="white"
      position="fixed"
      top={0}
      width="100%"
      zIndex={1000}
      p={3}
      boxShadow="md"
      height="60px"
      justifyContent="space-between"
      alignItems="center"
    >
      {/* QR Logo on the Left */}
      <Box ml={4} marginRight={4} textAlign="left">
        <Link as={RouterLink} to="/">
          <Image
            src={qrLogo}
            alt="QR Logo"
            height="40px"
            width="40px"
            _hover={{ transform: "scale(1.1)", transition: "0.2s" }}
          />
        </Link>
      </Box>

      {/* Centered Links */}
      <Flex flex="1" justifyContent="left">
        <Flex width="100%" maxW="1000px" alignItems="center" gap={4}>
          <Box>
            <Link
              as={RouterLink}
              to="/fnvqr"
              _hover={{ textDecoration: "none" }}
              p={2}
              border="1px"
              borderColor="teal.300"
              borderRadius="md"
              _activeLink={activeLinkStyle}
            >
              FnV QR
            </Link>
          </Box>
          <Box>
            <Link
              as={RouterLink}
              to="/dairyqr"
              _hover={{ textDecoration: "none" }}
              p={2}
              border="1px"
              borderColor="teal.300"
              borderRadius="md"
              _activeLink={activeLinkStyle}
            >
              Dairy QR (New)
            </Link>
          </Box>
          <Box>
            <Link
              as={RouterLink}
              to="/dairyqrOld"
              _hover={{ textDecoration: "none" }}
              p={2}
              border="1px"
              borderColor="teal.300"
              borderRadius="md"
              _activeLink={activeLinkStyle}
            >
              Dairy QR (Old)
            </Link>
          </Box>
          <Box>
            <Link
              as={RouterLink}
              to="/barcodeGenerator"
              _hover={{ textDecoration: "none" }}
              p={2}
              border="1px"
              borderColor="teal.300"
              borderRadius="md"
              _activeLink={activeLinkStyle}
            >
              Barcode Generator
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default NavBar;
