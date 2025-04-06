import React, { useMemo, useState, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Header from "../../components/Header";
import hrmsData from "../../data/hrmsData.json";
import { Card, CardContent, Grid2, List, Typography } from "@mui/material";
import { Box } from "@mui/system";

ModuleRegistry.registerModules([AllCommunityModule]);

const cards = [
  { title: "Total Payroll", value: "82,441" },
  { title: "Total Department", value: "6" },
  { title: "Gross Salary", value: "67,454" },
  { title: "Accuracy Rate", value: "97%" },
  { title: "Total Headcount", value: "626" },
];

const Payroll = () => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    setRowData(hrmsData.payroll);
  }, []);

  const [columnDefs] = useState([
    { field: "id" },
    { field: "name" },
    { field: "department" },
    { field: "basicSalary" },
    { field: "allowances" },
    { field: "deductions" },
    { field: "tax" },
    { field: "netSalary" },
    { field: "status" },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
    };
  }, []);

  return (
    <Box
      sx={{
        height: 320,
        marginRight: "60px",
        paddingTop: "90px", 
        marginLeft: "5%",
      }}
    >
      <Header title="PAYROLL" subtitle="Welcome to Org Payroll!" />
      <Grid2
        container
        display= "flex"
        justifyContent= "space-between"
        mt="3px"
      >
        {cards.map(({ title, value }) => (
          <Grid2 xs={12} sm={6} md={2}>
            <Card
              sx={{
                width: "180px",
                height: "120px",
                background: "#fff",
                borderRadius: 3,
                boxShadow: 3,
                p: 2,
                textAlign: "center",
                mb: "30px", 
              
              }}
            >
              <CardContent>
                <List>
                  <Typography variant="h6" fontWeight="bold">
                    {title}
                  </Typography>
                  <Typography variant="h6" fontWeight="">
                    {value}
                  </Typography>
                </List>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />
    </Box>
  );
};

export default Payroll;
