import React from "react";
import { Box, Text, VStack, HStack, Avatar, Menu, MenuButton, MenuList, MenuItem, IconButton, Button, Stack } from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import AddOrEditEmployeeModal from "./AddOrEditEmployeeModal";

const EmployeeCard = ({ salonId, onsubmit, employee, onDelete }) => {
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
        <Avatar name={employee.name} />
        <VStack align="start" spacing={2} flex="1">
          <Text fontSize="lg" fontWeight="bold">
            {employee.name}
          </Text>
          <Text color="gray.500">Role: {employee.role}</Text>
          <Text>Date of Joining: {employee.dateOfJoining.join("-")}</Text>
          <Text>Contact: {employee.contactInfo}</Text>
          <Text fontWeight="bold">Salary: ${employee.salary}</Text>
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
          <MenuList minW="100px">  {/* Adjust the width here */}
            <Stack >
              <AddOrEditEmployeeModal onSubmit={onsubmit} salonId={salonId} isEdit={true} employee={employee}  />
              <Button size="sm">Delete</Button>
            </Stack>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
};

export default EmployeeCard;
