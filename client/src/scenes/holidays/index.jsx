import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import Header from "../../components/Header";
import { Card, CardContent, Grid, Typography } from "@mui/material";

ModuleRegistry.registerModules([AllCommunityModule]);

const cards = [
  {
    title: "01-01-2025",
    value: "New Year",
    subtitle: "Wednesday",
  },
  {
    title: "14-01-2025",
    value: "Pongal",
    subtitle: "Tuesday",
  },
];

const Holidays = () => {
  return (
    <div
      style={{
        height: 500,
        marginRight: "60px",
        paddingTop: "90px",
        marginLeft: "5%",
      }}
    >
      <Header title="HOLIDAYS" subtitle="Organisation Holidays Details" />

      <Grid container spacing={4}>
        {cards.map(({ title, subtitle, value }) => (
          <Grid item key={title} xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: 140,
                borderRadius: 2,
                boxShadow: 3,
                p: 2,
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  height: "100px",
                }}
              >
                <Typography variant="h6">{title}</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {value}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  {subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Holidays;
