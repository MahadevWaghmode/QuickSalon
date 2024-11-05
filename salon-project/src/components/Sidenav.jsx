import { Box, HStack, Heading, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { RxDashboard } from "react-icons/rx";
import { BsArrowDownUp } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { FaServicestack, FaUserTie } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { MdEmojiPeople, MdOutlineEditNote } from "react-icons/md";
import { SlPaypal } from "react-icons/sl";
import { TiScissors } from "react-icons/ti";
import { getCurrentUserDetail } from "../auth";
const Sidenav = () => {
  const location = useLocation();

  const user = getCurrentUserDetail();

  const isActiveLink = (link) => {
    return location.pathname === link;
  };

  const navLinks = [
    {
      icon: RxDashboard,
      text: "Dashboard",
      link: "/dashboard",
    },
    {
      icon: TiScissors,
      text: "Salons",
      link: "/salon",
    },
    {
      icon: FaServicestack,
      text: "Services",
      link: "/service",
    },
    {
      icon: GoPeople,
      text: "Salon Staff",
      link: "/salon_staff",
    },
    {
      icon: MdOutlineEditNote,
      text: "Appointments",
      link: "/appointments",
    },
    {
      icon: MdEmojiPeople,
      text: "Customer",
      link: "/Customer",
    },

    {
      icon: SlPaypal,
      text: "Payments",
      link: "/Payments",
    },
    
  ];

  return (
    <Stack
      bg="white"
      justify="space-between"
      boxShadow={{
        base: "none",
        lg: "lg",
      }}
      w={{
        base: "full",
        lg: "16rem",
      }}
      h="100vh"
    >
      <Box>
        {/* Profile Section */}
        <HStack spacing="4" p="4" alignItems="center">
          <Image as={FaUserTie}
            borderRadius="full"
            boxSize="50px"
            
            alt="Profile Picture"
          />
          <Box>
            <Text fontWeight="bold">
              {user.name}
            </Text>
            <Text fontSize="sm" color="gray.500">{user.roles}</Text>
          </Box>
        </HStack>
        <Box mt="6" mx="3">
          {navLinks.map((nav) => (
            <Link to={nav.link} key={nav.text}>
              <HStack
                bg={isActiveLink(nav.link) ? "#F3F3F7" : "transparent"}
                color={isActiveLink(nav.link) ? "#171717" : "#797E82"}
                borderRadius="10px"
                py="3"
                px="4"
                _hover={{
                  bg: "#F3F3F7",
                  color: "#171717",
                }}
                
              >
                <Icon as={nav.icon} />
                <Text fontSize="14px" fontWeight="medium">
                  {nav.text}
                </Text>
              </HStack>
            </Link>
          ))}
        </Box>
      </Box>

      <Box mt="6" mx="3" mb="6">
        <Link to="/support">
          <HStack
            borderRadius="10px"
            py="3"
            px="4"
            bg={isActiveLink("/support") ? "#F3F3F7" : "transparent"}
            color={isActiveLink("/support") ? "#171717" : "#797E82"}
            _hover={{
              bg: "#F3F3F7",
              color: "#171717",
            }}
          >
            <Icon as={BiSupport} />
            <Text fontSize="14px" fontWeight="medium">
              Support
            </Text>
          </HStack>
        </Link>
      </Box>
    </Stack>
  );
};

export default Sidenav;
