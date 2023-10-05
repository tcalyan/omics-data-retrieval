import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { I_GeneOmicStatisc, I_Omics } from "../Omics/Omics";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { sendRequest } from "../../api/omics/fetchData";
import { AxiosRequestConfig } from "axios";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { TablePaginationActions } from "./TablePaginationAction";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

function Row(props: { row: I_Omics }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const labels = [
    "exper-rep-mean",
    "exper-rep-median",
    "exper-rep-variance",
    "control-rep-mean",
    "control-rep-median",
    "control-rep-variance",
  ];
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `http://localhost:8080/omics/${row.id}/statistic`,
  };
  const experRep = {
    label: "Exper Rep 1 to 2",
    type: "line" as const,
    data: [row.exper_rep1, row.exper_rep2],
    backgroundColor: "rgba(26, 224, 104, 0.8)",
    borderColor: "rgb(39, 53, 74)",
    borderWidth: 1.7,
  };

  const controlRep = {
    label: "Control Rep 1 to 2",
    type: "line" as const,
    data: [row.control_rep1, row.control_rep2],
    backgroundColor: "rgba(188, 45, 136, 0.8)",
    borderColor: "rgb(39, 53, 74)",
    borderWidth: 1.7,
  };
  const barDataSet = {
    label: row.gene,
    type: "bar" as const,
    data: [0, 0, 0, 0, 0, 0],
    backgroundColor: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(255, 159, 64, 0.2)",
      "rgba(255, 205, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(153, 102, 255, 0.2)",
    ],
    borderColor: [
      "rgb(255, 99, 132)",
      "rgb(255, 159, 64)",
      "rgb(255, 205, 86)",
      "rgb(75, 192, 192)",
      "rgb(54, 162, 235)",
      "rgb(153, 102, 255)",
    ],
    borderWidth: 1,
  };

  React.useEffect(() => {
    sendRequest<I_GeneOmicStatisc>(config)
      .then((fetchedData: I_GeneOmicStatisc) => {
        SetChartData({
          labels,
          datasets: [
            Object.assign(barDataSet, {
              data: [
                fetchedData.exper_rep_mean,
                fetchedData.exper_rep_median,
                fetchedData.exper_rep_variance,
                fetchedData.control_rep_mean,
                fetchedData.control_rep_median,
                fetchedData.control_rem_variance,
              ],
            }),
            experRep,
            controlRep,
          ],
        });
      })
      .catch((error) => {});
  }, []);

  const [expRepStatisticalData, SetChartData] = React.useState({
    labels: labels,
    datasets: [experRep, controlRep, barDataSet],
  });

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.gene}
        </TableCell>
        <TableCell align="right">{row.exper_rep1}</TableCell>
        <TableCell align="right">{row.exper_rep2}</TableCell>
        <TableCell align="right">{row.control_rep1}</TableCell>
        <TableCell align="right">{row.control_rep2}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {row.gene}
              </Typography>
              <Chart
                width={500}
                height={250}
                type="bar"
                data={expRepStatisticalData}
              ></Chart>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props: { data: I_Omics[] | null }) {
  const { data } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [tableData, setTableData] = React.useState(data?.slice(0, 5));

  React.useEffect(() => {
    setTableData(data?.slice(0, 5) ?? undefined);
  }, [data]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setTableData(
      data?.slice(newPage * rowsPerPage, (newPage + 1) * rowsPerPage)
    );
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(rowsPerPage);
    setTableData(data?.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
    setPage(0);
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Gene</TableCell>
              <TableCell align="right">Exper Rep 1</TableCell>
              <TableCell align="right">Exper Rep 2</TableCell>
              <TableCell align="right">Control Rep 1</TableCell>
              <TableCell align="right">Control Rep 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={4}
                count={data ? data.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
