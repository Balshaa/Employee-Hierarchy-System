import React from 'react'
import Sidenav from './SideNav'
import { Box } from '@mui/material'
import EmployeeTable from './EmployeeTable'
import { Table } from '@mantine/core';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { Button } from '@mantine/core';
//import { Button, DeleteIcon } from '@mantine/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Card, Image, Text, Badge, Group } from '@mantine/core';
import EditEmployee from './EditEmployee/EditEmployee';
import EditEmployeeTable from './EditEmployee/EditEmployeeTable';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Grid } from '@mantine/core';
import { Pagination } from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import { Input, CloseButton } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { CiSearch } from "react-icons/ci";


const Home = () => {
  let n=1;
  const [activePage, setPage] = useState(1);
  const handleOpen3 = (id, Name, Manager, Description) => {
    // setSelectedId(id);
    setId2(id);
    setName(Name);
    setManager(Manager);
    setDescription(Description);

  };
  const [id2, setId2] = useState('');
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Manager, setManager] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);  
  const [open3, setOpen3] = useState(false);
  const [positions, setPositions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;
  const rowColors = ['#ffffff', '#f0f0f0'];

  const { id } = useParams();
  const [id3, setId3] = useState('');
    const handleClick = (id) => {
    setOpen3(true);
  setId3(id);
  
    }
  const handleClose = () => {
    setOpen(false);
  }
  const handleClose3 = () => {
    setOpen3(false);
  }
  const handleModalClose = () =>{
    setOpen(false)
  }
  const handleModalClose3 = () =>{
    setOpen3(false)
  }
  useEffect(() => {
    fetchPositions();
  });
  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await axios.get('http://localhost:8801/Position');
      const data = response.data;
      setPositions(data);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  const handleDelete = async (id, Name) => {
    const position = positions.find((pos) => pos.Manager === Name);

    if (position) {
      alert("This is the parent node. Delete the child first!!!");
    } else {
      const result = window.confirm('Are you sure to delete?');
      if (result) {
        try {
          await axios.delete(`http://localhost:8801/PositionDelete/${id}`);
          console.log('Delete operation confirmed');
          // navigate("/");
          // window.location.reload();
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('Delete operation canceled');
      }
    }}

// fetching selected items data 
  useEffect(() => {
    axios.get("http://localhost:8801/selectedNode/" + id)
      .then(res => {
        setName(res.data[0].Name);
        setDescription(res.data[0].Description);
        setManager(res.data[0].Manager);
      })
      .catch(err => console.log(err));
  })

  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("ASC");
  
  const handlePageChange = (page) => {

    setCurrentPage(page);
  };
  // Apply sorting to all items
  let sortedItems = [...positions];
if (sortColumn) {
  sortedItems.sort((a, b) =>
    a[sortColumn].toLowerCase() > b[sortColumn].toLowerCase() ? 1 : -1
  );
  if (sortOrder === "DESC") {
    sortedItems.reverse();
  }
} else {
  // Add code to unsort the items
  sortedItems = [...positions]; // Reset to the original order
}
  
  const filteredItems = sortedItems.filter((item) => {
    return search.trim() === ""
      ? true
      : item.Name.toLowerCase().includes(search.toLowerCase());
  });
  
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  
  const sorting = (col) => {
    if (sortColumn === col) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortColumn(col);
      setSortOrder("ASC");
    }
  };
    return (
    <>
      <Box >
        <Sidenav />

      </Box>

      <Box component="main" style={{ marginLeft: "20%",width: "100%", marginTop: "-5%", }}>
      <div   style={{ marginLeft: "0%", marginBottom: '10px' }}>
             <Input style={{backgroundColor: '#f2f2f2', width: "17%"}} name='search'  onChange={(e) => setSearch(e.target.value)}   placeholder='Search...' leftSection={<CiSearch  size={16} />} />
            </div>
        <Grid cols={12} justify='space-between' >
          <Grid.Col span={7}  >
          
            <Table stickyHeader stickyHeaderOffset={60}  style={{ border: '1px solid #f0f0f0' }}>
              <Table.Thead>
              
                <Table.Tr style={{ backgroundColor: "silver" }}>
                  <Table.Th>No</Table.Th>
                  <Table.Th onClick={() => sorting(sortColumn === "Name" && sortOrder === "ASC" ? "Name" : "Name")}>
                  Name
                  {sortColumn === "Name" && sortOrder === "ASC" && <IconChevronUp />}
                  {sortColumn === "Name" && sortOrder === "DESC" && <IconChevronDown />}
                  {sortColumn !== "Name" && (
                    <IconSelector
                      onSelect={() => sorting("Name")}
                      icons={[IconChevronUp, IconChevronDown]}
                    />
                  )}
                </Table.Th>
                  <Table.Th   onClick={() => sorting("Manager")}>
                  Manager   {sortColumn === "Manager" && sortOrder === "ASC" && <IconChevronUp />}
                  {sortColumn === "Manager" && sortOrder === "DESC" && <IconChevronDown />}
                  {sortColumn !== "Manager" && (
                    <IconSelector
                      onSelect={() => sorting("Name")}
                      icons={[IconChevronUp, IconChevronDown]}
                    />
                  )}
                  </Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th colSpan={2} style={{ textAlign: 'center' }}>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
              {currentItems.map((position, index) => (
                  // Rest of the code...
                
                  <Table.Tr    key={index}
                  style={{ backgroundColor: rowColors[index % rowColors.length] }}>
                    <Table.Td>{indexOfFirstItem + index + 1}</Table.Td>
                    <Table.Td>{position.Name}</Table.Td>
                    <Table.Td>{position.Manager}</Table.Td>
                    <Table.Td>{position.Description}</Table.Td>
                    <Table.Td>
                    <Button
                    style={{ backgroundColor: 'silver' }}
                    onClick={() => handleClick(position.id)}
                  >
                    <EditIcon color="secondary" />
              </Button>
                    </Table.Td>
                    <Table.Td>
                    <Button
                    style={{ backgroundColor: 'silver' }}
                      onClick={() => handleDelete(position.id, position.Name)} 
                    >
                    <DeleteIcon  color="error" />
                    </Button>
                    
                  </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            <div style={{marginTop: '0.5%', display: 'flex', justifyContent: 'center' }}>
            <Pagination
            
              total={Math.ceil(filteredItems.length / pageSize)}
              value={currentPage}
              onChange={handlePageChange}
              withEdges
              getItemProps={(page) => ({
                component: 'a',
                href: `#page-${page}`,
              })}
              getControlProps={(control) => {
                if (control === 'first') {
                  return { component: 'a', href: '#page-0' };
                }
          
                if (control === 'last') {
                  return { component: 'a', href: '#page-total' };
                }
          
                if (control === 'next') {
                  return { component: 'a', href: '#page-2' };
                }
          
                if (control === 'previous') {
                  return { component: 'a', href: '#page-1' };
                }
          
                return {};
              }}
            />
          </div>
          </Grid.Col>
          <Grid.Col span={5} >
            <Card style={{ width: '280px', height: '400px' }} shadow="sm" radius="md" withBorder>
              <Group ml="2" >
                <Badge color="pink" size='lg'>Selected Node</Badge>
              </Group>

              <div >
                <h3>Detail Node Information:</h3>
                <p> <strong >ID:</strong> {id}</p>
                <p> <strong>Name:</strong> {Name}</p>
                <p> <strong>Manager:</strong> {Manager}</p>
                <p> <strong>Description:</strong> {Description}</p>
                <Group justify="flex-end" mt="md" mb="xs">

                  <Button
                    style={{ backgroundColor: 'silver' }}
                    sx={{ m: 2, width: '3ch', height: '5ch' }}
                    onClick={setOpen}
                    color="silver"
                    variant="filled"
                    size="small"
                  >
                    <EditIcon fontSize="large" color="secondary" />
                  </Button>

                  <Button
                    onClick={() => handleDelete(id, Name)}
                    style={{ backgroundColor: 'silver' }}
                    sx={{ m: 2, width: '3ch', height: '5ch' }}
                    variant="filled"
                    size="small"
                    color="error"  
                  >
                    <DeleteIcon fontSize="large" color="error" />
                  </Button>
                </Group>
              </div>


              {/*  <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>*/}
            </Card>
          </Grid.Col>
        </Grid>
      </Box>
      <div>
        <Modal opened={open} onClose={handleModalClose} title="Edit Position" >
          <EditEmployee id={id} CloseEvent1={handleClose} />
        </Modal>
      </div>
      <div>
      <Modal opened={open3} onClose={handleModalClose3} title="Edit Position" >
        <EditEmployee id={id3} CloseEvent1={handleClose3} />
      </Modal>
    
    </div>
    <Grid>
    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>1</Grid.Col>
    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>2</Grid.Col>
    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>3</Grid.Col>
    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>4</Grid.Col>
  </Grid>
    </>
  )
}

export default Home