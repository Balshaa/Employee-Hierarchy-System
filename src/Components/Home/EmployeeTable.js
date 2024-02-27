import React from 'react';
import { Table } from '@mantine/core';
import axios from "axios";
import { Button } from '@mantine/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function EmployeeTable({ data }) {

  const [id, setId] = useState('');
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Manager, setManager] = useState('');
  const navigate = useNavigate();
  const [Position, setPosition] = useState('');


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await axios.delete(`http://localhost:8801/PositionDelete/${id}`);
        await axios.delete(`http://localhost:8800/account/${id}`);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleOpen3 = (id, Name, Manager, Position, Description) => {
    // setSelectedId(id);
    setId(id);
    setName(Name);
    setManager(Manager);
    setPosition(Position);
    setDescription(Description);

  };
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Employee 333: wrwaeuriwaeo {data.id} </h3>
      {data && (
        <Table stickyHeader stickyHeaderOffset={60}>
          <Table.Thead>
            <Table.Tr style={{ backgroundColor: 'silver' }}>
              <Table.Th>ID</Table.Th>
              <Table.Th>Action</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Manager</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr key={id}>
              <Table.Td>{data.id}</Table.Td>
              <Table.Td>
                <Button
                  sx={{ m: 1, width: '5ch', height: '5ch', backgroundColor: 'white' }}
                  onClick={() => handleOpen3(
                    data.id,
                    data.Name,
                    data.Manager,
                    data.Position,
                    data.Description,
                  )}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  <EditIcon fontSize="large" color="Secondary" />
                </Button>
                <Button
                  onClick={() => handleDelete(data.id)}
                  sx={{ m: 1, width: '5ch', height: '5ch', backgroundColor: 'white' }} variant="contained" size="small" color="secondary"
                >
                  <DeleteIcon fontSize="large" color="error" />
                </Button>

              </Table.Td>
              <Table.Td>{data.Name}</Table.Td>
              <Table.Td>{data.Manager}</Table.Td>
              <Table.Td>{data.Description}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
          <Table.Caption>
            <h1>Perago Information System Employee Hierarchy</h1>
          </Table.Caption>
        </Table>
      )}
    </div>
  );
}