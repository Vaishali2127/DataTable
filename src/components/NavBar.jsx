import { Button, Heading, Box, Container, Flex } from "@chakra-ui/react";

const NavBar = ({ openDialog }) => {
  return (
    <Box borderBottom="1px" borderColor="gray.200" p="16px">
      <Container maxW="1400px">
        <Flex w="100%" justifyContent="space-between">
          <Heading size="lg" color="blackAlpha.700">
            informics
          </Heading>
          <Button colorScheme="purple" onClick={openDialog}>
            Create User
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default NavBar;
