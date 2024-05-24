import Box from "@mui/material/Box";
import CardComponent from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Card({ ...rest }) {
  return (
    <CardComponent sx={{ display: "flex" }} className="hover:scale-105">
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={rest.image}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "10 auto" }}>
          <Typography component="div" variant="h5">
            {rest.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {rest.description}
          </Typography>
        </CardContent>
      </Box>
    </CardComponent>
  );
}
