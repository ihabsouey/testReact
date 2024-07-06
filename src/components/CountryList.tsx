import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";
import { Grid, Container, TextField } from "@mui/material";

interface Country {
  flag: string;
  name: string;
  capital: string;
  population: number;
}

interface CountryData {
  flags: { png: string };
  name: { common: string };
  capital: string[];
  population: number;
}

const CountryList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState("");
  const { data, error } = useApi<CountryData[]>(
    "https://restcountries.com/v3.1/all"
  );

  useEffect(() => {
    if (data) {
      const rowData = data.map((country) => {
        return {
          flag: country.flags.png ? country.flags.png : "",
          name: country.name.common ? country.name.common : "",
          capital: country.capital ? country.capital[0] : "",
          population: country.population,
        };
      });
      setCountries(rowData);
      console.log(rowData);
    } else if (error) {
      alert(error);
    }
  }, [data, error]);

  const columnDefs: ColDef<Country>[] = [
    {
      field: "flag",
      width: 100,
      cellRenderer: (params: { value: string }) => (
        <img src={params.value.toString()} width="40" height="auto" />
      ),
    },
    {
      field: "name",
      width: 200,
      filter: "agMultiColumnFilter",
      editable: true,
    },
    {
      field: "capital",
      width: 150,
      filter: "agMultiColumnFilter",
      editable: true,
    },
    {
      field: "population",
      width: 200,
      type: "numberColumn",
      filter: "agNumberColumnFilter",
      editable: true,

      valueFormatter: (params: { value: number }) => {
        return new Intl.NumberFormat("en-US").format(params.value);
      },
    },
  ];

  return (
    <div>
      <Container maxWidth="lg" style={{ padding: "20px 0" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={5} style={{ textAlign: "left" }}>
            <h1>Countries List</h1>
            <br />
            <h3>
              Découvrez les pays du monde avec notre application React et
              TypeScript.
              <br /> Consultez la liste des pays avec leurs drapeaux, noms,
              capitales et populations dans un tableau interactif.
              <br /> Données fournies par l'API REST Countries."
            </h3>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={7} style={{ textAlign: "left" }}>
            <TextField
              label="Search Countries"
              variant="filled"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                backgroundColor: "white",
                borderRadius: "5px",
                height: "50px",
              }}
            />

            <div
              className="ag-theme-quartz-dark"
              style={{ height: "75vh", paddingTop: "15px" }}
            >
              <AgGridReact
                rowData={countries}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={15}
                quickFilterText={search}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CountryList;
