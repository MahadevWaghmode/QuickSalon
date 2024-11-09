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
} from "@chakra-ui/react";
import { getSalon } from "../services/salonService";
import ProfileCard from "./Salons/components/ProfileCard";
import ServiceCard from "../components/ServiceCard";
import EmployeeCard from "../components/EmployeeCard";


import { getEmployees } from "../services/employeeService";
import { getServices } from "../services/servicesService";
import AddOrEditServiceModal from "../components/AddOrEditServiceModal";
import AddOrEditEmployeeModal from "../components/AddOrEditEmployeeModal";

const SalonProfile = () => {
  const { salonId } = useParams();
  const [salon, setSalon] = useState({});
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Services");
  const toast = useToast();

  const fetchSalon = async (id) => {
    setLoading(true);
    try {
      const salonData = await getSalon(id);
      setSalon(salonData);

      const employeeData = await getEmployees(id);
      setEmployees(employeeData);

      const serviceData = await getServices(id);
      setServices(serviceData);
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
    setSalon((prev) => ({ ...prev, ...updatedSalon }));
  };

  const handleAddOrEditService = (isEdit, newOrUpdatedService) => {
    if (isEdit) {
      setServices((prev) =>
        prev.map((service) =>
          service.id === newOrUpdatedService.id ? newOrUpdatedService : service
        )
      );
    } else {
      setServices((prev) => [...prev, newOrUpdatedService]);
    }
  };

  const handleAddOrEditEmployee = (isEdit = false, newOrUpdatedEmployee) => {
    if (isEdit) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === newOrUpdatedEmployee.id ? newOrUpdatedEmployee : emp
        )
      );
    } else {
      setEmployees((prev) => [...prev, newOrUpdatedEmployee]);
    }
  };

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
            <ProfileCard
              salon={salon}
              noOfServices={services.length}
              noOfEmployees={employees.length}
              onSubmit={handleEditSalonProfile}
            />
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
                <AddOrEditServiceModal
                  salonId={salonId}
                  onSubmit={handleAddOrEditService}
                />
              ) : (
                <AddOrEditEmployeeModal
                  salonId={salonId}
                  onSubmit={handleAddOrEditEmployee}
                />
              )}
            </Box>
          </Flex>

          {activeTab === "Services" && (
            <VStack align="start" mt={5} spacing={4}>
              {services.length > 0 ? (
                services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    salonId={salonId}
                    service={service}
                    onsubmit={handleAddOrEditService}
                  />
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
              {employees.length > 0 ? (
                employees.map((emp) => (
                  <EmployeeCard
                    key={emp.id}
                    salonId={salonId}
                    employee={emp}
                    onsubmit={handleAddOrEditEmployee}
                  />
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
    </DashboardLayout>
  );
};

export default SalonProfile;
