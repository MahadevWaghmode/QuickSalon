import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  VStack,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { editService } from "../../../services/servicesService"; // Assuming you have this service to handle editing
import { CiEdit } from "react-icons/ci";

const EditServiceModal = ({ selectedService, onServiceUpdated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (selectedService) {
      setName(selectedService.name);
      setDescription(selectedService.description);
      setPrice(selectedService.price);
      setCategory(selectedService.category);
    }
  }, [selectedService]);

  const handleSubmit = async () => {
    const updatedService = {
      id: selectedService.id, // Use the ID to edit the specific service
      name,
      description,
      price: parseFloat(price), // Ensure price is a number
      category,
    };

    try {
      const response = await editService(updatedService.id, updatedService); // Call the edit service with the updated service

      if (response) {
        toast({
          title: "Service updated.",
          description: "The service has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onServiceUpdated(response); // Update the service list in the parent component
        onClose(); // Close the modal after successful submission
      } else {
        throw new Error("Failed to update the service");
      }
    } catch (error) {
      console.error(error);
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
      <Button onClick={onOpen} rightIcon={<CiEdit />} colorScheme="yellow" variant="solid" size="xs">
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="start">
              <Input
                placeholder="Service Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Select
                placeholder="Select Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Hair">Hair</option>
                <option value="Nails">Nails</option>
                <option value="Skin">Skin</option>
              </Select>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Save Changes
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

export default EditServiceModal;
