import { Box, VStack, Icon, Flex } from '@chakra-ui/react';
import { FaHome, FaUser, FaCog, FaPlus } from 'react-icons/fa';

import React from 'react'

const Sidebar = () => {
  return (
    <Box  bg="gray.100"  p={4}>
      <Flex direction={["row","column"]} spacing={6} justifyContent="space-between" gap={10}>
        <Icon as={FaHome} boxSize={6} color="gray.500" />
        <Icon as={FaPlus} boxSize={6} color="gray.500" />
        <Icon as={FaUser} boxSize={6} color="gray.500" />
        <Icon as={FaCog} boxSize={6} color="gray.500" />
      </Flex>
    </Box>
  )
}

export default Sidebar