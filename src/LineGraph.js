import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
function LineGraph() {
  const [data, setData] = useState({});
  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];

    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          let chartData = buildChartData(data, "cases");
          setData(chartData);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>graph</h1>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                data: data,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default LineGraph;
