// This function creates a template for chart options
export const defaultOptions = (
  title: string,
  xaxisTitle: string,
  categories: any,
  yaxisFormatter: (val: number, opts?: any) => string | string[]
) => {
  return {
    title: {
      text: title,
      align: "center" as "left" | "center" | "right",
      margin: 12,
      style: {
        color: "#32383E",
        fontSize: "16px",
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      title: {
        text: xaxisTitle,
        style: {
          color: "#32383E",
        },
      },
      categories,
    },
    yaxis: {
      title: {
        text: "Energy consumption (Joules)",
        style: {
          color: "#32383E",
        },
      },
      labels: {
        formatter: yaxisFormatter,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        distributed: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
  };
};
