import React, { useEffect, useState, useRef } from "react";
import {
  Input,
  Button,
  HStack,
  Card,
  InputGroup,
  InputLeftElement,
  List,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import DashboardLayout from "../../components/DashboardLayout";
import ConfirmDeleteDialog from "../../components/ConfirmDeleteDialog";
import { getAllItems, deleteItem } from "../../services/itemService";
import TableComponent from "../../components/TableComponent";
import AddOrEditItemModal from "../../components/AddOrEditItemModal";
import ListOfSalons from "./components/ListOfSalons";

const Salon = () => {
  const [salons, setSalons] = useState([]);
  const [salonToDelete, setSalonToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const cancelRef = useRef();

  const itemType = "salon";

  useEffect(() => {
    fetchSalons();
  }, []);

  const fetchSalons = async () => {
    try {
      const data = await getAllItems(itemType, 1);
      setSalons(data);
    } catch (error) {
      console.error("Error fetching salons:", error);
    }
  };

  const handleSalonClick = (salon) => {
    console.log("Salon clicked:", salon);
  };

  const handleDelete = async (itemType, salonId) => {
    try {
      await deleteItem(itemType, salonId);
      setSalons((prevSalons) =>
        prevSalons.filter((salon) => salon.id !== salonId)
      );
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting salon:", error);
    }
  };

  const openDeleteDialog = (salon) => {
    setSalonToDelete(salon);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSalonToDelete(null);
  };

  const handleAddOrUpdateSalon = (isEdit, newOrUpdatedSalon) => {
    if (isEdit) {
      console.log(newOrUpdatedSalon, isEdit);
      setSalons((prev) =>
        prev.map((salon) =>
          salon.id === newOrUpdatedSalon.id ? newOrUpdatedSalon : salon
        )
      );
    } else {
      setSalons((prev) => [...prev, newOrUpdatedSalon]);
    }
  };

  const columns = [
    { label: "Name", key: "name", placeholder: "Salon Name" },
    { label: "Location", key: "location", placeholder: "Location" },
    { label: "Description", key: "description", placeholder: "Description" },
    {
      label: "Operating Time",
      key: "operating_time",
      placeholder: "Operating Time",
    },
  ];

  return (
    <DashboardLayout title="Salons">
      <Card>
        <HStack borderBottom="1px solid black" p={2} m={2} spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BiSearch />
            </InputLeftElement>
            <Input width="auto" type="text" placeholder="Search" />
          </InputGroup>
          <AddOrEditItemModal
            itemType={itemType}
            isEdit={false}
            modalTitle="Add Salon"
            fields={columns}
            onSubmit={handleAddOrUpdateSalon}
          />
        </HStack>
        <ListOfSalons
          itemType={itemType}
          handleAddOrUpdateSalon={handleAddOrUpdateSalon}
          onDeleteClick={openDeleteDialog}
        />
        {/* <TableComponent
          columns={columns}
          data={salons}
          renderActions={(salon) => (
            <>
              <AddOrEditItemModal
                itemType={itemType}
                isEdit={true}
                item={salon}
                modalTitle="Edit Salon"
                fields={columns}
                onSubmit={handleAddOrUpdateSalon}
              />
              <Button
                onClick={() => openDeleteDialog(salon)}
                rightIcon={<MdDelete />}
                colorScheme="red"
                variant="solid"
                size="sm"
              >
                Delete
              </Button>
            </>
          )}
        /> */}
      </Card>

      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={() => handleDelete(itemType, salonToDelete.id)}
        title="Delete Salon"
        message="Are you sure you want to delete this salon? This action cannot be undone."
        ref={cancelRef}
      />
    </DashboardLayout>
  );
};

export default Salon;
