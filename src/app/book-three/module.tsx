type PaginationProps = {
  booksPerPage: number;
  totalBooks: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
};

export const Pagination = ({
  booksPerPage,
  totalBooks,
  setCurrentPage,
  currentPage,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <nav>
      <ul className="list-style-none flex justify-center space-x-2">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a
              onClick={(e) => paginate(number, e)}
              href="!#"
              className="page-link flex items-center justify-center text-body box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm w-9 h-9 focus:outline-none"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};