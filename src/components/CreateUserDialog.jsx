import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const CreateUserDialog = ({ isOpen, onClose, races, genders }) => {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    setDetails((x) => ({ ...x, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: details,
      });

      toast({
        title: "User created successfully",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "error",
      });
    }

    setLoading(false);
    onClose();
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="auto" />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>Create New User</ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody>
          <Stack spacing={4}>
            <Flex w="100%" gap="12px">
              <Box flex="1">
                <FormControl isRequired isDisabled={loading}>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" onChange={handleChange} name="firstName" />
                </FormControl>
              </Box>
              <Box flex="1">
                <FormControl isRequired isDisabled={loading}>
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" onChange={handleChange} name="lastName" />
                </FormControl>
              </Box>
            </Flex>
            <FormControl isRequired isDisabled={loading}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={handleChange} name="email" />
            </FormControl>
            <Flex w="100%" gap="12px">
              <Box flex="1">
                <FormControl id="race" isRequired isDisabled={loading}>
                  <FormLabel>Race</FormLabel>
                  <Select
                    defaultValue={null}
                    placeholder="Select Race"
                    onChange={handleChange}
                    name="race"
                  >
                    {races.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box flex="1">
                <FormControl isRequired isDisabled={loading}>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    defaultValue={null}
                    placeholder="Select Gender"
                    onChange={handleChange}
                    name="gender"
                  >
                    {genders.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Flex>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="gray"
            mr={3}
            onClick={onClose}
            isDisabled={loading}
          >
            Close
          </Button>
          <Button type="submit" isLoading={loading} colorScheme="purple">
            Create User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateUserDialog;
