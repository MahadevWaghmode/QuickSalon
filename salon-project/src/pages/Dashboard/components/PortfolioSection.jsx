import {
  Flex,
  Grid,
  Divider,
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Fragment } from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";
const PortfolioSection = () => {
  const salons = [
    {
      id: "1",
      image: "/default_salon.png",
      name: "Salon mha",
      address: "Salon address",
    },
    {
      id: "2",
      image: "/default_salon.png",
      name: "Salon sak",
      address: "Salon address",
    },
  ];

  return (
    <HStack
      justify="space-between"
      bg="white"
      borderRadius="xl"
      p="6"
      align={{
        base: "flex-start",
        xl: "center",
      }}
      flexDir={{
        base: "column",
        xl: "row",
      }}
      spacing={{
        base: 4,
        xl: 0,
      }}
    >
      <HStack
        spacing={{
          base: 0,
          xl: 16,
        }}
        align={{
          base: "flex-start",
          xl: "center",
        }}
        flexDir={{
          base: "column",
          xl: "row",
        }}
      >
        <Stack>
          <Text mb="6" fontSize="sm" color="black.80">
            Your Salons
          </Text>
          {salons.map((salon, i) => (
            <Fragment key={salon.id}>
              {i !== 0 && <Divider />}
              <HStack>
                <Image w="10%" src={salon.image} />
                <Box>
                  <Text textStyle="h6" fontWeight="medium">
                    {salon.name}
                  </Text>
                  <Text fontSize="sm" color="black.40">
                    {salon.address}
                  </Text>
                </Box>
              </HStack>
            </Fragment>
          ))}
        </Stack>
      </HStack>

      {/* ///////////////////////////////////////// */}
      {/* <Stack >
        {salons.map((salon, i) => (
          <Fragment key={salon.id}>
            {i !== 0 && <Divider />}
            <Flex gap="4">
              <Image w="10%" src={salon.image} />
              <Flex justify="space-between" w="full">
                <Stack spacing={0}>
                  <Text textStyle="h6">{salon.name}</Text>
                  <Text fontSize="sm" color="black.40">
                    {salon.address}
                  </Text>
                </Stack>
                
              </Flex>
            </Flex>
          </Fragment>
        ))}
      </Stack> */}
    </HStack>
  );
};

export default PortfolioSection;
