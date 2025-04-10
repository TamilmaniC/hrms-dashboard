import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import ExposureOutlinedIcon from "@mui/icons-material/ExposureOutlined";
import DataUsageOutlinedIcon from "@mui/icons-material/DataUsageOutlined";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../App.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgCharts } from "ag-charts-community";

const Dashpage = () => {
  const [value, setValue] = useState(new Date());
  const navigate = useNavigate();
  const chartRef = useRef(null);

  const cards = [
    {
      title: "Employee",
      icon: <PeopleOutlineOutlinedIcon fontSize="large" />,
      path: "/employee",
      color: "#74b9ff",
    },
    {
      title: "Payroll",
      icon: <PaymentOutlinedIcon fontSize="large" />,
      path: "/payroll",
      color: "#55efc4",
    },
    {
      title: "Accounts",
      icon: <ExposureOutlinedIcon fontSize="large" />,
      path: "/accounts",
      color: "#f1c40f",
    },
    {
      title: "Report",
      icon: <DataUsageOutlinedIcon fontSize="large" />,
      path: "/reports",
      color: "#ff7675",
    },
  ];

  function getData() {
    return [
      { country: "Payroll", population: 50000 },
      { country: "Department", population: 2000 },
      { country: "Gross Salary", population: 30000 },
      { country: "Total Employes", population: 2500 },
    ];
  }

  useEffect(() => {
    const data = getData();

    if (chartRef.current && chartRef.current.firstChild) {
      chartRef.current.innerHTML = "";
    }

    const usdShortFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });

    const options = {
      container: chartRef.current,
      series: [
        {
          data,
          type: "pie",
          calloutLabelKey: "country",
          angleKey: "population",
          sectorLabel: {
            formatter: ({ datum }) =>
              usdShortFormatter.format(datum.population),
          },
          tooltip: {
            renderer: ({ datum }) => ({
              title: datum.country,
              content: `Value: ${usdShortFormatter.format(datum.population)}`,
            }),
          },
        },
      ],
      legend: {
        enabled: false,
      },
    };

    AgCharts.create(options);
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={2} px={8} py={12}>
      <Typography variant="h5">Welcome Tamilmani!</Typography>
      <Typography variant="body1">
        Measure how fast you're growing Monthly Recurring Revenue. Learn More
      </Typography>

      <Grid container spacing={38}>
        {cards.map(({ title, icon, path, color }) => (
          <Grid item key={title} xs={12} sm={6} md={2}>
            <Card
              onClick={() => navigate(path)}
              sx={{
                height: "140px",
                width: "250px",
                borderRadius: 2,
                boxShadow: 2,
                p: 2,
                mt: 3,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: color,
                color: "#fff",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <List>
                  <ListItem sx={{ justifyContent: "center" }}>
                    <ListItemIcon sx={{ fontSize: 60, color: "#fff" }}>
                      {icon}
                    </ListItemIcon>
                  </ListItem>
                  <Typography variant="h6">{title}</Typography>
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mt={8}
        gap={5}
        flexWrap="wrap"
      >
        <Card
          sx={{
            flex: 1,
            minWidth: "300px",
            height: "500px", 
            boxShadow: 3,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", 
            p: 2, 
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Organization Payroll Details
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Diversification of Payroll
            </Typography>
            <Box
              ref={chartRef}
              id="myChart"
              sx={{
                width: "100%",
                height: "420px",
                mt: 2,
              }}
            />
          </CardContent>
        </Card>

        <Box
          sx={{
            minWidth: "300px",
            maxWidth: "400px",
            background: "linear-gradient(135deg, #2196f3, #21cbf3)",
            borderRadius: 2,
            p: 2,
            boxShadow: 3,
          }}
        >
          <Calendar onChange={setValue} value={value} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashpage;
