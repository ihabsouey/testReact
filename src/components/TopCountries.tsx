import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

const TopCountries: React.FC = (props) => {
  console.log(props);
  return (
    <Card
      sx={{
        backgroundColor: "#cfcfcf",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#fafafa",
          transition: "all 0.3s",
          transform: "scale(1.05)",
        },
        borderRadius: "30px",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          Top 3 {props.type} Countries
        </Typography>
        <List>
          {props.countries.map((country, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <img
                  width="50"
                  src={country.flags.png}
                  alt={country.name.common}
                />
              </ListItemAvatar>
              <ListItemText
                primary={country.name.common}
                secondary={
                  props.type === "Biggest" || props.type === "Smallest"
                    ? "Population: " +
                      new Intl.NumberFormat("en-US").format(country.area) +
                      " km²"
                    : props.type === "Most Populated" ||
                      props.type === "Least Populated"
                    ? "Population: " +
                      (country.population / country.area).toFixed(3) +
                      " persons/km²"
                    : "Borders: " + country.borders?.length
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
export default TopCountries;
