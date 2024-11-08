import React from "react";
import Pagination from "react-bootstrap/Pagination";

const PaginationPage = (props) => {
  const { totalPages, page, handlePage } = props;
  return (
    <div>
      <Pagination className="d-flex justify-content-end">
        <Pagination.First onClick={() => handlePage(1)} />
        <Pagination.Prev
          onClick={() => handlePage(page - 1)}
          disabled={page === 1}
        />

        {Array.from({ length: totalPages }, (_, i) => (
          <Pagination.Item
            key={i + 1}
            onClick={() => handlePage(i + 1)}
            active={i + 1 === page}
          >
            {i + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={() => handlePage(page + 1)}
          disabled={page === totalPages}
        />
        <Pagination.Last onClick={() => handlePage(totalPages)} />
      </Pagination>
    </div>
  );
};

export default PaginationPage;
