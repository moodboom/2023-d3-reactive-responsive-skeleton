# 2023 D3 Reactive Responsive skeleton

A skeleton project with several Observable D3 examples presented as responsive charts.  More chart patches welcome!

<p align="center">
    <a href="https://bitpost.com/news/2023/2023-d3-reactive-responsive-skeleton/">
        <img src="https://raw.github.com/moodboom/2023-d3-reactive-responsive-skeleton/master/resources/screenshot-2023-03-04.png" alt="2023-d3-reactive-responsive-skeleton" />
    </a>
</p>

## Installing

```bash
cd 2023-d3-reactive-responsive-skeleton
npm install
npm run dev
```

## Documentation

This skeleton is minimal by design.  You are encouraged to directly browse the code and play with the chart data and options.

That said, the project attempts to use best practices of <a href="https://vitejs.dev/">Vite</a>, <a href="https://reactjs.org/">React</a>, <a href="https://reactrouter.com">React Router</a>, <a href="https://react-bootstrap.github.io/">React Bootstrap</a>, and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout">CSS layout using grid/flex</a>, as of the time of creation.  I may update these dependencies as the world churns on (as it always does).

## Contributing your favorite chart example

It's so easy!

1 create a new chart component module in the /src/charts folder by copying an existing one
2 paste Observable chart example code into it; see https://observablehq.com/@d3/gallery
3 import the chart module in src/ChartPage.jsx
4 add a chart to the charts array in src/ChartPage.jsx
5 save chart JSON data from the Observables example into the /public folder
6 test and tweak any issues

If you need help getting your chart working, take a look at the existing /src/charts/* modules.  Any minor tweaks to the original Observable code are commented there, and a link to the original is provided with the copyright notice.

## TODO

* more chart examples!
* borders on charts, maybe
* skeleton improvements, maybe
* your suggestions
