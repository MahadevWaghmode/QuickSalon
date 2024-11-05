import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  VStack,
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
import { BiEdit } from "react-icons/bi";
import { editEmployee } from "../../../services/staffService"; // Import the editEmployee service

const EditEmployeeModal = ({ selectedEmployee, onEmployeeUpdated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const toast = useToast();

  // Populate the form with selected employee details when modal opens
  useEffect(() => {
    if (selectedEmployee) {
      setName(selectedEmployee.name);
      setRole(selectedEmployee.role);
      setEmail(selectedEmployee.email);
      setPhone(selectedEmployee.phone); // Corrected this from employee to selectedEmployee
    }
  }, [selectedEmployee]);

  const handleSubmit = async () => {
    const updatedEmployee = {
      name,
      role,
      email,
      phone,
    };

    try {
      const response = await editEmployee(selectedEmployee.id, updatedEmployee); // Use selectedEmployee.id here

      if (response) {
        toast({
          title: "Employee updated.",
          description: "The employee details have been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onEmployeeUpdated(response); // Pass the updated employee to update the list
        onClose(); // Close the modal after successful submission
      } else {
        throw new Error("Failed to update the employee");
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
        rightIcon={<BiEdit />}
        colorScheme="yellow"
        variant="solid"
        onClick={onOpen}
        size="xs"
      >
        Edit
      </Button>

      {/* Modal Component */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Employee</ModalHeader>
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
                Save Changes
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

export default EditEmployeeModal;
