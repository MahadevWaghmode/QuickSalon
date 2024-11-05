import { useContext, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import { loginUser } from "../services/authService"; // Import your login service
import { doLogin } from "../auth";
import userContext from "../context/userContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userContxtData = useContext(userContext);

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    loginUser({ username, password })
      .then((data) => {
        doLogin(data, () => {
          userContxtData.setUser({
            data: data.user,
            login: true,
          });
          navigate("/dashboard");
        });
        toast({
          title: "Login Successful",
          description: "You have logged in successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 400 || error.response.status == 404) {
          toast({
            title: "Error message",
            description: error.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Internal server error",
            description: "Something went wrong !!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
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
          <Heading>Login</Heading>
          <Text>Enter your e-mail and password to login</Text>
        </VStack>
        <FormControl>
          <FormLabel>E-mail Address</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <HStack w="full" justify="space-between">
          <Checkbox>Remember me.</Checkbox>
          <Button variant="link" colorScheme="blue">
            Forgot Password?
          </Button>
        </HStack>
        <Button
          type="submit"
          rounded="none"
          colorScheme="blue"
          w={["full", "auto"]}
          alignSelf="end"
        >
          Login
        </Button>
        <HStack w="full" justify="center" pt={4}>
          <Text>Don't have an account?</Text>
          <Button as={Link} to="/register" variant="link" colorScheme="blue">
            Register
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Login;
