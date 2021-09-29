import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditModal(props){
    
    const {
      open, obj, handleClose,index, handleOpen, users, setUsers
    } = props;

    const [name, setName] = useState(obj?.name);
    const [username, setUserName] = useState(obj?.username);
    const [email, setEmail] = useState(obj?.email);
    const [phone, setPhone] = useState(obj?.phone);
    const [website, setWebsite] = useState(obj?.website);

    const handleOnSubmit = async () => {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${obj.id}` , {
          method: 'PUT',
          body: JSON.stringify({
            name : name, 
            username : username, 
            phone : phone, 
            website : website, 
            email : email
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }).then((res) => {
          if (res.status !== 201) {
            return;
          } else {
            return res.json();
          }
        })
        .then((json) => {
          setUsers(
            users.map((item) => (item.id === obj.id ? json : item))
          )
          .catch((err) => {
            console.log(err);
          });
        });
    };

    return(
        <div>
        <Dialog open={open} onClose={() => handleClose()} >
          <DialogTitle>Enter Your User Details Here</DialogTitle>
          <form className="root">
          <DialogContent>
          <TextField
            label="Name"
            variant="filled"
            required
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="UserName"
            variant="filled"
            required
            value={username}
            name="username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="filled"
            type="email"
            required
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone"
            variant="filled"
            type="number"
            required
            value={phone}
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
          label="Website"
          variant="filled"
          required
          value={website}
          name="website"
          onChange={(e) => setWebsite(e.target.value)}
          />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary"
            onClick={() => handleOnSubmit()}
            >
              Update
            </Button>
            </DialogActions>
        </form>
        </Dialog>
        </div>
    );
}