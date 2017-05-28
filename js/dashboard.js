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

function updateChart(chart) {
  $.get('/consulta/dashboard', function (consumos) {
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
          borderColor: getRandomColor()
        });
      } else {
        dataset[index].data.push(consumo.quantidade);
      }
    });
    console.log(times, dataset);
    chart.data.labels = times;
    chart.data.datasets = dataset;
    chart.update();
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
  updateChart(chart);
  window.setInterval(function () {
    updateChart(chart);
  }, 10000);
}

if (dashboardTotalElement) {
  new Chart(dashboardTotalElement, {
    type: 'bar',
    data: {
      labels: (function () {
        var labels = [];
        ['Ap203', 'Ap204', 'Ap205'].forEach(function (i) {
          labels.push(i);
        });
        return labels;
      }()),
      datasets: [{
        label: 'Apartamentos',
        data: [40, 45, 33],
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 0.2)'
      }]
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
}