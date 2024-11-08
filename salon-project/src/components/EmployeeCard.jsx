import React from "react";
import { Box, Text, VStack, HStack, Avatar } from "@chakra-ui/react";

const EmployeeCard = ({ employee }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      boxShadow="md"
      bg="white"
      w={["full","sm"]}
    >
      <HStack spacing={4}>
        <Avatar name={employee.name} />
        <VStack align="start" spacing={2}>
          <Text fontSize="lg" fontWeight="bold">
            {employee.name}
          </Text>
          <Text color="gray.500">Role: {employee.role}</Text>
          <Text>Date of Joining: {employee.dateOfJoining.join("-")}</Text>
          <Text>Contact: {employee.contactInfo}</Text>
          <Text fontWeight="bold">Salary: ${employee.salary}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default EmployeeCard;
