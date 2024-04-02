import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Home() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ domain: '', gender: '', available: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, filters, currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users', {
        params: { name: searchTerm, ...filters }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page to 1 when search term changes
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1); // Reset page to 1 when filter changes
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <div className="search-container">
        <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearchChange} />
      </div>
      <div className="filter-container">
        <label htmlFor="domain">Domain:</label>
        <select id="domain" name="domain" value={filters.domain} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Business Development">Business Development</option>
          <option value="Finance">Finance</option>
          <option value="IT">IT</option>
          <option value="Management">Management</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="UI Designing">UI Designing</option>
        </select>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" value={filters.gender} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="available">Availability:</label>
        <select id="available" name="available" value={filters.available} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>
      <div className="card-container">
        {currentUsers.map(user => (
          <Card key={user._id} style={{ width: '18rem', borderRadius: '15px', backgroundColor: 'black', boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.2)', color: 'white', marginBottom: '1rem' }}>
            <Card.Img variant="top" src={user.avatar} alt="Avatar" style={{ borderRadius: '15px 15px 0 0' }} />
            <Card.Body>
              <Card.Title>{user.first_name} {user.last_name}</Card.Title>
              <Card.Text>
                <p className="user-info">Email: {user.email}</p>
                <p className="user-info">Gender: {user.gender}</p>
                <p className="user-info">Domain: {user.domain}</p>
                <p className="user-info">Available: {user.available ? 'Yes' : 'No'}</p>
              </Card.Text>
              <Button variant="primary">Profile</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
        ))}
      </div>
    </div>
  );
}


export default Home;
