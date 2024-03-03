import React, { useState } from 'react';
import './CustomerTable.css';
import PaginationTable from './PaginationTable'; 
import moment from 'moment';

const CustomerTable = ({ customers, onSort, onPageChange, pageSizeOptions, nextpage, previouspage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState({ field: 'sno', order: 'asc' });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (field) => {
    const order = sortOption.field === field && sortOption.order === 'asc' ? 'desc' : 'asc';
    setSortOption({ field, order });
    onSort({ field, order });
  };

  const sortedCustomers = () => {
    const { field, order } = sortOption;
    const sortedData = [...customers];

    if (field === 'date' || field === 'time') {
      sortedData.sort((a, b) => {
        const dateA = moment(a.created_at);
        const dateB = moment(b.created_at);

        return order === 'asc' ? dateA - dateB : dateB - dateA;
      });
    } else {
      sortedData.sort((a, b) => {
        return order === 'asc' ? a[field] - b[field] : b[field] - a[field];
      });
    }

    return sortedData;
  };

  const filteredCustomers = sortedCustomers().filter(customer => {
    return (
      customer.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchQuery.toLowerCase())
      
    );
  });

  return (
    <div>
      <div class="pad">
        <input
          class="fix"
          type="text"
          placeholder="Search by name or location"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table align='center'>
        <thead>
          <tr>
            <th >Sno</th>
            <th >Customer Name</th>
            <th >Age</th>
            <th >Phone</th>
            <th >Location</th>
            <th onClick={() => handleSort('date')}>Date</th>
            <th onClick={() => handleSort('time')}>Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.sno}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{moment(customer.created_at).format('YYYY-MM-DD')}</td>
              <td>{moment(customer.created_at).format('HH:mm:ss')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      </div>
  );
};

export default CustomerTable;
