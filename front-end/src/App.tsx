import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import DenseAppBar from "./components/UI/AppBar";
import CollapsibleTable from "./components/UI/Table";
import Grid from "@mui/material/Grid";
import LeftBar from "./components/UI/LeftBar";
import { sendRequest } from "./api/omics/fetchData";
import { I_Omics } from "./components/Omics/Omics";
import { Skeleton } from "@mui/material";
import { AxiosRequestConfig } from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Mui Support
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  const config: AxiosRequestConfig = {
    method: "POST",
    url: "http://localhost:8080/omics/list",
  };
  const [data, setData] = React.useState<I_Omics[] | null>(null);
  const [initialData, setInitialData] = React.useState<
    { id: string; name: string }[]
  >([]);
  React.useEffect(() => {
    sendRequest<I_Omics[]>(config)
      .then((fetchedData: I_Omics[]) => {
        setInitialData(
          fetchedData.map((elem) => {
            return { id: elem.id, name: elem.gene };
          })
        );
        setData(fetchedData);
      })
      .catch((error) => {});
  }, []);

  const handleFilterChange = (params: { filter: { ids?: string[] } }) => {
    const filterConfig: AxiosRequestConfig = {
      method: "POST",
      url: "http://localhost:8080/omics/list",
      data: params,
    };
    sendRequest<I_Omics[]>(filterConfig)
      .then((fetchedData: I_Omics[]) => {
        setData(fetchedData);
      })
      .catch((error) => {});
  };
  return (
    <>
      <DenseAppBar></DenseAppBar>
      <Box sx={{ flexGrow: 1, my: 5, mx: 5, height: "100%" }}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <LeftBar
              initialData={initialData}
              gene={data?.map((elem) => {
                return { id: elem.id, name: elem.gene };
              })}
              onChange={handleFilterChange}
            ></LeftBar>
          </Grid>
          <Grid item xs={10}>
            {data ? (
              <CollapsibleTable data={data}></CollapsibleTable>
            ) : (
              <>
                <Skeleton animation="wave" />
              </>
            )}
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
