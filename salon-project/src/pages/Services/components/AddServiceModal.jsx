import React, { useState } from "react";
import {
  Input,
  Button,
  VStack,
  Textarea,
  Select,
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
import { addService } from "../../../services/servicesService"; // Assuming you have the addService service

const AddServiceModal = ({ onServiceAdded }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    const newService = {
      name,
      description,
      price: parseFloat(price), // Ensure price is a number
      category,
    };

    try {
      const response = addService(newService, "service", 102); // Call the add service function

      if (response) {
        toast({
          title: "Service added.",
          description: "The new service has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onServiceAdded(response); // Pass the added service to update the list
        onClose(); // Close the modal after successful submission
      } else {
        throw new Error("Failed to add the service");
      }
    } catch (error) {
      console.error("Error adding service:", error);
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Service</ModalHeader>
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
            <Stack direction="row" spacing={4}>
              <Button colorScheme="teal" onClick={handleSubmit}>
                Add Service
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

export default AddServiceModal;
