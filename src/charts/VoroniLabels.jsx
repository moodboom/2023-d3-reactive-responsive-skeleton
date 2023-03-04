import * as d3 from "d3";
import { fetchChartData } from '../D3ChartHelpers';

export const VoroniLabelsLoad = () => {
  return new Promise(resolve => {
    resolve( fetchChartData( 'VoroniLabels.json' ));
  });
}

// Based on Mike Bostock's "Voroni Labels" D3 example
// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/voronoi-labels
export const VoroniLabelsDraw = ( data, {
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
} = {}) => {

  // MDM the example assumed a 1:1 aspect ratio, using width for both width and height calcs.
  // We do not force a 1:1 aspect ratio, so we want to use the smaller of w/h for our dimension.
  // Get the maxWidth, and replace width with maxWidth in the voronoi call below.
  // const maxWidth = Math.min(width, height);

  // ----------------------------------------------------------------------
  // MDM paste Observables notebook code here, in proper (not "literate(sic) programming") order.
  // ----------------------------------------------------------------------

  const delaunay = d3.Delaunay.from(data);
  const voronoi = delaunay.voronoi([-1, -1, width + 1, height + 1]);
  const orient = ({
    top: text => text.attr("text-anchor", "middle").attr("y", -6),
    right: text => text.attr("text-anchor", "start").attr("dy", "0.35em").attr("x", 6),
    bottom: text => text.attr("text-anchor", "middle").attr("dy", "0.71em").attr("y", 6),
    left: text => text.attr("text-anchor", "end").attr("dy", "0.35em").attr("x", -6)
  });

  // ----------------------------------------------------------------------

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  voronoi.update();

  // ----------------------------------------------------------------------
  // MDM NOTE: Sadly, this example is not too responsive-friendly.
  // At smaller w/h, this cellPolygon call fails.
  // I believe it could use a data translation of the range to the domain.
  const cells = data.map((d, i) => [d, voronoi.cellPolygon(i)]);
  // ----------------------------------------------------------------------

  console.dir( cells[0] );
  voronoi.update();
  console.dir( cells[0] );

  svg.append("g")
      .attr("stroke", "orange")
    .selectAll("path")
    .data(cells)
    .join("path")
      .attr("d", ([d, cell]) => `M${d3.polygonCentroid(cell)}L${d}`);

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("d", voronoi.render());

  svg.append("path")
      .attr("d", delaunay.renderPoints(null, 2));

  svg.append("g")
      .style("font", "10px sans-serif")
    .selectAll("text")
    .data(cells)
    .join("text")
      .each(function([[x, y], cell]) {
        const [cx, cy] = d3.polygonCentroid(cell);
        const angle = (Math.round(Math.atan2(cy - y, cx - x) / Math.PI * 2) + 4) % 4;
        d3.select(this).call(angle === 0 ? orient.right
            : angle === 3 ? orient.top
            : angle === 1 ? orient.bottom
            : orient.left);
      })
      .attr("transform", ([d]) => `translate(${d})`)
      .attr("display", ([, cell]) => -d3.polygonArea(cell) > 2000 ? null : "none")
      .text((d, i) => i);

  return svg.node();
}