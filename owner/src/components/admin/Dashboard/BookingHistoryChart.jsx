import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BookingHistoryChart = ({ data }) => (
  <div className="card bg-base-100 shadow-xl ">
    <div className="card-body">
      <h2 className="card-title mb-4">Booking History (Last 30 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#0b8a33"
            fill="#4ade80"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default BookingHistoryChart;
