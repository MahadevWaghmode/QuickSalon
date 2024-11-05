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

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = useRef();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getAllItems("staff");
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddOrUpdateItem = (newOrUpdatedItem) => {
    if (newOrUpdatedItem.id) {
      // Editing logic
      setEmployees((prev) =>
        prev.map((item) =>
          item.id === newOrUpdatedItem.id ? newOrUpdatedItem : item
        )
      );
    } else {
      // Adding logic
      setSalons((prev) => [...prev, newOrUpdatedItem]);
    }
  };


  const handleDelete = async (itemType,employeeId) => {
    try {
      await deleteItem(itemType,employeeId);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== employeeId)
      );
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const openDeleteDialog = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };

  const columns = [
    { label: "Name", key: "name", placeholder: "Employee Name" },
    { label: "Role", key: "role", placeholder: "Role" },
    { label: "Email", key: "email", placeholder: "Email" },
    { label: "Phone", key: "phone", placeholder: "Phone" },
  ];

  return (
    <DashboardLayout title="Employees">
      <Card>
        <HStack m={2} spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BiSearch />
            </InputLeftElement>
            <Input width="auto" type="text" placeholder="Search" />
          </InputGroup>
          <AddOrEditItemModal
            itemType="staff"
            isEdit={false}
            modalTitle="Add New Employee"
            fields={columns}
            onSubmit={handleAddOrUpdateItem}
          />
        </HStack>
        <TableComponent
          columns={columns}
          data={employees}
          renderActions={(employee) => (
            <>
              <AddOrEditItemModal
            itemType="staff"
            isEdit={true}
            item={employee}
            modalTitle="Edit Employee"
            fields={columns}
            onSubmit={handleAddOrUpdateItem}
          />
              <Button
                onClick={() => openDeleteDialog(employee)}
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
        onConfirm={() => handleDelete("staff",employeeToDelete.id)}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
        ref={cancelRef}
      />
    </DashboardLayout>
  );
};

export default Employee;
