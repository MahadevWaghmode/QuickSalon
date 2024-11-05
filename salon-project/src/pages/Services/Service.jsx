import React, { useEffect, useState, useRef } from "react";
import {
  Input, Button, Card,
  HStack,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import DashboardLayout from "../../components/DashboardLayout";
import { BiSearch } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import AddServiceModal from "./components/AddServiceModal";
import EditServiceModal from "./components/EditServiceModal";
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog";
import { getAllServices, deleteService } from "../../services/servicesService";
import TableComponent from "../../components/TableComponent";
import { getAllItems } from "../../services/itemService";

const Service = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = useRef(); // Reference for cancel button in the alert dialog


  const itemType = "service";

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getAllItems(itemType,102);
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleServiceAdded = (newService) => {
    setServices((prevServices) => [...prevServices, newService]);
  };

  const handleServiceUpdated = (updatedService) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === updatedService.id ? updatedService : service
      )
    );
    setSelectedService(null); // Clear the selected service after update
  };

  const handleDelete = async (serviceId) => {
    try {
      await deleteService(serviceId);
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== serviceId)
      );
      setIsDeleteDialogOpen(false); // Close the confirmation dialog
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const openDeleteDialog = (service) => {
    setServiceToDelete(service);
    setIsDeleteDialogOpen(true); // Open the confirmation dialog
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setServiceToDelete(null);
  };

  // Define columns for the TableComponent
  const columns = [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Price", key: "price" },
    { label: "Category", key: "category" },
  ];

  return (
    <DashboardLayout title="Services">
      <Card>
        <HStack m={2} spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BiSearch />
            </InputLeftElement>
            <Input width="auto" type="text" placeholder="Search" />
          </InputGroup>
          <AddServiceModal onServiceAdded={handleServiceAdded} />
          
        </HStack>

        <TableComponent
          columns={columns}
          data={services}
          renderActions={(service) => (
            <>
              <EditServiceModal
                selectedService={service}
                onServiceUpdated={handleServiceUpdated}
              />
              <Button
                onClick={() => openDeleteDialog(service)}
                rightIcon={<MdDelete />}
                colorScheme="red"
                variant="solid"
                size="xs"
              >
                Delete
              </Button>
            </>
          )}
        />
      </Card>

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={() => handleDelete(serviceToDelete.id)}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        ref={cancelRef}
      />
    </DashboardLayout>
  );
};

export default Service;
