import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
    VStack,
    FormControl,
    FormErrorMessage,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import { BiPlus } from "react-icons/bi";
  import { addEmployee } from "../services/employeeService";
  
  const columns = [
    { label: "Name", key: "name", placeholder: "Employee name" },
    { label: "Role", key: "role", placeholder: "Role" },
    {
      label: "Date Of Joining",
      key: "dateOfJoining",
      placeholder: "Joining Date",
      type: "date",
    },
    {
      label: "Contact Info",
      key: "contactInfo",
      placeholder: "Mobile number or Email address",
    },
    { label: "Salary", key: "salary", placeholder: "Salary" },
  ];
  
  const AddEmployeeModal = ({ salonId, onSubmit }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
  
    const [error, setError] = useState({
      errors: {},
      isError: false,
    });
  
    const [formValues, setFormValues] = useState({
      name: "",
      role: "",
      dateOfJoining: "",
      contactInfo: "",
      salary: "",
    });
  
    const handleInputChange = (key, value) => {
      setFormValues((prevValues) => ({
        ...prevValues,
        [key]: value,
      }));
      // Clear the specific field error when user starts typing
      setError((prevErrors) => ({
        ...prevErrors,
        errors: { ...prevErrors.errors, [key]: "" },
      }));
    };
  
    const handleSubmit = async () => {
      try {
        const addEmp = { ...formValues };
        const res = await addEmployee(salonId, addEmp);
        setError({ errors: {}, isError: false });
        toast({
          title: "Employee Added.",
          description: "Employee added successfully in salon.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        onSubmit(res);
        onClose();
      } catch (error) {
        console.log("Error submitting form:", error.response?.data);
        setError({
          errors: error.response?.data || {},
          isError: true,
        });
        toast({
          title: "Error adding employee.",
          description:
            error.message || "An unexpected error occurred. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    };
  
    return (
      <>
        <Button rightIcon={<BiPlus />} onClick={onOpen} colorScheme="teal" size="sm">
          Add
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Employee</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="start">
                {columns.map((field) => (
                  <FormControl
                    key={field.key}
                    isInvalid={error.errors[field.key]} // Check for specific field errors
                  >
                    <Input
                      placeholder={field.placeholder}
                      type={field.type || "text"}
                      value={formValues[field.key] || ""}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                    />
                    <FormErrorMessage>{error.errors[field.key]}</FormErrorMessage>
                  </FormControl>
                ))}
              </VStack>
            </ModalBody>
            <ModalFooter gap={2}>
              <Button colorScheme="teal" onClick={handleSubmit}>
                Add Employee
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default AddEmployeeModal;
  