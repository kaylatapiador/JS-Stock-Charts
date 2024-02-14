async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    let response = await fetch ('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=b742e35db638484fbd5ff01e2a4b0e16')
    let responseJson = await response.json()
    //console.log(responseJson)

    let GME = responseJson.GME
    let MSFT = responseJson.MSFT
    let DIS = responseJson.DIS
    let BNTX = responseJson.BNTX

    const stocks = [GME, MSFT, DIS, BNTX];

// Bonus Note: 
// Another way to write the above lines would to refactor it as:
   // const {GME, MSFT, DIS, BTNX} = result 
// This is an example of "destructuring" an object
// "Destructuring" creates new variables from an object or an array

    stocks.forEach(stock =>stock.values.reverse())

    //Time chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor:  getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    //Highest Stock Price
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                data:stocks.map(stock =>(highestStock(stock.values)) ),
                backgroundColor: stocks.map( stock =>(getColor(stock.meta.symbol))) ,
                borderColor:  stocks.map( stock =>(getColor(stock.meta.symbol))),
            }]
        }
    });
    

}

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

//looks for the highest stock within the arrray
function highestStock(stock){
    let highestStockNum = 0;
    stock.forEach(value => {
        if (highestStockNum < parseFloat(value.high))
        {
            highestStockNum = value.high
        }
    })
    return highestStockNum
}


main()