import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// interface Data {
//     name: string
//     symbol: string
//     timeFrame: string
//     buy?: string
//     sell?: string
//     profit: string
//     profitPercent: string
// }

const data = [
    {
        name: "Bot 1",
        symbol: "bnb",
        timeFrame: "01-01-2021 11:00",
        buy: "5000",
        sell: "10000",
        profit: "5000",
        profitPercent: "50",

    },
    {
        name: "Bot 2",
        symbol: "bnb",
        timeFrame: "01-01-2021 11:00",
        buy: "5000",
        sell: "10000",
        profit: "5000",
        profitPercent: "50",

    },
    {
        name: "Bot 3",
        symbol: "bnb",
        timeFrame: "01-01-2021 11:00",
        buy: "5000",
        sell: "10000",
        profit: "5000",
        profitPercent: "50",

    },
    {
        name: "Bot 4",
        symbol: "bnb",
        timeFrame: "01-01-2021 11:00",
        buy: "5000",
        sell: "10000",
        profit: "5000",
        profitPercent: "50",

    },
    {
        name: "Bot 5",
        symbol: "bnb",
        timeFrame: "01-01-2021 11:00",
        buy: "5000",
        sell: "10000",
        profit: "5000",
        profitPercent: "50",

    },
    {
        name: "Bot 6",
        symbol: "bnb",
        timeFrame: "01-01-2021 11:00",
        buy: "5000",
        sell: "10000",
        profit: "5000",
        profitPercent: "50",

    },
    {
        name: "Bot 7",
        symbol: "bnb",
        timeFrame: "01-01-2021 11:00",
        buy: "5000",
        sell: "10000",
        profit: "5000",
        profitPercent: "50",

    },
]



export default function Overview() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <TableContainer sx={{ minHeight: 420, maxHeight: 420}}>
                <Table 
                    aria-label="sticky table" stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Symbol</TableCell>
                            <TableCell align="center">Time Frame</TableCell>
                            <TableCell align="center">BUY</TableCell>
                            <TableCell align="center">SELL</TableCell>
                            <TableCell align="center">Profit</TableCell>
                            <TableCell align="center">Profit(%)</TableCell>
                        </TableRow>
                    </TableHead >
                    <TableBody>
                        {data.map((row, i) => (
                            <TableRow
                                key={i}
                            >
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.symbol.toLocaleUpperCase()}</TableCell>
                                <TableCell align="center">{row.timeFrame}</TableCell>
                                <TableCell align="right">{row.buy}</TableCell>
                                <TableCell align="right">{row.sell}</TableCell>
                                <TableCell align="right">{row.profit}</TableCell>
                                <TableCell align="right">{row.profitPercent}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                // rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
