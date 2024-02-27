import React, { useState } from 'react';
import { useEffect } from 'react';
import { NativeSelect } from '@mantine/core';

import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Box } from '@mantine/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";

export default function EditEmployee({ id, CloseEvent1  }) {
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Manager, setManager] = useState('');
  const navigate = useNavigate();
  const [Position, setPosition] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8801/PositionEdit/" + id)
      .then(res => {
        setName(res.data[0].Name);
        setDescription(res.data[0].Description);
        setManager(res.data[0].Manager);
      })
      .catch(err => console.log(err));
  }, [id])

  useEffect(() => {
    fetchEmployeeHierarchy();
  }, []);

  const fetchEmployeeHierarchy = async () => {
    try {
      const response = await axios.get('http://localhost:8801/Position');
      setPosition(response.data)

      // Convert Hierarchy data to a tree structure expected by TreeView component

    } catch (error) {
      console.error('Error fetching employee hierarchy:', error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const data = {
      Name,
      Manager,
      Description,
    };

    try {
      await axios.put('http://localhost:8801/PositionUpdate/' + id, data);
      CloseEvent1();
      Swal.fire('Position Updated!', 'Position has been updated successfully.', 'success');
    } catch (error) {
      // Handle error
      console.log(error);
    }
  
  };

  const form = useForm({
    initialValues: { Name: '', Description: '', Manager: '' },
    validate: {
      Name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      Description: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      Manager: (value) => (value.length < 2 ? 'Manager must have at least 2 letters' : null),
    },
  });

  return (
    <Box maxWidth={340} mx="auto">
      <form onSubmit={form.onSubmit(handleClick)}>
        <TextInput label="Position Name" placeholder="Position Name" value={Name} onChange={(event) => {
          setName(event.target.value);
        }}></TextInput>
        <TextInput mt="sm" label="Description" placeholder="Description" value={Description} onChange={(event) => {
          setDescription(event.target.value);
        }} />
        <NativeSelect
          label="Manager"
          value={Manager}
          onChange={(event) => {
            setManager(event.target.value);
          }}
        >
        
          {Position.map((position) => (
            <option key={position.id} value={position.Name}>
              {position.Name}
              {/*TO DISPLAY ALL HierarchyNAMES IN TH TREE COMPONENETS */}
            </option>
          ))}
        </NativeSelect>
        <Button type="submit" mt="sm" onClick={handleClick}>
          Submit
        </Button>
      </form>
    </Box>
  );
}

