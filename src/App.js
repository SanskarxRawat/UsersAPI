import React, {useState, useEffect} from "react";
import './App.css';
import UserModal from "./userModal";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@material-ui/core/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetchData();
  },[]);
  
  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log(err);
      });
  };
  const onAdd = async (name,email,username,phone,website) => {
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        username:username,
        phone:phone,
        website:website
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setUsers((users) => [...users, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    onDelete(id);
};

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{width:'100%'}}>
          <Box
                display="flex"
                flexWrap="wrap"
                alignContent="flex-start"
                p={1}
                m={30}
                bgcolor="grey.300"
                sx={{ maxWidth: 1000, height: 1000 }}
            >
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Website</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">{row.website}</TableCell>
                    <TableCell align="right"><Button variant="contained" onClick={()=>handleDelete(row.id)}>Delete</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
                  <div style={{ width: '100%' }}>
              <Box sx={{ display: 'flex', p: 5, m:2, bgcolor: 'white' }}>
                          <Stack spacing={2} direction="row">
                  <br/>
                  <UserModal onAdd={onAdd} />
                  <Button variant="outlined">Edit User</Button>
                  <Button variant="contained">Update User</Button>
                </Stack>
              </Box>
            </div>
              </Box>
          </div>
  );
}

