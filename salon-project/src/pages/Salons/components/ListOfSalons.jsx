import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Stack,
  Text,
  SimpleGrid,
  Box,
  Divider,
  ButtonGroup,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getAllSalons } from "../../../services/salonService";
import { Link } from "react-router-dom";

const ListOfSalons = ({ onSalonClick }) => {
  const [salons, setSalons] = useState([]);

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    try {
      const data = await getAllSalons();
      console.log(data)
      setSalons(data);
    } catch (error) {
      console.error("Error fetching salons:", error);
    }
  };

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} p={4}>
      {salons.map((salon) => (
        <Card key={salon.id} maxW="sm">
          <CardBody>
            <Image
              src= "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{salon.name}</Heading>
              <Text>
                {salon.description}
              </Text>

            <HStack alignContent="space-between">
              <Text>{salon.location}</Text>
              <Text>{salon.operating_time}</Text>
            </HStack>
              
              <Text color="blue.600" fontSize="2xl">
                $450
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Link to={"/salon/"+salon.id}>
              <Button variant="solid" colorScheme="blue">
                view
              </Button>
              </Link>
              <Button variant="ghost" colorScheme="blue">
                edit
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default ListOfSalons;
