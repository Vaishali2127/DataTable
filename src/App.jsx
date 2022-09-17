import {
  TableContainer,
  Box,
  Container,
  Table,
  Thead,
  Tr,
  Tbody,
  Th,
  Td,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import NavBar from "./components/NavBar";
import CreateUserDialog from "./components/CreateUserDialog";

import data from "./data.json";
import EditUserDialog from "./components/EditUserDialog";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [selected, setSelected] = useState(null);
  const genders = useMemo(() => [...new Set(data.map((e) => e.gender))], []);
  const races = useMemo(() => [...new Set(data.map((e) => e.race))], []);

  useEffect(() => {
    if (selected) onOpenEdit();
  }, [selected]);

  return (
    <Box w="100vw">
      <NavBar openDialog={onOpen} />
      <Container maxW="1400px" mt="32px" p="16px">
        <TableContainer overflowY="auto">
          <Table variant="simple" fontSize="sm">
            <Thead position="sticky" top={0} zIndex="docked" bg="gray.200">
              <Tr>
                {[
                  "ID",
                  "First Name",
                  "Last Name",
                  "Email",
                  "Gender",
                  "Race",
                ].map((col) => (
                  <Th key={col} borderColor="gray.300">
                    {col}
                  </Th>
                ))}
                <Th borderColor="gray.300" key={"actions"}>
                  Actions
                </Th>
              </Tr>
            </Thead>

            <Tbody overflowY="scroll">
              {data.map((row) => {
                return (
                  <Tr key={row.id}>
                    {Object.keys(row).map((col) => (
                      <Td key={row[col]} borderColor="gray.200">
                        {row[col]}
                      </Td>
                    ))}
                    <Td borderColor="gray.200">
                      <Button onClick={() => setSelected(row)}>Edit</Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
      {isOpen && (
        <CreateUserDialog
          onClose={onClose}
          isOpen={isOpen}
          genders={genders}
          races={races}
        />
      )}

      {isOpenEdit && (
        <EditUserDialog
          onClose={onCloseEdit}
          isOpen={isOpenEdit}
          genders={genders}
          races={races}
          userData={selected}
        />
      )}
    </Box>
  );
};

export default App;
