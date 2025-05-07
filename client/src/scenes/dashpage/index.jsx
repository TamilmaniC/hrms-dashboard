import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
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
      value: "07",
      subtitle: "Absences",
      path: "/employee",
      color: { start: "#2980b9", end: "#3498db" },
    },
    {
      title: "Payroll",
      icon: <PaymentOutlinedIcon fontSize="large" />,
      value: "$12,000",
      subtitle: "This Month",
      path: "/payroll",
      color: { start: "#16a085", end: "#1abc9c" },
    },
    {
      title: "Accounts",
      icon: <ExposureOutlinedIcon fontSize="large" />,
      value: "$42,562",
      subtitle: "This Month",
      path: "/accounts",
      color: { start: "#ff9f43", end: "#feca57" },
    },
    {
      title: "Report",
      icon: <DataUsageOutlinedIcon fontSize="large" />,
      value: "52",
      subtitle: "Activities Logged",
      path: "/reports",
      color: { start: "#eb4d4b", end: "#ff7979" },
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
    <Box display="flex" flexDirection="column" gap={1} px={8} py={12}>
      <Typography variant="h5">Welcome Tamilmani!</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Measure how fast you're growing Monthly Recurring Revenue. Learn More
      </Typography>

      <Grid container spacing={2}>
        {cards.map(({ title, icon, path, color, subtitle, value }) => (
          <Grid item key={title} xs={12} sm={6} md={3}>
            <Card
              onClick={() => navigate(path)}
              sx={{
                height: 145,
                borderRadius: 5,
                boxShadow: 3,
                p: 2,
                cursor: "pointer",
                backgroundImage: `linear-gradient(135deg, ${color.start}, ${color.end})`,
                color: "#fff",
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
                <Box>{icon}</Box>
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
            boxShadow: 24,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" gutterBottom>
              Organization Payroll Details
            </Typography>
            <Typography variant="h6" gutterBottom>
              Diversification of Payroll
            </Typography>
            <Box
              ref={chartRef}
              id="myChart"
              sx={{
                width: "100%",
                height: "400px",
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
            borderRadius: 5,
            p: 1,
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
