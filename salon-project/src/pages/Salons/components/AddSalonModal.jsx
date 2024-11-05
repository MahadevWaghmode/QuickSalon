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
import { addSalon } from "../../../services/salonService"; // Import the addSalon service

const AddSalonModal = ({ onSalonAdded }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [services, setServices] = useState("");
  const [operatingTime, setOperatingTime] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    const newSalon = {
      name,
      location,
      services: services.split(",").map((service) => service.trim()),
      operatingTime,
    };

    try {
      const response = await addSalon(newSalon); // Use the service for adding a salon

      if (response) {
        toast({
          title: "Salon added.",
          description: "The new salon has been added successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onSalonAdded(response); // Pass the added salon to update the list
        onClose(); // Close the modal after successful submission
      } else {
        throw new Error("Failed to add the salon");
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Salon</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="start">
              <Input
                placeholder="Salon Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Textarea
                placeholder="Services (comma separated)"
                value={services}
                onChange={(e) => setServices(e.target.value)}
              />
              <Input
                placeholder="Operating Time"
                value={operatingTime}
                onChange={(e) => setOperatingTime(e.target.value)}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Stack direction="row" spacing={4}>
              <Button colorScheme="teal" onClick={handleSubmit}>
                Add Salon
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

export default AddSalonModal;
