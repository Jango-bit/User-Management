
import React, { useState } from 'react';
function Home() {
  const [users, setUsers] = useState([
    { id: 1, name: "Ayush", email: "Ayush@gmail.com", university: "Calicut", subjects: "Maths, Physics" },
    { id: 2, name: "Athulyadas", email: "athulya@gmail.com", university: "Karnataka", subjects: "AI, Cloud Computing" },
    { id: 3, name: "NaveenThomas", email: "Naveeen@gmail.com", university: "UP", subjects: "Computer Science, AI" },
    { id: 4, name: "Jamsheer", email: "Jamsheer@gmail.com", university: "Oxford", subjects: "Economics, History" },
  ]);
  
  const [filterText, setFilterText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [subjects, setSubjects] = useState('');

  const handleSaveUser = () => {
    const newUser = { id: Date.now(), name, email, university, subjects };

    if (isEditing) {
      setUsers(users.map(user => user.id === editUser.id ? { ...user, name, email, university, subjects } : user));
      setIsEditing(false);
      setEditUser(null);
    } else {
      setUsers([...users, newUser]);
    }

    setName('');
    setEmail('');
    setUniversity('');
    setSubjects('');
  };

  const handleEditUser = (user) => {
    setName(user.name);
    setEmail(user.email);
    setUniversity(user.university);
    setSubjects(user.subjects);
    setIsEditing(true);
    setEditUser(user);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user => user.university.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div>
      <h1>User Management</h1>
      <div>
        <button onClick={() => setIsEditing(false)}>Create User</button>
        <input 
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
      
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>University</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.university}</td>
              <td>{user.subjects}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(isEditing || !isEditing) && (
        <div>
          <h2>{isEditing ? 'Edit User' : 'Create User'}</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSaveUser(); }}>
            <label>Name:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
            <br />
            <label>Email:</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <label>University:</label>
            <input 
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              required
            />
            <br />
            <label>Subjects:</label>
            <input 
              type="text"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              required
            />
            <br />
            <button type="submit">{isEditing ? 'Save Changes' : 'Save'}</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Home;
