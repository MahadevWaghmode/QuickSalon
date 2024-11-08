import React, { useState } from "react";
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
  FormControl,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";

import { addService } from "../services/servicesService";

const columns = [
  { label: "Name", key: "name", placeholder: "Enter service name", type: "text" },
  { label: "Description", key: "description", placeholder: "Enter description", type: "text" },
  { label: "Price", key: "price", placeholder: "Enter price", type: "number" },
  { label: "Required Time", key: "requiredTime", placeholder: "Enter time in minutes", type: "number" },
];

const categories = ["Haircut", "Coloring", "Styling", "Massage", "Manicure", "Pedicure"]; // Example categories

const AddServiceModal = ({ salonId, onSubmit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    requiredTime: "",
  });

  const handleInputChange = (key, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
    setError((prevErrors) => ({
      ...prevErrors,
      errors: { ...prevErrors.errors, [key]: "" },
    }));
  };

  const handleSubmit = async () => {
    try {
      const serviceData = { ...formValues, price: parseFloat(formValues.price), requiredTime: parseInt(formValues.requiredTime) };
      const res = await addService(salonId, serviceData);
      setError({ errors: {}, isError: false });
      toast({
        title: "Service Added",
        description: "Service added successfully to the salon.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      onSubmit(res);
      onClose();
    } catch (error) {
      setError({
        errors: error.response?.data || {},
        isError: true,
      });
      toast({
        title: "Error adding service",
        description: error.message || "An unexpected error occurred. Please try again.",
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
          <ModalHeader>Add Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="start">
              {columns.map((field) => (
                <FormControl
                  key={field.key}
                  isInvalid={error.errors[field.key]}
                >
                  <Input
                    placeholder={field.placeholder}
                    type={field.type}
                    value={formValues[field.key] || ""}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                  />
                  <FormErrorMessage>{error.errors[field.key]}</FormErrorMessage>
                </FormControl>
              ))}
              {/* Category dropdown */}
              <FormControl isInvalid={error.errors.category}>
                <Select
                  placeholder="Select category"
                  value={formValues.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{error.errors.category}</FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Add Service
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

export default AddServiceModal;
