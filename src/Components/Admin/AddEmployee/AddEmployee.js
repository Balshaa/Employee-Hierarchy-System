import React, { useState } from "react";
import { useEffect } from "react";
import { NativeSelect } from "@mantine/core";
import { useForm } from "react-hook-form";
import { NumberInput, TextInput, Button, Box } from "@mantine/core";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';


const schema = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
  Description: Yup.string().required("Description is required"),
  Manager: Yup.string().required("Description is required")
});

export default function AddEmployee({ CloseEvent1 }) {
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Manager, setManager] = useState("");
  const navigate = useNavigate();
  const [Position, setPosition] = useState([]);
  useEffect(() => {
    fetchEmployeeHierarchy();
  }, []);

  const fetchEmployeeHierarchy = async () => {
    try {
      const response = await axios.get("http://localhost:8801/Position");
      setPosition(response.data);

      // Convert Hierarchy data to a tree structure expected by TreeView component
    } catch (error) {
      console.error("Error fetching employee hierarchy:", error);
    }
  };

  const handleClick = async (data) => { 
    const PositionExist = Position.find((pos) => pos.Name === data.Name);
    if (PositionExist) {
      alert("This Position already exists!!!");
    } else {
      try {
        await axios.post("http://localhost:8801/employee", data);
        //navigate("/");
        CloseEvent1();
        Swal.fire(
          "Registered!",
          "You have successfully registered Position.",
          "success"
        );
      } catch (error) {
        console.log(error);
      }
     
    }
  };
  const onSubmit =(data)=>{
    setName(data.Name);
    setDescription(data.Description);
    setManager(data.Manager);
    handleClick(data);
  }

  const { handleSubmit, register,  formState: {errors} } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      Name: '',
      Description: '',
      Manager: ''
    }
  });
  
  return (
    <Box maxWidth={340} mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Position Name"
          placeholder="Position Name"
          {...register('Name')}
        />
        {errors.Name && <p style={{color: 'red'}}>{errors.Name.message}</p>}
        <TextInput
          mt="sm"
          label="Description"
          placeholder="Description"
          {...register('Description')}
        />
        {errors.Description && <p style={{color: 'red'}}>{errors.Description.message}</p>}
        <NativeSelect
          label="Manager"
          {...register('Manager')}
        >
        <option value="" disabled hidden >Select Position</option>
          {Position.map((position) => (
            <option key={position.id} value={position.Name}>
              {position.Name}
              {/*TO DISPLAY ALL HierarchyNAMES IN TH TREE COMPONENETS */}
            </option>
          ))}
        </NativeSelect>
        {errors.Manager && <p style={{color: 'red'}}>{errors.Manager.message}</p>}

        <Button type="submit" mt="sm" >
          Submit
        </Button>
      </form>
    </Box>
  );
}
