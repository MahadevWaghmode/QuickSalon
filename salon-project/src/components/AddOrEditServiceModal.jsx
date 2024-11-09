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
  FormControl,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { BiEdit, BiPlus } from "react-icons/bi";

import { addService, editService } from "../services/servicesService";

const columns = [
  {
    label: "Name",
    key: "name",
    placeholder: "Enter service name",
    type: "text",
  },
  {
    label: "Description",
    key: "description",
    placeholder: "Enter description",
    type: "text",
  },
  { label: "Price", key: "price", placeholder: "Enter price", type: "number" },
  {
    label: "Required Time",
    key: "requiredTime",
    placeholder: "Enter time in minutes",
    type: "number",
  },
];

const categories = [
  "Haircut",
  "Coloring",
  "Styling",
  "Massage",
  "Manicure",
  "Pedicure",
]; // Example categories

const AddOrEditServiceModal = ({
  salonId,
  onSubmit,
  isEdit = false,
  service = {},
}) => {
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

  // Prefill form values if editing
  useEffect(() => {
    if (isEdit) {
      setFormValues({
        name: service.name || "",
        description: service.description || "",
        price: service.price || "",
        category: service.category || "",
        requiredTime: service.requiredTime || "",
      });
    }
  }, [isEdit, service]);

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
      const serviceData = {
        ...formValues,
        price: parseFloat(formValues.price),
        requiredTime: parseInt(formValues.requiredTime),
      };

      let res;
      if (isEdit) {
        // Update existing service
        res = await editService(salonId, service.id, serviceData);
        toast({
          title: "Service Updated",
          description: "Service details updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        // Add new service
        res = await addService(salonId, serviceData);
        toast({
          title: "Service Added",
          description: "Service added successfully to the salon.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }

      setError({ errors: {}, isError: false });
      onSubmit(isEdit, res);
      onClose();
    } catch (error) {
      setError({
        errors: error.response?.data || {},
        isError: true,
      });
      toast({
        title: isEdit ? "Error updating service" : "Error adding service",
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
          <ModalHeader>{isEdit ? "Edit Service" : "Add Service"}</ModalHeader>
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
                    onChange={(e) =>
                      handleInputChange(field.key, e.target.value)
                    }
                  />
                  <FormErrorMessage>{error.errors[field.key]}</FormErrorMessage>
                </FormControl>
              ))}
              {/* Category dropdown */}
              <FormControl isInvalid={error.errors.category}>
                <Select
                  placeholder="Select category"
                  value={formValues.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
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
              {isEdit ? "Edit Service" : "Add Service"}
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

export default AddOrEditServiceModal;
