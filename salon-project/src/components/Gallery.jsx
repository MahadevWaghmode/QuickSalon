import { SimpleGrid, Box, Image } from '@chakra-ui/react';

function Gallery() {
  const images = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150',
  ];

  return (
    <SimpleGrid columns={3} spacing={4} mt={5} w="full" maxW="600px">
      {images.map((src, index) => (
        <Box key={index} overflow="hidden" borderRadius="md" boxShadow="md">
          <Image src={src} objectFit="cover" w="full" h="100px" />
        </Box>
      ))}
    </SimpleGrid>
  );
}

export default Gallery;
