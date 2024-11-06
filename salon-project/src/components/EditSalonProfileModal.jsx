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
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { editSalon } from "../services/salonService";

const columns = [
  { label: "Name", key: "name", placeholder: "Salon Name" },
  { label: "Location", key: "location", placeholder: "Location" },
  {
    label: "Description",
    key: "description",
    placeholder: "Description",
    type: "textarea",
  },
  {
    label: "Operating Time",
    key: "operating_time",
    placeholder: "Operating Time",
  },
];

const EditSalonProfileModal = ({ onSubmit, salon }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const [formValues, setFormValues] = useState({
    name: "",
    location: "",
    description: "",
    operating_time: "",
  });

  useEffect(() => {
    if (salon) {
      const initialValues = {};
      columns.forEach((field) => {
        initialValues[field.key] = salon[field.key] || "";
      });
      setFormValues(initialValues);
    }
  }, [salon]);

  const handleInputChange = (key, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const updatedSalon = { ...formValues, id: salon?.id };
      const res = await editSalon(updatedSalon.id, updatedSalon);
      toast({
        title: "Profile updated.",
        description: "Your salon profile has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      onSubmit(res); // Update salon data in the parent component
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error updating profile.",
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
      <Button onClick={onOpen} colorScheme="blue" size="sm">
        Edit Profile
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Salon Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="start">
              {columns.map((field) =>
                field.type === "textarea" ? (
                  <Textarea
                    key={field.key}
                    placeholder={field.placeholder}
                    value={formValues[field.key] || ""}
                    onChange={(e) =>
                      handleInputChange(field.key, e.target.value)
                    }
                  />
                ) : (
                  <Input
                    key={field.key}
                    placeholder={field.placeholder}
                    value={formValues[field.key] || ""}
                    onChange={(e) =>
                      handleInputChange(field.key, e.target.value)
                    }
                  />
                )
              )}
            </VStack>
          </ModalBody>
          <ModalFooter gap={2}>
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

export default EditSalonProfileModal;
