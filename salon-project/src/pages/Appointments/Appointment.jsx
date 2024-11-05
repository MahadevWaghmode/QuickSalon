import React, { useEffect, useState, useRef } from "react";
import {
  Input,
  Button,
  HStack,
  Card,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import DashboardLayout from "../../components/DashboardLayout";
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog";
import TableComponent from "../../components/TableComponent";
import { deleteItem, getAllItems } from "../../services/itemService";
import AddOrEditItemModal from "../../components/AddOrEditItemModal";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = useRef();

  const itemType = "appointments"

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAllItems(itemType);
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching Appointment:", error);
    }
  };

  const handleAddOrUpdateItem = (newOrUpdatedItem) => {
     console.log("Received item:", newOrUpdatedItem);
    if (newOrUpdatedItem.id) {
      // Editing logic
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === newOrUpdatedItem.id ? newOrUpdatedItem : item
        )
      );
    } else {
      // Adding logic
      setAppointments((prev) => [...prev, newOrUpdatedItem]);
    }
  };


  const handleDelete = async (itemType,appointmentId) => {
    try {
      await deleteItem(itemType,appointmentId);
      setAppointments((prevAppointment) =>
        prevAppointment.filter((appointment) => appointment.id !== appointmentId)
      );
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const openDeleteDialog = (appointment) => {
    setAppointmentToDelete(appointment);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setAppointmentToDelete(null);
  };

  const columns = [
    { label: "Name", key: "name", placeholder: "Customer Name" },
    { label: "Services", key: "services", placeholder: "Select services" },
    { label: "Date and time", key: "dateandtime", placeholder:"Appointment date and time"},
    { label: "Email", key: "email", placeholder: "Email" },
    { label: "Phone", key: "phone", placeholder: "Phone" },
  ];

  return (
    <DashboardLayout title="Appointment">
      <Card>
        <HStack m={2} spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BiSearch />
            </InputLeftElement>
            <Input width="auto" type="text" placeholder="Search" />
          </InputGroup>
          <AddOrEditItemModal
            itemType={itemType}
            isEdit={false}
            modalTitle="Add New Appointment"
            fields={columns}
            onSubmit={handleAddOrUpdateItem}
          />
        </HStack>
        <TableComponent
          columns={columns}
          data={appointments}
          renderActions={(appointment) => (
            <>
              <AddOrEditItemModal
            itemType={itemType}
            isEdit={true}
            item={appointment}
            modalTitle="Edit Appointment"
            fields={columns}
            onSubmit={handleAddOrUpdateItem}
          />
              <Button
                onClick={() => openDeleteDialog(appointment)}
                rightIcon={<MdDelete />}
                colorScheme="red"
                variant="solid"
                size="sm"
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
        onConfirm={() => handleDelete(itemType,appointmentToDelete.id)}
        title="Delete Appointment"
        message="Are you sure you want to delete this appointment? This action cannot be undone."
        ref={cancelRef}
      />
    </DashboardLayout>
  );
};

export default Appointment;
