import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerTable from './components/CustomerTable';
import PaginationTable from './components/PaginationTable';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedColumn, setSortedColumn] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [searchTerm, sortedColumn, currentPage, pageSize]);

  const fetchData = async () => {
    try {
      let url = `http://localhost:5000/api/customers/paginated?page=${currentPage}&pageSize=${pageSize}`;

      if (searchTerm) {
        url += `&query=${searchTerm}`;
      }

      if (sortedColumn) {
        url += `&sortBy=${sortedColumn}`;
      }

      const response = await axios.get(url);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleSort = (column) => {
    if (column === sortedColumn) {
      setSortedColumn((prevSort) => (prevSort.startsWith('-') ? column : `-${column}`));
    } else {
      setSortedColumn(column);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const nextpage = () => {
    handlePageChange(currentPage + 1);
  };

  const previouspage = () => {
    handlePageChange(currentPage - 1);
  };

  return (
    <div>
      <h1 style={{ color: 'white' }} align='center'>Customer App</h1>
      <CustomerTable customers={customers} onSort={handleSort} />
      <PaginationTable
        page={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        nextpage={nextpage}
        previouspage={previouspage}
      />
      <div align='center' class='footer'>
        <p class="text-center">Designed and Developed by <a href="https://www.linkedin.com/in/deepthi-gangu-a1442721a/">G. Deepthi</a></p>
      </div>
    </div>
  );
};

export default App;
