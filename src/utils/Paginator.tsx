import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { GetAllProductsType } from "../api/products-list-api";




const Paginator: React.FC<PaginatedItemsType> = React.memo((props) => {
  let currentPage;
  const {itemsPerPage, items, setItemOffset, newOffset} = props;
  const {setCurrentPage} = props;
/*   const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    setPageCount(Math.ceil(total_count / itemsPerPage));
  }, [itemsPerPage, items]); */

  const pageCount = Math.ceil(items / itemsPerPage);
  const handlePageClick = (current: any) => {
    setItemOffset(current.pageNumber.selected + 1);
    setCurrentPage(current.pageNumber.selected + 1)
  };
//if page 0
(currentPage === 0) ? currentPage = 1 : currentPage = newOffset;
 
  return (
    <>
      <ReactPaginate
        forcePage={newOffset - 1}
        nextLabel=" >"
        onPageChange={(pageNumber) => {
          handlePageClick({ pageNumber });
        }}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< "
        pageClassName="page-item"
        pageLinkClassName="page-link mx-1 rounded-3 text-body"
        previousClassName="page-item"
        previousLinkClassName="page-link mx-1 rounded-3 text-body"
        nextClassName="page-item"
        nextLinkClassName="page-link mx-1 rounded-3 text-body"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link mx-1 rounded-3 text-body"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={undefined}
      />
    </>
  );
})

export default Paginator

type PaginatedItemsType = {
  itemsPerPage: number
  setItemOffset: (num: number) => void
  setCurrentPage: (num: string | null | undefined) => void
  items: number
  newOffset: number
}