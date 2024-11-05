import {
  Box,
  Avatar,
  Text,
  VStack,
  HStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

function ProfileCard({ salon }) {
  // Count the number of services and employees
  const numberOfServices = salon.services ? salon.services.length : 0;
  const numberOfEmployees = salon.employee ? salon.employee.length : 0;

  return (
    <Box
      w={["full", "min"]}
      p={[5, 10]}
      bg="white"
      boxShadow="md"
      textAlign="center"
      borderRadius={["20px", "10px"]}
      borderBottomRadius={["0px","10px"]}
      position={["sticky",""]}
    >
      {/* Profile Picture */}
      <Avatar size="xl" src="/salon_profile.png" mb={4} h={171} w={171} />

      {/* Name and Description */}
      <Text fontWeight="bold" fontSize="lg">
        {salon.name}
      </Text>
      <Text color="gray.500">{salon.description}</Text>
      
      {/* Location */}
      <HStack justify="center" mt={1}>
        <Icon as={FaMapMarkerAlt} color="gray.500" />
        <Text color="gray.500" fontSize="sm">
          {salon.location}
        </Text>
      </HStack>

      {/* Follower Stats */}
      <HStack mt={4} spacing={8} justify="center">
        <VStack>
          <Text fontWeight="bold">{numberOfServices}</Text>
          <Text fontSize="xs" color="gray.500">
            Services
          </Text>
        </VStack>
        <VStack>
          <Text fontWeight="bold">{numberOfEmployees}</Text>
          <Text fontSize="xs" color="gray.500">
            Employees
          </Text>
        </VStack>
        <VStack>
          <Text fontWeight="bold">37K</Text>
          <Text fontSize="xs" color="gray.500">
            Likes
          </Text>
        </VStack>
      </HStack>

      {/* Action Buttons */}
      <HStack justifyContent="center" spacing={4} mt={5}>
        <Button colorScheme="blue" size="sm">
          Edit Profile
        </Button>
        <Button colorScheme="blue" variant="outline" size="sm">
          Add Friend
        </Button>
      </HStack>
    </Box>
  );
}

export default ProfileCard;
