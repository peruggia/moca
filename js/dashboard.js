var Chart = require('chart.js'),
  $ = require('jquery'),
  dashboardElement = document.querySelector('#dashboard'),
  dashboardTotalElement = document.querySelector('#dashboard-total');

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateChart(chart, consumos) {
  console.log(consumos);
  var times = [],
    dataset = [],
    index;
  consumos.forEach(function (consumo) {
    times.push(consumo.time);
    index = -1;
    dataset.forEach(function (currentDataset, i) {
      if (currentDataset.label === consumo.nome) {
        index = i;
      }
    });
    if (index < 0) {
      dataset.push({
        label: consumo.nome,
        data: [consumo.quantidade],
        fill: false,
        borderColor: '#FF0000'
      });
    } else {
      dataset[index].data.push(consumo.quantidade);
    }
  });
  console.log(times, dataset);
  chart.data.labels = times;
  chart.data.datasets = dataset;
  chart.update();
}

function updateChartTotal(chart, consumos) {
  console.log(consumos);
  var times = [],
    dataset = [],
    index;
  consumos.forEach(function (consumo) {
    times.push(consumo.nome);
    dataset.push({
      label: consumo.nome,
      data: [consumo.total],
      fill: true,
      backgroundColor: '#FF0000'
    });
  });
  console.log(times, dataset);
  chart.data.labels = times;
  chart.data.datasets = dataset;
  chart.update();
}

function loadChartData(chart) {
  $.get('/consulta/dashboard', function (consumos) {
    updateChart(chart, consumos);
  });
}

if (dashboardElement) {
  var chart = new Chart(dashboardElement, {
    type: 'line',
    data: {
      labels: [],
      datasets: []
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  loadChartData(chart);
  window.setInterval(function () {
    loadChartData(chart);
  }, 10000);
}

if (dashboardTotalElement) {
  if (!plotType || !plotData) {
    return;
  }
  var chart = new Chart(dashboardTotalElement, {
    type: plotType,
    data: {
      labels: [],
      datasets: []
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  if (plotType === 'line') {
    updateChart(chart, plotData);
  } else {
    updateChartTotal(chart, plotData);
  }
}