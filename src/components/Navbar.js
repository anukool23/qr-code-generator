import { Flex, Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function NavBar() {
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
      {/* <Box
        as={RouterLink}
        to="/"
        fontWeight="bold"
        fontSize="1.2rem"
        ml={4}
      >
        MyApp
      </Box> */}

      <Flex flex="1" justifyContent="center">
        <Flex width="100%" maxW="600px">
          <Box flex="1" textAlign="center">
            <Link
              as={RouterLink}
              to="/fnvqr"
              _hover={{ textDecoration: "none", color: "teal.300" }}
              width="100%"
            >
              FnV QR Code
            </Link>
          </Box>
          <Box flex="1" textAlign="center">
            <Link
              as={RouterLink}
              to="/dairyqr"
              _hover={{ textDecoration: "none", color: "teal.300" }}
              width="100%"
            >
              Dairy QR Code (New Format)
            </Link>
            </Box>
          <Box flex="1" textAlign="center">
            <Link
              as={RouterLink}
              to="/dairyqrOld"
              _hover={{ textDecoration: "none", color: "teal.300" }}
              width="100%"
            >
              Dairy QR Code (Old Format)
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default NavBar;
