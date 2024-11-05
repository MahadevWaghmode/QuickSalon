import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, PieChart, Pie, Cell } from "recharts";
import { Box, Heading, Center } from "@chakra-ui/react";

// Sample revenue data for the line chart
const revenueData = [
  { month: "Jan", companyA: 400, companyB: 950 },
  { month: "Feb", companyA: 300, companyB: 350 },
  { month: "Mar", companyA: 500, companyB: 540 },
  { month: "Apr", companyA: 600, companyB: 660 },
  { month: "May", companyA: 400, companyB: 400 },
  { month: "Jun", companyA: 700, companyB: 700 },
];

// Sample pie chart data
const pieChartData = [
  { name: "Company A", value: 3000 },
  { name: "Company B", value: 4000 },
];

const colors = ["#8884d8", "#82ca9d"];

// RevenueChart component
const RevenueChart = () => {
  return (
    <Center py={10}>
      <Box boxShadow="lg" p={5} borderRadius="md" bg="white" mb={10}>
        <Heading as="h3" size="lg" mb={4} textAlign="center">
          Company Revenue Over Time
        </Heading>
        <LineChart width={600} height={300} data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="companyA" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="companyB" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </Box>

      <Box boxShadow="lg" p={5} borderRadius="md" bg="white">
        <Heading as="h3" size="lg" mb={4} textAlign="center">
          Company Revenue Distribution
        </Heading>
        <PieChart width={400} height={400}>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Box>
    </Center>
  );
}

export default RevenueChart;
