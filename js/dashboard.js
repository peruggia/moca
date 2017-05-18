var Chart = require('chart.js'),
  dashboardElement = document.querySelector('#dashboard');

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

new Chart(dashboardElement, {
  type: 'line',
  data: {
    labels: (function () {
      var labels = [];
      [6, 7, 8, 9, 10, 11, 12].forEach(function (i) {
        labels.push(i + 'PM');
        labels.push(i + ':30PM');
      });
      return labels;
    }()),
    datasets: [{
      label: 'Ap203',
      data: (function () {
        var data = [];
        for (var i = 0; i < 14; i += 1) {
          data.push(getRandomArbitrary(5, 50));
        }
        return data;
      }()),
      fill: false,
      borderColor: '#11b0ff'
    },
    {
      label: 'Ap204',
      data: (function () {
        var data = [];
        for (var i = 0; i < 14; i += 1) {
          data.push(getRandomArbitrary(5, 50));
        }
        return data;
      }()),
      fill: false,
      borderColor: '#ff6211'
    },
    {
      label: 'Ap205',
      data: (function () {
        var data = [];
        for (var i = 0; i < 14; i += 1) {
          data.push(getRandomArbitrary(5, 50));
        }
        return data;
      }()),
      fill: false,
      borderColor: '#61ff77'
    }]
  }
});