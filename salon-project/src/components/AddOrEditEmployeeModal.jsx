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
import React, { useState, useEffect } from "react";
import { BiEdit, BiPlus } from "react-icons/bi";
import { addEmployee, editEmployee } from "../services/employeeService";

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

const AddOrEditEmployeeModal = ({
  salonId,
  onSubmit,
  isEdit = false,
  employee = {},
}) => {
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

  useEffect(() => {
    // Populate form values if in edit mode
    if (isEdit && employee) {
      setFormValues({
        name: employee.name || "",
        role: employee.role || "",
        dateOfJoining: employee.dateOfJoining 
                ? new Date(employee.dateOfJoining).toISOString().split('T')[0] 
                : "",
        contactInfo: employee.contactInfo || "",
        salary: employee.salary || "",
      });
    }
  }, [isEdit, employee]);

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
      const employeeData = { ...formValues };
      const res = isEdit
        ? await editEmployee(salonId, employee.id, employeeData)
        : await addEmployee(salonId, employeeData);

      setError({ errors: {}, isError: false });
      toast({
        title: `Employee ${isEdit ? "Updated" : "Added"}.`,
        description: `Employee ${
          isEdit ? "updated" : "added"
        } successfully in salon.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      onSubmit(isEdit,res);
      onClose();
    } catch (error) {
      setError({
        errors: error.response?.data || {},
        isError: true,
      });
      toast({
        title: `Error ${isEdit ? "updating" : "adding"} employee.`,
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
      <Button
        rightIcon={isEdit ? <BiEdit /> : <BiPlus />}
        onClick={onOpen}
        colorScheme="teal"
        size="sm"
      >
        {isEdit ? "Edit" : "Add"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? "Edit Employee" : "Add Employee"}</ModalHeader>
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
                    onChange={(e) =>
                      handleInputChange(field.key, e.target.value)
                    }
                  />
                  <FormErrorMessage>{error.errors[field.key]}</FormErrorMessage>
                </FormControl>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button colorScheme="teal" onClick={handleSubmit}>
              {isEdit ? "Update Employee" : "Add Employee"}
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

export default AddOrEditEmployeeModal;
