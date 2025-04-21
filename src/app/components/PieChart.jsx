import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function PieChartData({ transactions }) {



  // Prepare data for the pie chart
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieChartData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = [
    '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
    '#82CA9D', '#F06292', '#BA68C8', '#4DB6AC', '#FFB74D'
  ];
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  // Custom legend formatter to show percentage
  const renderLegendText = (value, entry) => {
    const percentage = ((entry.payload.value / totalExpenses) * 100).toFixed(1);
    return `${entry.payload.name} (${percentage}% - $${entry.payload.value.toFixed(2)})`;
  };

  return (
    <div className="space-y-8">

      {pieChartData.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg text-gray-900 font-semibold mb-4">Expenses Summary</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  label={false}
                  labelLine={false}
                  outerRadius={({ width }) => Math.min(width * 0.35, 120)}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `$${value.toFixed(2)}`}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px'
                  }}
                />
                <Legend 
                  formatter={renderLegendText}
                  layout="vertical"
                  align="center"
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontSize: '12px',
                    width: '100%',
                    maxHeight: '100px',
                    overflowY: 'auto'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}