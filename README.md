# 2023 D3 Reactive Responsive skeleton

A skeleton project with several Observable D3 examples presented as responsive charts.  More chart patches welcome!

![](https://raw.github.com/moodboom/2023-d3-reactive-responsive-skeleton/master/resources/screenrecord-2023-03-04.gif)

## <a href="https://2023-d3-reactive-responsive-skeleton.netlify.app/">Live Demo</a>

## Installing

```bash
cd 2023-d3-reactive-responsive-skeleton
npm install
npm run dev
```

## Documentation

This skeleton is minimal by design.

The /src/charts folder contains several charts that were cut and pasted from Observables example code (with copyright attached) with mimimal tweaking.  You are encouraged to directly browse the code and play with the chart data and options.

That said, the project attempts to use best practices of <a href="https://vitejs.dev/">Vite</a>, <a href="https://reactjs.org/">React</a>, <a href="https://reactrouter.com">React Router</a>, <a href="https://react-bootstrap.github.io/">React Bootstrap</a>, SCSS, and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout">CSS layout using grid/flex</a>.  The goal is to give you a modern JavaScript framework with npm module support and page routing, responsiveness, hot-reloading, build tooling for tree shaking, polyfill.  I may update these dependencies as the world churns on (as it always does).

NOTE: I left SSR out for now.  It didn't feel like SSR was a standard, mature and simple core Vite feature yet.  I'll definitely revisit once I feel comfortable with it.  See:
* https://vitejs.dev/guide/ssr.html
* https://github.com/vitejs/awesome-vite#ssr

## Contributing your favorite chart example

It's so easy!

1. create a new chart component module in the /src/charts folder by copying an existing one
2. paste Observable chart example code into it; see https://observablehq.com/@d3/gallery
3. import the chart module in src/ChartPage.jsx
4. add a chart to the charts array in src/ChartPage.jsx
5. save chart JSON data from the Observables example into the /public folder
6. test and tweak any issues

If you need help getting your chart working, take a look at the existing /src/charts/* modules.  Any minor tweaks to the original Observable code are commented there, and a link to the original is provided with the copyright notice.

## TODO

* more chart examples!
* borders on charts, maybe
* skeleton improvements, maybe
* your suggestions

## Mission

I love D3 dearly, and that love came from browsing Mike Bostock's fantastic examples.  They have mostly been migrated to "Observable notebooks", which are great to teach and provide context.  But I'm a time-constrained dev and I needed a framework where I could quickly paste the example code and play with it live.  A framework that would also be a decent "Hello World" basis for starting a fuller single-page app.  That's the purpose of this skeleton.

## License
Copyright (c) 2023 Michael Behrns-Miller

Licensed under the MIT license.