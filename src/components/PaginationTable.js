
import React from 'react';
import './CustomerTable.css';

const PaginationTable = ({ page, totalPages, onPageChange, pageSizeOptions, nextpage, previouspage }) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= 3; i++) {
      pages.push(
        <button key={i} onClick={() => onPageChange(i)} className={i === page ? 'active' : ''}>
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
    <div class='padd'>
      <div align='center' class='cen'>
        <button class = 'cent' onClick={() => previouspage()} disabled={page === 1}>
          Previous
        </button>      
        <span class='page'> Page {page} </span>
        <button class = 'cent' onClick={() => nextpage()} disabled={page === 3}>
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default PaginationTable;
