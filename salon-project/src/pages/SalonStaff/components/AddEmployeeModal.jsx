import React, { useState } from "react";
import {
  Input,
  Button,
  VStack,
  Textarea,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { addEmployee } from "../../../services/staffService"; // Import the addEmployee service

const AddEmployeeModal = ({ onEmployeeAdded }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const toast = useToast();

  const resetForm = () => {
    setName("");
    setRole("");
    setEmail("");
    setPhone("");
  };

  const handleSubmit = async () => {
    const newEmployee = {
      name,
      role,
      email,
      phone,
    };

    try {
      const response = await addEmployee(newEmployee); // Use the service for adding an employee

      if (response) {
        toast({
          title: "Employee added.",
          description: "The new employee has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onEmployeeAdded(response); 
        resetForm();
        onClose();
      } else {
        throw new Error("Failed to add the employee");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <Button
        rightIcon={<FiPlus />}
        colorScheme="teal"
        variant="solid"
        onClick={onOpen}
        size="sm"
      >
        Add
      </Button>

      {/* Modal Component */}
      <Modal     isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="start">
              <Input
                placeholder="Employee Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Stack direction="row" spacing={4}>
              <Button colorScheme="teal" onClick={handleSubmit}>
                Add Employee
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEmployeeModal;
