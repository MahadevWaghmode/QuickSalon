import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useParams } from "react-router-dom";
import {
  Box,
  Spinner,
  useToast,
  Grid,
  GridItem,
  Flex,
  VStack,
  Text,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { getSalon } from "../services/salonService";
import ProfileCard from "./Salons/components/ProfileCard";
import ServiceCard from "../components/ServiceCard";
import EmployeeCard from "../components/EmployeeCard";
import Sidebar from "../components/Sidebar";
import { BiPlus, BiPlusCircle } from "react-icons/bi";
import AddServiceModal from "./Services/components/AddServiceModal";
import AddEmployeeModal from "../components/AddEmployeeModal";

const SalonProfile = () => {
  const { salonId } = useParams();
  const [salon, setSalon] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Services");
  const toast = useToast();

  const fetchSalon = async (id) => {
    setLoading(true);
    try {
      const data = await getSalon(id);
      setSalon(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to fetch",
        description: "Unable to get salon details.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalon(salonId);
  }, [salonId]);

  const handleEditSalonProfile = (updatedSalon) => {
    fetchSalon(salonId) // Update the state with the new salon data
  };
  const handleAddEmp=() =>{
    fetchSalon(salonId);
  }

  

  if (loading) {
    return (
      <DashboardLayout title="Salon Profile">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Spinner size="xl" color="teal.500" />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Salon Profile">
      <Grid
        gridTemplateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(3, 1fr)" }}
        gap="6"
      >
        <GridItem colSpan={1}>
          <Flex gap={1} direction={["column", "row"]}>
            <ProfileCard salon={salon} onSubmit={handleEditSalonProfile} />
            {/* <Box display={["none", "contents"]}>
              <Sidebar />
            </Box> */}
          </Flex>
        </GridItem>

        <GridItem colSpan={2} mb={20}>
          <Flex>
            <Box
              as="button"
              fontWeight="bold"
              borderBottom={activeTab === "Services" ? "2px solid" : "none"}
              borderColor="blue.600"
              mr={5}
              onClick={() => setActiveTab("Services")}
            >
              Services
            </Box>
            <Box
              as="button"
              fontWeight="bold"
              borderBottom={activeTab === "Employees" ? "2px solid" : "none"}
              borderColor="blue.600"
              onClick={() => setActiveTab("Employees")}
            >
              Employees
              </Box>
              <Box ml={20}>
              {activeTab === "Services" ? (
                <AddServiceModal />
              ) : (
                <AddEmployeeModal salonId={salon.id} onSubmit={handleAddEmp} />
              )}
            </Box>
          </Flex>
          {activeTab === "Services" && (
            <VStack align="start" mt={5} spacing={4}>
              {salon.services && salon.services.length > 0 ? (
                salon.services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))
              ) : (
                <Text fontSize="lg" color="gray.600">
                  No services to display.
                </Text>
              )}
            </VStack>
          )}
          {activeTab === "Employees" && (
            <VStack align="start" mt={5} spacing={4}>
              {salon.employee && salon.employee.length > 0 ? (
                salon.employee.map((employee) => (
                  <EmployeeCard key={employee.id} employee={employee} />
                ))
              ) : (
                <Text fontSize="lg" color="gray.600">
                  No employees to display.
                </Text>
              )}
            </VStack>
          )}
        </GridItem>
      </Grid>
      {/* <Box display={["block", "none"]} position="fixed" bottom="0" width="93%">
        <Sidebar />
      </Box> */}
    </DashboardLayout>
  );
};

export default SalonProfile;
