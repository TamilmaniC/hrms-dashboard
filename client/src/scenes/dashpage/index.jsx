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
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
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
    },
    {
      title: "Holidays",
      icon: <ThumbUpAltOutlinedIcon fontSize="large" />,
      path: "/holidays",
    },
    {
      title: "Events",
      icon: <CalendarMonthOutlinedIcon fontSize="large" />,
      path: "/events",
    },
    {
      title: "Payroll",
      icon: <PaymentOutlinedIcon fontSize="large" />,
      path: "/payroll",
    },
    {
      title: "Accounts",
      icon: <ExposureOutlinedIcon fontSize="large" />,
      path: "/accounts",
    },
    {
      title: "Report",
      icon: <DataUsageOutlinedIcon fontSize="large" />,
      path: "/reports",
    },
  ];

  const getData = () => [
    {
      type: "Manager",
      earnings: 954,
      earningsLower: 921,
      earningsUpper: 984,
    },
    {
      type: "Engineer",
      earnings: 844,
      earningsLower: 820,
      earningsUpper: 886,
    },
    {
      type: "Entrepreneur",
      earnings: 699,
      earningsLower: 615,
      earningsUpper: 784,
    },
    {
      type: "Lawyer",
      earnings: 503,
      earningsLower: 477,
      earningsUpper: 559,
    },
    {
      type: "Teacher",
      earnings: 501,
      earningsLower: 473,
      earningsUpper: 536,
    },
    {
      type: "Freelancer",
      earnings: 407,
      earningsLower: 315,
      earningsUpper: 481,
    },
    {
      type: "Doctor",
      earnings: 358,
      earningsLower: 314,
      earningsUpper: 399,
    },
  ];

  useEffect(() => {
    const data = getData();
  
    function getOpacity(value, key, minOpacity, maxOpacity) {
      const [min, max] = getDomain(key);
      let alpha = Math.round(((value - min) / (max - min)) * 10) / 10;
      return map(alpha, 0, 1, minOpacity, maxOpacity);
    }
  
    function getDomain(key) {
      const min = Math.min(...data.map((d) => d[key]));
      const max = Math.max(...data.map((d) => d[key]));
      return [min, max];
    }
  
    const map = (value, start1, end1, start2, end2) => {
      return ((value - start1) / (end1 - start1)) * (end2 - start2) + start2;
    };
  
    // ✅ Clear previous chart before creating a new one
    if (chartRef.current && chartRef.current.firstChild) {
      chartRef.current.innerHTML = "";
    }
  
    const options = {
      container: chartRef.current,
      autoSize: true,
      data,
      title: {
        text: "Weekly Earnings",
      },
      footnote: {
        text: "Source: HRMS Sample Data",
      },
      series: [
        {
          type: "bar",
          direction: "horizontal",
          xKey: "type",
          yKey: "earnings",
          cornerRadius: 4,
          errorBar: {
            yLowerKey: "earningsLower",
            yUpperKey: "earningsUpper",
          },
          label: {
            formatter: ({ value }) => `£${value.toFixed(0)}`,
          },
          itemStyler: ({ datum, yKey }) => ({
            fillOpacity: getOpacity(datum[yKey], yKey, 0.4, 1),
          }),
        },
      ],
      axes: [
        {
          type: "category",
          position: "left",
        },
        {
          type: "number",
          position: "bottom",
          title: {
            enabled: true,
            text: "£ / Week",
          },
          label: { formatter: ({ value }) => `£${value.toFixed(0)}` },
        },
      ],
    };
  
    AgCharts.create(options);
  }, []);
  
  return (
    <Box display="flex" flexDirection="column" gap={2} px={8} py={12}>
      <Typography variant="h5">Welcome Tamilmani!</Typography>
      <Typography variant="body1">
        Measure how fast you're growing Monthly Recurring Revenue. Learn More
      </Typography>

      <Grid container spacing={10}>
        {cards.map(({ title, icon, path }) => (
          <Grid item key={title} xs={12} sm={6} md={2}>
            <Card
              onClick={() => navigate(path)}
              sx={{
                width: "150px",
                background: "#fff",
                borderRadius: 3,
                boxShadow: 3,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <List>
                  <ListItem sx={{ justifyContent: "center" }}>
                    <ListItemIcon sx={{ fontSize: 40 }}>{icon}</ListItemIcon>
                  </ListItem>
                  <Typography variant="h6" fontWeight="bold">
                    {title}
                  </Typography>
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box >
        <div
          id="myChart"
          ref={chartRef}
          style={{ width: "50%", height: "400px" }}
        />
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <div className="calendar-wrapper">
            <Calendar onChange={setValue} value={value} />
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashpage;
