import './ChartPage.scss'
import { useState, useEffect, useRef } from 'react'
import { Button, ToggleButton } from 'react-bootstrap';

import { D3Chart } from './D3Chart'

// -------------------
// To add a new chart:
// -------------------
//
//  1) create a new chart component module in the /src/charts folder by copying an existing one
//  2) paste Observable chart example code into it; see https://observablehq.com/@d3/gallery
//  3) import the chart module here
//  4) add a chart to the charts array (just below the imports)
//  5) save chart data from the Observables example into the /public folder
//  6) test and tweak any issues
//
// See /src/charts comments for example tweaks you might need, they should be very mimimal.
// -------------------
import { BarchartHorizontalLoad, BarchartHorizontalDraw } from './charts/BarchartHorizontal'
import { MultiSeriesLineLoad, MultiSeriesLineDraw } from './charts/MultiSeriesLine'
import { ZoomableSunburstLoad, ZoomableSunburstDraw } from './charts/ZoomableSunburst'
import { BollingerChartLoad, BollingerChartDraw } from './charts/BollingerChart'
import { SankeyChartLoad, SankeyChartDraw } from './charts/SankeyChart'
import { StackedSteamgraphLoad, StackedSteamgraphDraw } from './charts/StackedSteamgraph'
import { TreemapLoad, TreemapDraw } from './charts/Treemap'
import { CirclePackingLoad, CirclePackingDraw } from './charts/CirclePacking'
import { CollapsibleTreeLoad, CollapsibleTreeDraw } from './charts/CollapsibleTree'
// import { VoroniLabelsLoad, VoroniLabelsDraw } from './charts/VoroniLabels'

