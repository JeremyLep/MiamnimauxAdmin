import React from "react";
import { useTable, usePagination } from "react-table";
import {Table} from 'reactstrap';

export const DateFormatter = (date) => {
    if (date == null) {
        return '';
    }

    return new Date(date).toLocaleDateString();
}

export const AgeFormatter = (date) => {
    let today = new Date();
    let birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return <span>{age} ans<br/>{DateFormatter(date)}</span>;
}

export const BadgeColored = (value, color) => {
    let classInfo = `text-center mb-2 mr-2 badge badge-pill badge-${color}`;

    return <div className={classInfo}>{value}</div>;
}

export const Paginated = ({ columns, data, fetchData, loading, pageCount: controlledPageCount, handleSearch }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow
    } = useTable(
        {
            columns,
            data,
            fetchData,
            loading,
            handleSearch,
            pageCount: controlledPageCount,
            manualPagination: true,
            initialState: { pageIndex: 0 }
        },
        usePagination
    );

    const { pageIndex, pageSize } = state;

    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

    return (
        <div>
            {loading ? (
                // Use our custom loading state to show a loading indicator
                <div colSpan="10000">Chargement...</div>
            ) : (
                <div className={'pull-right mb-3'} colSpan="10000">
                    <input type="text" name="search" placeholder={'Recherche...'} className={'form-control'} onChange={(e) => handleSearch(pageIndex, pageSize, e.target.value)}/>
                </div>
            )}
            <Table striped className="mb-0" {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                );
                            })}
                        </tr>
                    );
                })}
                </tbody>
            </Table>
            <div>
                <button className={'btn btn-secondary'} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<"}
                </button>{" "}
                <button className={'btn btn-secondary'} onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Précédent
                </button>{" "}
                <button className={'btn btn-secondary'} onClick={() => nextPage()} disabled={!canNextPage}>
                    Suivant
                </button>{" "}
                <button className={'btn btn-secondary'} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {">"}
                </button>{" "}
                <span className={'ml-3'}>
                Page{" "}
                    <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
            <select value={pageSize} className={'form-control w-auto d-inline mt-3 ml-3'}
                onChange={(e) => setPageSize(Number(e.target.value))}>
                {[5, 10, 25, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
            </div>
        </div>
    );
};