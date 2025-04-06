import Header from "../../components/Header";
import {
  Card,
  CardContent,
  List,
  Typography,
  Grid,
} from "@mui/material";
import WDCImage from "../../image/WDC.jpg";

const cards = [
  {
    title: "Women's Day Celebration",
    bgImage: WDCImage, 
  },
];

const Event = () => {
  return (
    <div
      style={{
        height: 500,
        marginRight: "60px",
        paddingTop: "90px", 
        marginLeft: "5%",
      }}
    >
      <Header title="EVENTS" subtitle="Org Yearly Events" />

      <Grid container spacing={2}>
        {cards.map(({ title, icon, bgImage }) => (
          <Grid item key={title} xs={12} sm={6} md={3}>
            <Card
              sx={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 3,
                boxShadow: 3,
                p: 2,
                textAlign: "center",
                color: "#fff",
                height: 200, 
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent>
                <List>
                  <Typography variant="h6" fontWeight="bold">
                    {title}
                  </Typography>
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Event;
