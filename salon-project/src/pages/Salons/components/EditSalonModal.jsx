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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { editSalon } from "../../../services/salonService"; // Assuming you have this service to handle editing
import { CiEdit } from "react-icons/ci";

const EditSalonModal = ({ selectedSalon, onSalonUpdated }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [services, setServices] = useState("");
  const [operatingTime, setOperatingTime] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (selectedSalon) {
      setName(selectedSalon.name);
      setLocation(selectedSalon.location);
      setServices(selectedSalon.services.join(", ")); // Assume services are stored as an array
      setOperatingTime(selectedSalon.operatingTime);
    }
  }, [selectedSalon]);

  const handleSubmit = async () => {
    const updatedSalon = {
      id: selectedSalon.id, // Use the ID to edit the specific salon
      name,
      location,
      services: services.split(",").map((service) => service.trim()),
      operatingTime,
    };

    try {
      const response = await editSalon(updatedSalon.id, updatedSalon); // Call the edit service with the updated salon

      if (response) {
        toast({
          title: "Salon updated.",
          description: "The salon has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onSalonUpdated(response); // Update the salon list in the parent component
        onClose(); // Close the modal after successful submission
      } else {
        throw new Error("Failed to update the salon");
      }
    } catch (error) {
      console.log(error)
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
      <Button onClick={onOpen} rightIcon={<CiEdit/>} colorScheme="yellow" variant="solid" size="xs">Edit</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Salon</ModalHeader>
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

export default EditSalonModal;
