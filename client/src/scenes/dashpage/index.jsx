import {
    Box,
    Card,
    CardContent,
    Grid2,
    List,
    ListItem,
    ListItemIcon,
    Typography,
  } from "@mui/material";
  import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
  import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
  import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
  import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
  import ExposureOutlinedIcon from "@mui/icons-material/ExposureOutlined";
  import DataUsageOutlinedIcon from "@mui/icons-material/DataUsageOutlined";
  
  const Dashpage = () => {
    const cards = [
      { title: "Users", icon: <PeopleOutlineOutlinedIcon fontSize="large" /> },
      { title: "Holidays", icon: <ThumbUpAltOutlinedIcon fontSize="large" /> },
      { title: "Events", icon: <CalendarMonthOutlinedIcon fontSize="large" /> },
      { title: "Payroll", icon: <PaymentOutlinedIcon fontSize="large" /> },
      { title: "Accounts", icon: <ExposureOutlinedIcon fontSize="large" /> },
      { title: "Report", icon: <DataUsageOutlinedIcon fontSize="large" /> },
    ];
  
    return (
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          px={8}
          paddingTop= "100px"
          marginLeft= "10px"
        >
          <Typography variant="h5">Welcome Tamilmani!</Typography>
          <Typography variant="body1">
            Measure how fast you're growing Monthly Recurring Revenue. Learn More
          </Typography>
  
          <Grid2 container spacing={3} paddingTop= "15px">
            {cards.map(({ title, icon }) => (
              <Grid2 item key={title} xs={12} sm={6} md={2}>
                <Card
                  sx={{
                    width: "135px",
                    background: "#fff",
                    borderRadius: 3,
                    boxShadow: 3,
                    p: 2,
                    textAlign: "center",
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
              </Grid2>
            ))}
          </Grid2>
        </Box>
    );
  };
  
  export default Dashpage;
  