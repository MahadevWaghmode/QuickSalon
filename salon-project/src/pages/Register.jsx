import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      mobile,
      email,
      password,
      role,
    };
    console.log("data", newUser);

    registerUser(newUser)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
        setName("");
        setMobile("");
        setEmail("");
        setPassword("");
        setRole("");
        
        setError({
          errors: {},
          isError: false,
        });

        toast({
          title: "Registration Successful",
          description: "Your account has been created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("Error log");
        setError({
          errors: error,
          isError: true,
        });
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong !!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box
      w={["full", "md"]}
      p={[8, 10]}
      mt={[20, "10vh"]}
      mx="auto"
      border={["none", "1px"]}
      borderColor={["", "gray.300"]}
      borderRadius={10}
    >
      <VStack
        spacing={4}
        align="flex-start"
        w="full"
        as="form"
        onSubmit={handleSubmit}
      >
        <VStack spacing={1} align={["flex-start", "center"]} w="full">
          <Heading>Register</Heading>
          <Text>Enter your details to create a new account</Text>
        </VStack>
        <FormControl isInvalid={error.errors?.response?.data?.name}>
          <FormLabel>Name</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormErrorMessage>
            {error.errors?.response?.data?.name}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={error.errors?.response?.data?.mobile}>
          <FormLabel>Mobile</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <FormErrorMessage>
            {error.errors?.response?.data?.mobile}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={error.errors?.response?.data?.email}>
          <FormLabel>E-mail Address</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormErrorMessage>
            {error.errors?.response?.data?.email}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={error.errors?.response?.data?.password}>
          <FormLabel>Password</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormErrorMessage>
            {error.errors?.response?.data?.password}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={error.errors?.response?.data?.role}>
          <FormLabel>Role</FormLabel>
          <Select
            rounded="none"
            variant="filled"
            placeholder="Select Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="MANAGER">Manager</option>
            <option value="CUSTOMER">Customer</option>
          </Select>
          <FormErrorMessage>
            {error.errors?.response?.data?.role}
          </FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          rounded="none"
          colorScheme="blue"
          w={["full", "auto"]}
          alignSelf="end"
        >
          Register
        </Button>
        <HStack w="full" justify="center" pt={4}>
          <Text>Already have an account?</Text>
          <Button as={Link} to="/login" variant="link" colorScheme="blue">
            Login
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Register;