export const ChartPage = () => {

  const charts = [
    {
      id: 'BarchartHorizontal',
      options: {
        x: d => d.frequency,
        y: d => d.letter,
        xFormat: "%",
        xLabel: "Frequency →",
        color: "steelblue"
      },
      chartLoadFunction: BarchartHorizontalLoad,
      chartDrawFunction: BarchartHorizontalDraw,
      chartResizeFunction: BarchartHorizontalDraw,
    },
    {
      id: 'MultiSeriesLine',
      options: {
        x: d => d.date,
        y: d => d.unemployment,
        z: d => d.division,
        yLabel: "↑ Unemployment (%)",
        color: "steelblue",
        voronoi: false // if true, show Voronoi overlay
      },
      chartLoadFunction: MultiSeriesLineLoad,
      chartDrawFunction: MultiSeriesLineDraw,
      chartResizeFunction: MultiSeriesLineDraw,
    },
    {
      id: 'ZoomableSunburst',
      chartLoadFunction: ZoomableSunburstLoad,
      chartDrawFunction: ZoomableSunburstDraw,
      chartResizeFunction: ZoomableSunburstDraw,
    },
    {
      id: 'BollingerChart',
      options: {
        x: d => d.date,
        y: d => d.close,
        N: 24, // number of periods, per input above (in Observables)
        K: 2.5, // number of standard deviations, per input above (in Observables)
        yLabel: "↑ Daily close ($)",
      },
      chartLoadFunction: BollingerChartLoad,
      chartDrawFunction: BollingerChartDraw,
      chartResizeFunction: BollingerChartDraw,
    },
    {
      id: 'SankeyChart',
      options: {
        nodeAlign: 'justify', // e.g., d3.sankeyJustify; set by input above (in Observables)
        linkColor: 'source-target', // e.g., "source" or "target"; set by input above (in Observables)
        // MDM moved to within chart code so we don't have to import D3 here
        // nodeGroup: d => d.id.split(/\W/)[0], // take first word for color
        // format: (f => d => `${f(d)} TWh`)(d3.format(",.1~f")),
      },
      chartLoadFunction: SankeyChartLoad,
      chartDrawFunction: SankeyChartDraw,
      chartResizeFunction: SankeyChartDraw,
    },
    {
      id: 'StackedSteamgraph',
      options: {
        x: d => d.date,
        y: d => d.unemployed,
        z: d => d.industry,
        yLabel: "↑ Unemployed persons",
      },
      chartLoadFunction: StackedSteamgraphLoad,
      chartDrawFunction: StackedSteamgraphDraw,
      chartResizeFunction: StackedSteamgraphDraw,
    },
    {
      id: 'Treemap',
      options: {
        path: d => d.name.replace(/\./g, "/"), // e.g., "flare/animate/Easing"
        value: d => d?.size, // size of each node (file); null for internal nodes (folders)
        group: d => d.name.split(".")[1], // e.g., "animate" in "flare.animate.Easing"; for color
        label: (d, n) => [...d.name.split(".").pop().split(/(?=[A-Z][a-z])/g), n.value.toLocaleString("en")].join("\n"),
        title: (d, n) => `${d.name}\n${n.value.toLocaleString("en")}`, // text to show on hover
        link: (d, n) => `https://github.com/prefuse/Flare/blob/master/flare/src${n.id}.as`,
        // tile, // e.g., d3.treemapBinary; set by input above (in Observables)
      },
      chartLoadFunction: TreemapLoad,
      chartDrawFunction: TreemapDraw,
      chartResizeFunction: TreemapDraw,
    },
    {
      id: 'CirclePacking',
      options: {
        value: d => d.size, // size of each node (file); null for internal nodes (folders)
        label: (d, n) => [...d.name.split(/(?=[A-Z][a-z])/g), n.value.toLocaleString("en")].join("\n"),
        title: (d, n) => `${n.ancestors().reverse().map(({data: d}) => d.name).join(".")}\n${n.value.toLocaleString("en")}`,
        link: (d, n) => n.children
          ? `https://github.com/prefuse/Flare/tree/master/flare/src/${n.ancestors().reverse().map(d => d.data.name).join("/")}`
          : `https://github.com/prefuse/Flare/blob/master/flare/src/${n.ancestors().reverse().map(d => d.data.name).join("/")}.as`,
      },
      chartLoadFunction: CirclePackingLoad,
      chartDrawFunction: CirclePackingDraw,
      chartResizeFunction: CirclePackingDraw,
    },    
    {
      id: 'CollapsibleTree',
      chartLoadFunction: CollapsibleTreeLoad,
      chartDrawFunction: CollapsibleTreeDraw,
      chartResizeFunction: CollapsibleTreeDraw,
    },
    // Needs responsive work, see charts/VoroniLabels.jsx
    // {
    //   id: 'VoroniLabels',
    //   chartLoadFunction: VoroniLabelsLoad,
    //   chartDrawFunction: VoroniLabelsDraw,
    //   chartResizeFunction: VoroniLabelsDraw,
    // },
  ];
  // ------------------------------------------------------------


  const refCharts = useRef(null);

  const [chartsWidth, setChartsWidth] = useState(0);
  const [chartsHeight, setChartsHeight] = useState(0);
  const [showChart, setShowChart] = useState(charts.map( c => c.id ));

  // MDM NOTE we MUST perform this state change along with w/h in one JavaScript tick.
  // We can't debounce as that will cause state changes to cascade.
  // Should be fine, we just need to ensure FAST redraws on resizes.
  // const [resize, setResize] = useDebounce( false, responsiveDebounceTimeout );
  const [resize, setResize] = useState(false);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    // ---------------------
    // component constructor
    // ---------------------
    const setDimFromRef = aRef => {
      setChartsWidth(aRef.current.clientWidth);
      setChartsHeight(aRef.current.clientHeight);
    };

    function handleWindowResize() {
      setDimFromRef(refCharts);
      setResize(true);
    }
    window.addEventListener('resize', handleWindowResize);

    setDimFromRef(refCharts);

    // ---------------------
    // component destructor
    // ---------------------
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
    // ---------------------
  }, []);

  const ChartButton = params => {
    const { id } = params;
    const makeLabel = id => id.replace(/[A-Z]/g, str => ` ${str}`);
    return (
      <ToggleButton
        className="chartButton text-nowrap"
        id={id}
        type="checkbox"
        variant="outline-primary"
        size="sm"
        checked={showChart.includes(id)}
        value="1"
        onChange={(e) => setShowChart(
          e.currentTarget.checked
          ? [ ...showChart, id ]
          : showChart.filter( c => c !== id )
        )}
      >
        {makeLabel( id )}
      </ToggleButton>
    );
  }

  let cellWidth = 0, cellHeight = 0;
  if ( chartsWidth ) {
    // Calculate grid dimensions based on number of visible charts and a reasonable target aspect ratio.
    const chartCount = showChart.length;
    const aspectRatio = chartsWidth / chartsHeight;
    const targetAspectRatio = 16 / 9;
    const normalizedAspectRatio = aspectRatio / targetAspectRatio;
    const rows = Math.max(1,Math.floor(Math.sqrt(chartCount/normalizedAspectRatio)));
    const cols = Math.ceil( chartCount / rows );
    cellWidth = chartsWidth / cols;
    cellHeight = chartsHeight / rows;

    // Now set the grid accordingly, and let the browser do the layout.
    document.getElementById('chartGrid').style.setProperty('grid-template-columns', '1fr '.repeat( cols ));
    document.getElementById('chartGrid').style.setProperty('grid-template-rows', '1fr '.repeat( rows ));
  } 

  return (
    <main>
      <div className='chartAndControlsFlex'>
        <div className='buttonContainer'>
          <Button
            variant='link'
            onClick={(e) => setShowChart( charts.map( c => c.id ))}
          >
            All
          </Button>
          { charts.map( c =>
            <ChartButton
              id={c.id}
              key={c.id}
            />
          )}
          <Button
            variant='link'
            onClick={(e) => setShowChart([])}
          >
            None
          </Button>
        </div>
        <div id='chartGrid' className='chartGrid' ref={refCharts}>
          { charts.map( c =>
            showChart.includes(c.id) ?
              <D3Chart
                id={`chart-${c.id}`}
                key={c.id}
                width={cellWidth}
                height={cellHeight}
                resize={resize}
                reload={reload}
                options={c.options}
                chartLoadFunction={c.chartLoadFunction}
                chartDrawFunction={c.chartDrawFunction}
                chartResizeFunction={c.chartResizeFunction}
              />
              : null
          )}
        </div>
      </div>
    </main>
  );
}
