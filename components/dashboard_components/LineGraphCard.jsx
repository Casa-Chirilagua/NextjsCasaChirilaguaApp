import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Colors from '../../data/Colors';

function LineGraphCard({ bgColor, labelColor, data, lineKey, label }) {
    // Extract enrollment data and group by date
    const enrollmentData = data?.reduce((enrollments, student) => {

      const enrollmentDate = new Date(student.enrollment_date);
      const formattedDate = `${enrollmentDate.getMonth() + 1}/${enrollmentDate.getDate()}/${enrollmentDate.getFullYear().toString().slice(2)}`;

  
      if (enrollments[formattedDate]) {
        enrollments[formattedDate] += 1;
      } else {
        enrollments[formattedDate] = 1;
      }
  
      return enrollments;
    }, {});

      // Prepare data for the LineChart component
  const enrollmentChartData = Object.keys(enrollmentData).map((enrollmentKey) => ({
    date: enrollmentKey, // This will be your X-axis
    students: enrollmentData[enrollmentKey], // This will be your Y-axis
  }));
  return (
    <div style={{ bgColor }} className="line-chart-container">
      <h2 style={{ color: labelColor, paddingBottom: '1rem' }}>{label}</h2>
      <ResponsiveContainer width={'100%'} height="90%">
        <LineChart
          width={730}
          height={250}
          data={enrollmentChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          {/* <XAxis dataKey="date" />
          <YAxis dataKey="students"/> */}
          <XAxis dataKey="date" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={"students"}
            stroke={Colors['color-green']}
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineGraphCard;
