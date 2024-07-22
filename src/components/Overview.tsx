import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import TopCountries from "./TopCountries";
import { Grid } from "@mui/material";

const Overview = (props) => {
  const [countries, setCountries] = useState([]);
  const [threeBiggest, setThreeBiggest] = useState([]);
  const [threeSmallest, setThreeSmallest] = useState([]);
  const [totalPopulation, setTotalPopulation] = useState(0);
  const [mostPopulated, setMostPopulated] = useState([]);
  const [leastPopulated, setLeastPopulated] = useState([]);
  const [mostBorders, setMostBorders] = useState([]);
  const [leastBorders, setLeastBorders] = useState([]);
  const [ContinentsCountriesCount, setContinentsCountriesCount] = useState([]);

  useEffect(() => {
    if (props.data) {
      setCountries(props.data);
      console.log(props.data);
      setTotalPopulation(
        props.data.reduce((acc, country) => acc + country.population, 0)
      );

      const sortedByArea = props.data.sort((a, b) => b.area - a.area);
      // remove antarctica the second biggest
      setThreeBiggest(
        sortedByArea
          .slice(0, 4)
          .filter((country) => country.name.common !== "Antarctica")
      );

      setThreeSmallest(sortedByArea.slice(-3).reverse());

      const sortedByBorders = props.data
        .filter((country) => country.name.common !== "Antarctica")
        .sort((a, b) => b.borders?.length - a.borders?.length);
      setMostBorders(sortedByBorders.slice(0, 3));
      setLeastBorders(sortedByBorders.slice(-3));

      const sortedByPopulationDensity = props.data
        .filter(
          (country) =>
            country.population != 0 && country.name.common !== "Antarctica"
        )
        .sort((a, b) => b.population / b.area - a.population / a.area);
      setMostPopulated(sortedByPopulationDensity.slice(0, 3));
      setLeastPopulated(sortedByPopulationDensity.slice(-3));
      // invert the order to get the least populated
      setLeastPopulated(sortedByPopulationDensity.slice(-3).reverse());

      const continents = {};
      props.data.forEach((country) => {
        if (continents[country.region]) {
          continents[country.region] += 1;
        } else {
          continents[country.region] = 1;
        }
      });
      setContinentsCountriesCount(continents);

      console.log("biggest", threeBiggest);
      console.log("smallest", threeSmallest);
      console.log("total", totalPopulation);
      console.log("most populated", mostPopulated);
      console.log("least populated", leastPopulated);
      console.log("most borders", mostBorders);
      console.log("least borders", leastBorders);
      console.log("continents", ContinentsCountriesCount);
    } else if (props.error) {
      alert(props.error);
    }
  }, [props.data, props.error]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <h2>
          Total Population:{" "}
          {new Intl.NumberFormat("en-US").format(totalPopulation)}
        </h2>
      </Grid>
      <Grid item xs={6}>
        <PieChart
          style={{ fill: "white" }}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white !important",
              fontWeight: "bold",
              fontSize: 16,
            },
            text: {
              fill: "white !important",
              fontSize: 16,
            },
          }}
          series={[
            {
              arcLabel: (item) => `${item.label}`,
              arcLabelMinAngle: 45,

              data: [
                {
                  id: 0,
                  value: ContinentsCountriesCount["Africa"],
                  label: "Africa: " + ContinentsCountriesCount["Africa"],
                },
                {
                  id: 1,
                  value: ContinentsCountriesCount["Americas"],
                  label: "Americas: " + ContinentsCountriesCount["Americas"],
                },
                {
                  id: 2,
                  value: ContinentsCountriesCount["Asia"],
                  label: "Asia: " + ContinentsCountriesCount["Asia"],
                },
                {
                  id: 3,
                  value: ContinentsCountriesCount["Europe"],
                  label: "Europe: " + ContinentsCountriesCount["Europe"],
                },
                {
                  id: 4,
                  value: ContinentsCountriesCount["Oceania"],
                  label: "Oceania: " + ContinentsCountriesCount["Oceania"],
                },
              ],
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          width={600}
          height={300}
        />
      </Grid>
      <Grid item xs={4}>
        <TopCountries countries={threeBiggest} type="Biggest" />
      </Grid>
      <Grid item xs={4}>
        <TopCountries countries={threeSmallest} type="Smallest" />
      </Grid>
      <Grid item xs={4}>
        <TopCountries countries={mostPopulated} type="Most Populated" />
      </Grid>
      <Grid item xs={4}>
        <TopCountries countries={leastPopulated} type="Least Populated" />
      </Grid>

      <Grid item xs={4}>
        <TopCountries countries={mostBorders} type="With Most Borders" />
      </Grid>
      <Grid item xs={4}>
        <TopCountries countries={leastBorders} type="With Least Borders" />
      </Grid>
    </Grid>
  );
};

export default Overview;
