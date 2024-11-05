import React from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  HStack,
  Text,
} from "@chakra-ui/react";

const TableComponent = ({ columns, data, renderActions }) => {
  return (
    <TableContainer borderTop="1px solid black">
      <Table variant="simple">
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.key} >{column.label}</Th>
            ))}
            {renderActions && <Th>Action</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {data.length === 0 ? (
            <Tr>
              <Td colSpan={columns.length + (renderActions ? 1 : 0)}>
                <Text textAlign="center" color="gray.500">
                  No records found
                </Text>
              </Td>
            </Tr>
          ) : (
            data.map((row) => (
              <Tr key={row.id}>
                {columns.map((column) => (
                  <Td key={column.key}>
                    {column.render ? column.render(row) : row[column.key]}
                  </Td>
                ))}
                {renderActions && (
                  <Td>
                    <HStack  spacing={0.5}>
                      {renderActions(row)}
                    </HStack>
                  </Td>
                )}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
