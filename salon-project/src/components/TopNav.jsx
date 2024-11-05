import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaBars, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../auth";
import { useContext, useState } from "react";
import userContext from "../context/userContext";
const TopNav = ({ title, onOpen }) => {

  const [login, setLogin] = useState(false)
  const userContextData = useContext(userContext)

  const navigate = useNavigate(); // Initialize the navigate function

  // Logout handler
  const handleLogout = () => {
    doLogout(() => {
      //logged out
      setLogin(false)
      userContextData.setUser({
          data: null,
          login: false
      })
    navigate("/login");
  })
  };

  return (
    <Box px="4" bg="white">
      <HStack maxW="70rem" h="16" justify="space-between" mx="auto">
        <Icon
          as={FaBars}
          onClick={onOpen}
          display={{
            base: "block",
            lg: "none",
          }}
        />
        <Heading fontWeight="medium" fontSize="28px">
          {title}
        </Heading>

        <Menu>
          <MenuButton>
            <Icon as={FaUserTie} fontSize="24px" />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem>Support</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Box>
  );
};

export default TopNav;
