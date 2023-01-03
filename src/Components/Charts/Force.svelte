<script>
	import { onMount } from 'svelte';
import continentsDataClean from '../../data/continentsDataClean.json';

import * as d3 from "d3";



import * as aq from "arquero";

export let width;
export let height;
export let year2;
export let year;


/*
let energyClean = energyData.map(d => { 
  var newd = {
    country : d.country,
    year : d.year,
    iso_code : d.iso_code,
    gdp : d.gdp,
    renewablesShare : d.renewables_share_energy,
    renewablesConsPerCap: d.renewables_energy_per_capita,
    renewablesGenPerCap: d.renewables_elec_per_capita,
    renewablesCons: d.renewables_consumption,
    renewablesConsChangePercPct: d.renewables_cons_change_pct,
    renewablesConsChangePercTwh: d.renewables_cons_change_twh 
}

  return newd;
}).filter((d) =>
    d.gdp >= 0 && d.renewablesShare >= 0 
    //&& d.year === parseInt(year) &&
    d.country !== "World"
  )
;
let energyCleanArq = aq.from(energyClean);
let continentsCleanArq = aq.from(continentsDataClean);
let joinedData = energyCleanArq.join_full(continentsCleanArq).objects()

//.filter(d=>d.year==2018)
*/
let length=joinedData.length;

console.log('def')
console.info(year,length)
const maxRadius = 40;
const margin = 100;

$ : xScale = d3.scaleBand()                
        .domain([...new Set(joinedData.filter(d=>d.year==year).map(d => d.renewablesConsPerCap))])
        .range([margin , width - margin]);

 const radiusScale = d3.scaleSqrt()
                .domain([0,d3.max(joinedData, d => d.gdp)])
                .range([0, maxRadius]);     

  const colorScale = d3.scaleOrdinal()
                .domain([...new Set(joinedData.map(d => d.continent))])
                .range(d3.schemeCategory10);

$ : simulation = d3.forceSimulation(joinedData)
      .force('x', d3.forceX().x(d => xScale(d.renewablesConsPerCap)))
      .force('y', d3.forceY().y(height/2))
      .force('collision', d3.forceCollide().radius( d =>radiusScale(d.gdp) + 2));


const tooltip = d3.select('body')
      .append('div')
      .attr('id', 'scatterplot-tooltip')
      .style('position', 'absolute')
      .style('z-index', '1')
      .style('visibility', 'hidden')
      .style('padding', '10px')
      .style('background', 'rgba(0,0,0,0.6)')
      .style('border-radius', '4px')
      .style('color', '#fff');

   let el;
   onMount(() => {
    // This is executed when the component is loaded into the DOM
   console.info(d3.select('.force'))
console.warn('year2 is '+year2, 'year is '+year)
   const node = d3.select('.force svg').selectAll('circle')
     .data(joinedData)
     .join('circle')
     .attr('r', d => radiusScale(d.gdp))
     .attr('fill', d => colorScale(d.continent))
     .attr('fill-opacity', 0.4)

      .on("mouseover", function(e,d) {
                    const tooltipWidth = tooltip.node().offsetWidth;
                    const tooltipHeight = tooltip.node().offsetHeight;
                    tooltip
                      .style("left", e.pageX - tooltipWidth/2 +'px')
                      .style("top", e.pageY-tooltipHeight - 10+'px')
                      .style('visibility', 'visible')
                      .html(`<b>Country</b>: ${d.country} <br/>
                            <b>Year</b>: ${d.year}  <br/>
                            <b>GDP per cap</b>: ${d.gdp.toLocaleString('en-US', {maximumFractionDigits: 2})}<br/>
                            <b>Renewable Consumption per cap</b>: ${d.renewablesConsPerCap.toLocaleString('en-US', {maximumFractionDigits: 2})}`);
                    d3.select(this).attr("fill", "gray").attr("stroke", "black").attr("stroke-width", 1);})
      
      .on('mousemove', function(e) {
                    const tooltipWidth = tooltip.node().offsetWidth;
                    const tooltipHeight = tooltip.node().offsetHeight;
                    tooltip
                      .style("left", e.pageX - tooltipWidth/2 +'px')
                      .style("top", e.pageY-tooltipHeight - 10+'px')
      })
     .on("mouseout", function(e,d) {
                    tooltip
                      .style('visibility', 'hidden')
                    d3.select(this).attr("fill", d => colorScale(d.continent))
                      .attr("stroke", "none");})


  const simulation = d3.forceSimulation(joinedData)
      .force('x', d3.forceX().x(d => xScale(d.renewablesConsPerCap)))
      .force('y', d3.forceY().y(height/2))
      .force('collision', d3.forceCollide().radius( d =>radiusScale(d.gdp) + 2));


     simulation.on("tick", () => {
    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
  });  

 

   
  

   

   })
</script>

{#if width }

<svg bind:this={el} xmlns:svg='https://www.w3.org/2000/svg' 
	viewBox='0 0 {width} {height}'
	{width}
	{height}
    >
</svg>
{/if}

<!--
<div>Force here counts aressss{joinedData.length}</div>

{#each joinedData as data}
<div>{data.country}</div>
{/each}
-->

   
  



    
