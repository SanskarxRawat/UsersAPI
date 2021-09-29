import React from 'react';
import "./App.css";


export default function UserModal({onAdd}) {
  const handleOnSubmit=(e)=>{
    e.preventDefault();
    onAdd(e.target.name.value,e.target.email.value,e.target.username.value,e.target.phone.value,e.target.website.value);
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.username.value = "";
    e.target.phone.value = "";
    e.target.website.value = "";
  }

  return(
    <div>
    <form onSubmit={handleOnSubmit} className="root">
      <h3>Add User</h3>
      <input placeholder="Name" name="name" />
      <input placeholder="UerName" name="username" />
      <input placeholder="Email" name="email" />
      <input placeholder="Phone" name="phone" />
      <input placeholder="Website" name="website" />
      <button onSubmit={handleOnSubmit}>Add</button>
    </form>
  </div>
  );
}
