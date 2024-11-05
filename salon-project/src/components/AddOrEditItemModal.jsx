import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { addItem, updateItem } from "../services/itemService";
import { getCurrentUserDetail } from "../auth";

const AddOrEditItemModal = ({
  isEdit,
  item,
  itemType,
  onSubmit,
  modalTitle,
  fields,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState({});
  const toast = useToast();

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setUser(getCurrentUserDetail);
    if (isEdit && item) {
      const initialValues = {};
      fields.forEach((field) => {
        initialValues[field.key] = item[field.key] || "";
      });
      setFormValues(initialValues);
    } else {
      // Clear form for adding
      setFormValues({});
    }
  }, [isEdit, item, fields]);

  const handleInputChange = (key, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const updatedItem = { ...formValues, id: item?.id }; // Retain the ID if editing
      let res;
      if (isEdit) {
        res = await updateItem(1, itemType, updatedItem.id, updatedItem); // Call update API
        toast({
          title: `Item ${itemType} updated.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        
        
        res = await addItem(itemType, 1, updatedItem); // Call add API

        toast({
          title: `Item ${itemType} added.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      onSubmit(isEdit, res); // Notify parent component
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error during submission:", error);
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
      <Button
        onClick={onOpen}
        size="sm"
        colorScheme={isEdit ? "yellow" : "teal"}
        rightIcon={isEdit ? <CiEdit /> : <FiPlus />}
      >
        {isEdit ? "Edit" : "Add"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="start">
              {fields.map((field) =>
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
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSubmit}>
              {isEdit ? "Save Changes" : "Add Item"}
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

export default AddOrEditItemModal;
