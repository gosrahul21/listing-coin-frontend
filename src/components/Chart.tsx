import { IChartApi, createChart } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import { priceSeries } from '../services/tokenService';


function Chart(props: {
    tokenId: string
}) {
    const [seriesData, setSeriesData] = useState<any[]>([]);
    const [chart, setChart] = useState<IChartApi>();
    const chartOptions = {
        layout: {
            background: { color: '#222' },
            textColor: '#DDD',
        },
        grid: {
            vertLines: { color: '#444' },
            horzLines: { color: '#444' },
        },
        timeScale: {
            timeVisible: true,
            secondsVisible: false,
        },
    };
    const containerRef = useRef<any>()

    useEffect(() => {
        const chart = createChart(containerRef.current as any, chartOptions);
        setChart(chart);
        chart.timeScale().fitContent();
        // }
        // }, 10000)
    }, [])

    useEffect(() => {
        if (!seriesData || !chart) return;
        const areaSeries = chart.addAreaSeries({
            lineColor: '#2962FF', topColor: '#2962FF',
            bottomColor: 'rgba(41, 98, 255, 0.28)',
        });
        areaSeries.setData(seriesData);

        // const candlestickSeries = chart.addCandlestickSeries({
        //     upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
        //     wickUpColor: '#26a69a', wickDownColor: '#ef5350',
        // });

        // Define start date
        // const startDate = new Date('2018-12-31');

        // Define initial values
        // let openPrice = 111.26;
        // let highPrice = 114.69;
        // let lowPrice = 85.66;
        // let closePrice = 111.26;

        // Create an array to store the generated data
        // const data = [];

        // Generate 100 data points
        // for (let i = 0; i < 100; i++) {
        //     // Generate a new date by adding one day to the previous date
        //     const currentDate = new Date(startDate);
        //     currentDate.setDate(currentDate.getDate() + i + 1);

        //     // Generate random price changes for the current day
        //     openPrice += Math.random() * 10 - 5;
        //     highPrice = Math.max(openPrice, highPrice + Math.random() * 5);
        //     lowPrice = Math.min(openPrice, lowPrice - Math.random() * 5);
        //     closePrice = Math.random() * (highPrice - lowPrice) + lowPrice;

        //     // Format the data and push it to the array
        //     data.push({
        //         time: currentDate.toISOString().split('T')[0],
        //         open: openPrice,
        //         high: highPrice,
        //         low: lowPrice,
        //         close: closePrice
        //     });
        // }

        // Output the generated data
        // console.log(data);

        // candlestickSeries.setData([
        //     { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
        //     { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
        //     { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
        //     { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
        //     { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
        //     { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
        //     { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
        //     { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
        //     { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
        //     { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
        // ]);

        // candlestickSeries.setData(data);
    }, [seriesData, chart]);

    useEffect(() => {
        getPriceSeries()
    }, []);

    const getPriceSeries = async () => {
        const { data, status } = await priceSeries(props.tokenId);

        if (status) {
            // Filter price history data for the last 7 days
            const priceData: { time: number, value: number }[] = data.priceHistory;

            setSeriesData(priceData.map(({value, time})=>({
                time: time/1000,
                value
            })));
            return seriesData;
        } else {
            // Handle error case
            console.error("Failed to fetch price series data");
            return [];
        }
    };

    // fetch token price 
    // get tokenprice, convert it to series and show 
    return <div ref={containerRef} id='firstContainer' className='w-full h-96' />
}

export default Chart;
