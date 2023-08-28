
import React, { Component } from "react";
import Chart from "react-apexcharts";
import {Typography } from "antd";

const { Title, Paragraph } = Typography;

class EChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }

  render() {
    return (
      <>
      <div>
        <div className="mixed-chart">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            width="100%"
          />
        </div>
    </div>
    <div className="chart-vistior">
      <Title level={5}>Active Users</Title>
      <Paragraph className="lastweek">
        than last week <span className="bnb2">+30%</span>
      </Paragraph>
      <Paragraph className="lastweek">
        We have created multiple options for you to put together and customise
        into pixel perfect pages.
      </Paragraph>
   
    </div>
    </>
    );
  }
}

export default EChart;