import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  Button,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import AddOrEditServiceModal from "./AddOrEditServiceModal";

const ServiceCard = ({ salonId, onsubmit, service, onDelete }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      boxShadow="md"
      bg="white"
      w={["full", "sm"]}
      position="relative"
    >
      <HStack spacing={4} align="start">
        <VStack align="start" spacing={2} flex="1">
          <Text fontSize="lg" fontWeight="bold">
            {service.name}
          </Text>
          <Text color="gray.600">{service.description}</Text>
          <Badge colorScheme="blue">{service.category}</Badge>
          <Text fontWeight="bold">Price: {service.price} ₹</Text>
          <Text>Required Time: {service.requiredTime} mins</Text>
        </VStack>
        {/* Three dots menu in the top-right corner */}
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FiMoreVertical />}
            variant="ghost"
            position="absolute"
            top={2}
            right={2}
            aria-label="Options"
          />
          <MenuList minW="100px">
            <Stack>
              <AddOrEditServiceModal
                onSubmit={onsubmit}
                salonId={salonId}
                isEdit={true}
                service={service}
              />
              <Button size="sm">Delete</Button>
            </Stack>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
};

export default ServiceCard;
