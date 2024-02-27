import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Button } from '@mantine/core';
import AddEmployee from '../Admin/AddEmployee/AddEmployee';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Box, Modal } from '@mantine/core';
const styles = {
  marginTop: '100px',
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: 7,
  boxShadow: 24,
  p: 4,
};
export default function TreeViewComponent() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  }
  

 // const [open1, setOpen1] = useState(false);
  const [data, setData] = useState(null);
  const [selectedNodeData, setSelectedNodeData] = useState(null); // Store the selected node's data

  const navigate = useNavigate();
  var url = window.location.href;
  const handleModalClose = () =>{
    setOpen(false)
  }
  const handleClick = async (id) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    fetchEmployeeHierarchy();
  });

  const fetchEmployeeHierarchy = async () => {
    try {
      const response = await axios.get('http://localhost:8801/Position');
      const hierarchy = response.data;

      // Convert Hierarchy data to a tree structure expected by TreeView component
      const root = {
        id: '0',
        Name: 'Employee', // Root node name
        children: buildTree(hierarchy, "Head"), // Build the tree from the Hierarchy data
      };
      setData(root);
    } catch (error) {
      console.error('Error fetching employee hierarchy:', error);
    }
  };

  const buildTree = (hierarchy, parentId) => {
    const children = [];

    // Find all employees with the given parentId
    const employees = hierarchy.filter((employee) => employee.Manager === parentId);

    // Recursively build the tree for each employee
    for (const employee of employees) {
      const childNode = {
        id: employee.id,
        Name: employee.Name,
        Description: employee.Description, // Assuming the employee object has a "description" property
        Manager: employee.Manager, // Assuming the employee object has a "managerId" property
        children: buildTree(hierarchy, employee.Name), // Use "employee.id" as the parentId in recursive calls
      };
      children.push(childNode);
    }
    return children;
  };


  let lastClickedNodeId = null; // Variable to store the ID of the last clicked node

  const renderTree = (nodes) =>
    nodes.map((node) => (
      <TreeItem
        key={node.id} // Add a unique key prop for each tree item
        nodeId={node.id}
        label={node.Name}

        onClick={() => {
          if (!lastClickedNodeId) {
            lastClickedNodeId = node.id; // Store the ID of the first double-clicked node
            handleClick(node.id)
          }
        }
        }
      >
        {node.children && node.children.length > 0 && renderTree(node.children)}
      </TreeItem>
    ));

  return (
    <>

      <Button onClick={() => setOpen(true)} variant="filled" radius="xs" color="green">
        AddPosition
      </Button>
      <div >
        {data && (
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {renderTree(data.children)} {/* Pass the children of the root node */}
          </TreeView>
        )}
      </div>
      <Modal opened={open} onClose={handleModalClose} title="Add Position">
        <AddEmployee  CloseEvent1={handleClose} />
      </Modal>
    </>
  );
}