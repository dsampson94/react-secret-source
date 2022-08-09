import { useEffect, useState } from 'react';
import { zoomIdentity } from 'd3';

import { BTC, DOGE, ETH, REACT, USDC } from '../../tools/general/system-variables.util';
import {
  chartContainerString,
  ChartString,
  lineString,
  SynchronizedLineChartString,
  toolTipDotString,
  toolTipText,
  useDimensionsString,
  xAxisString,
  yAxisString
} from '../../tools/code/ChartCodeStrings';

import ContentContainer from '../../tools/components/content-container/ContentContainer';
import ArticleContainer from '../../tools/components/article-container/ArticleContainer';
import SynchronizedLineChart from '../../tools/components/chart/SynchronizedLineChart';
import CodeViewer from '../../tools/components/code-viewer/CodeViewer';

import { getBitconData, getDogeCoinData, getEthereumData, getUSDCData } from '../api/chart';

import styles from '../../styles/pages.module.scss';

export default function synchronizedlinecharts() {

  const [currentGlobalZoomState, setCurrentGlobalZoomState] = useState(zoomIdentity);
  const [currentYZoomState, setCurrentYZoomState] = useState(zoomIdentity);
  const [currentXZoomState, setCurrentXZoomState] = useState(zoomIdentity);
  const [hoverActive, setHoverActive] = useState(false);
  const [date, setDate] = useState(null);

  return (
    <ContentContainer view={ REACT }
                      showClientsSideBar={ true }>
      <ArticleContainer>
        <h1>{ 'Synchronized Line Charts with D3.js and React' }</h1>

        <ChartContainer currentGlobalZoomState={ currentGlobalZoomState }
                        setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                        currentYZoomState={ currentYZoomState }
                        setCurrentYZoomState={ setCurrentYZoomState }
                        currentXZoomState={ currentXZoomState }
                        setCurrentXZoomState={ setCurrentXZoomState }
                        hoverActive={ hoverActive }
                        setHoverActive={ setHoverActive }
                        date={ date }
                        setDate={ setDate } />

        <p>
          Hi there! Lets take a look at how we can build synchronized line charts with D3 and React.
          This example focuses on how we can write more legible D3 code and implement features using componentization.
          By sharing the zoom state, mouse pos and x axis between the charts we can synchronize key features including
          zoom, drag, pan and tooltip data accessors.
        </p>

        <p>
          First we make a container for the charts, 'ChartContainer' holds the zoom state and the mouse pos. Which in this example,
          is stored as 'date', the mouse position converted into the corresponding x axis date.
        </p>

        <p>
          Next we get some data and map it to a new list and then call each Line chart.
        </p>

        <CodeViewer codeString={ chartContainerString }
                    height={ '1000px' } />

        <p>
          SynchronizedLineChart.js is a clusterfuck at first glance, If you dont understand whats going on here, I would recommend looking
          up each D3 method with the <a href="https://github.com/d3/d3/blob/main/API.md"
                                        style={ { color: 'lightblue', textDecoration: 'underline' } }>docs</a>. There is also the
          useDimensions.js
          hook which is used for responsive resizing, scroll the browser zoom and you'll see it in action. I'll credit Swizec Teller for
          sharing this one, thank you!
        </p>

        <p>
          What is important here is how much better this reads to it's JSX-free counterpart. By componentizing our D3 code
          like this we can achieve a more elegant and maintainable solution. For example, when we want to make
          all the ToolTipDots red, we only need to make one change.
        </p>

        <CodeViewer codeString={ SynchronizedLineChartString }
                    height={ '1000px' } />

        <p>
          Next we use the 'Chart' component to implement our responsive useDimensions hook.
        </p>

        <CodeViewer codeString={ ChartString }
                    height={ '1000px' } />

        <p>
          Then we draw the x and y axes. Including the outer borders, grid lines, ticks and tick lines.
        </p>

        <CodeViewer codeString={ yAxisString }
                    height={ '1000px' } />

        <CodeViewer codeString={ xAxisString }
                    height={ '1000px' } />

        <p>
          Then comes the line.
        </p>

        <CodeViewer codeString={ lineString }
                    height={ '1000px' } />

        <p>
          Next we draw the tooltips. It is important to note here that each tooltip must calculate it's OWN x and y position on
          mouse move and this can be achieved by ensuring that we call a unique iteration of the component each time.
          This took me a full 5 days to figure out and it may look simple, but it always does once we have the solution!
        </p>

        <CodeViewer codeString={ toolTipDotString }
                    height={ '1000px' } />

        <CodeViewer codeString={ toolTipText }
                    height={ '1000px' } />

        <CodeViewer codeString={ useDimensionsString }
                    height={ '1000px' } />

        <div style={ { display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' } }>
          <a href="https://codesandbox.io/s/synchronized-line-charts-d3-react-2xzmrq?fontsize=14&hidenavigation=1&theme=dark">
            <img src={ 'https://codesandbox.io/static/img/play-codesandbox.svg' } alt={ 'synchronized line charts d3 + react' } />
          </a>
        </div>

      </ArticleContainer>
    </ContentContainer>
  );
}

const ChartContainer = ({
                          hoverActive,
                          setHoverActive,
                          currentGlobalZoomState,
                          setCurrentGlobalZoomState,
                          currentYZoomState,
                          setCurrentYZoomState,
                          currentXZoomState,
                          setCurrentXZoomState,
                          date,
                          setDate
                        }) => {

  const [bitcoinData, setBitcoinData] = useState(null);
  const [ethereumData, setEthereumData] = useState(null);
  const [USDCoinData, setUSDCoinData] = useState(null);
  const [dogeData, setDogeData] = useState(null);

  useEffect(() => {
    getBitconData().then(data => {
      const mappedList = data?.prices?.map(item => {
        return {
          x: new Date(item[0]),
          y: item[1]
        };
      });
      setBitcoinData(mappedList);
    });

    getEthereumData().then(data => {
      const mappedList = data?.prices?.map(item => {
        return {
          x: new Date(item[0]),
          y: item[1]
        };
      });
      setEthereumData(mappedList);
    });

    getUSDCData().then(data => {
      const mappedList = data?.prices?.map(item => {
        return {
          x: new Date(item[0]),
          y: item[1]
        };
      });
      setUSDCoinData(mappedList);
    });
    getDogeCoinData().then(data => {
      const mappedList = data?.prices?.map(item => {
        return {
          x: new Date(item[0]),
          y: item[1]
        };
      });
      setDogeData(mappedList);
    });
  }, []);

  return (
    <div className={ styles.chartContainer }>
      <div className={ styles.topCharts }>
        <SynchronizedLineChart chartName={ BTC }
                               data={ bitcoinData }
                               hoverActive={ hoverActive }
                               setHoverActive={ setHoverActive }
                               currentGlobalZoomState={ currentGlobalZoomState }
                               setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                               currentYZoomState={ currentYZoomState }
                               setCurrentYZoomState={ setCurrentYZoomState }
                               currentXZoomState={ currentXZoomState }
                               setCurrentXZoomState={ setCurrentXZoomState }
                               date={ date }
                               setDate={ setDate } />

        <SynchronizedLineChart chartName={ ETH }
                               data={ ethereumData }
                               hoverActive={ hoverActive }
                               setHoverActive={ setHoverActive }
                               currentGlobalZoomState={ currentGlobalZoomState }
                               setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                               currentYZoomState={ currentYZoomState }
                               setCurrentYZoomState={ setCurrentYZoomState }
                               currentXZoomState={ currentXZoomState }
                               setCurrentXZoomState={ setCurrentXZoomState }
                               date={ date }
                               setDate={ setDate } />
      </div>

      <div className={ styles.bottomCharts }>
        <SynchronizedLineChart chartName={ USDC }
                               data={ USDCoinData }
                               hoverActive={ hoverActive }
                               setHoverActive={ setHoverActive }
                               currentGlobalZoomState={ currentGlobalZoomState }
                               setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                               currentYZoomState={ currentYZoomState }
                               setCurrentYZoomState={ setCurrentYZoomState }
                               currentXZoomState={ currentXZoomState }
                               setCurrentXZoomState={ setCurrentXZoomState }
                               date={ date }
                               setDate={ setDate } />

        <SynchronizedLineChart chartName={ DOGE }
                               data={ dogeData }
                               hoverActive={ hoverActive }
                               setHoverActive={ setHoverActive }
                               currentGlobalZoomState={ currentGlobalZoomState }
                               setCurrentGlobalZoomState={ setCurrentGlobalZoomState }
                               currentYZoomState={ currentYZoomState }
                               setCurrentYZoomState={ setCurrentYZoomState }
                               currentXZoomState={ currentXZoomState }
                               setCurrentXZoomState={ setCurrentXZoomState }
                               date={ date }
                               setDate={ setDate } />
      </div>
    </div>
  );
};
