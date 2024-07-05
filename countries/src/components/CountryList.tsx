import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";
import { Grid, Container } from "@mui/material";

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
      width: 150,
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
    },
  ];

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={5}>
            <h1>Country List</h1>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={7}>
            <div className="ag-theme-quartz-dark" style={{ height: "80vh" }}>
              <AgGridReact
                rowData={countries}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={20}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CountryList;
