import React from "react";
import { Box, Text, VStack, Badge } from "@chakra-ui/react";

const ServiceCard = ({ service }) => {
  return (
    <Box
    w={["full","sm"]}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      boxShadow="md"
      bg="white"
      
    >
      <VStack align="start" spacing={3}>
        <Text fontSize="lg" fontWeight="bold">
          {service.name}
        </Text>
        <Text color="gray.600">{service.description}</Text>
        <Badge colorScheme="blue">{service.category}</Badge>
        <Text fontWeight="bold">Price: {service.price} ₹ </Text>
        <Text>Required Time: {service.requiredTime} mins</Text>
      </VStack>
    </Box>
  );
};

export default ServiceCard;
