import { Paginator } from "primereact/paginator";
import React from "react";


const Pagination = ({ first, rows, totalRecords, onPageChange }) => {
    return (
        <Paginator
            first={first}
            rows={rows}
            totalRecords={totalRecords}
            onPageChange={onPageChange}
        />
    );
};

export default Pagination;
