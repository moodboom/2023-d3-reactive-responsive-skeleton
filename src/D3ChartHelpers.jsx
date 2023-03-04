export const cleanChart = divChart => {
  while (divChart.firstChild) {
    divChart.removeChild(divChart.firstChild);
  }
}

export const replaceChart = ( divChart, chartSvg ) => {
  cleanChart( divChart );
  divChart.append( chartSvg );
}

export const fetchChartData = async url => {
  return new Promise(resolve => {
    fetch(
      url,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
    .then(function(response){
      return response.json();
    })
    .then(function(loadedData) {
      resolve( loadedData );
    });
  });
}