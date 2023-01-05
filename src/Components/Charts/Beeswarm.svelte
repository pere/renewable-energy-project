<script>
	import { onMount } from 'svelte';
    import  {continentsArray}  from '../../data/Processing.js';
  //import {scaleLinear, scaleBand} from 'd3-scale';
import * as d3 from "d3";

import d3Tip from 'd3-tip';

import * as aq from "arquero";

export let width;
export let height;

export let year;

//my_data changes according to the year in app.svelte
export let my_data;
const maxRadius = 40;
let padding = 0.5;
const margin = {left: 120, right: 120, top: 100, bottom: 0};

let y = d3.scaleBand()
  .domain(continentsArray)
  .range([height + margin.bottom -50, margin.top-50]);

let x = d3.scaleLinear()
  .domain([0,100])
  .nice()
  .range([margin.left, width - margin.right])  

 let size = d3.scaleSqrt()
  .domain([0.5,d3.max([...my_data.map(d=>d.gdpPerCap)])])
  //.nice()
  .range([2, 30])

  //creates cx and cy to the data with corresponding year
  /*
  const simulation = d3.forceSimulation(year)
    .force('x', d3.forceX((d) => x(d.renewablesShareCon)).strength(0.3))
    .force('y', d3.forceY((d) => y(d.continent)).strength(0.3))
    .force('collide', d3.forceCollide(d => size(d.gdpPerCap) + padding).strength(1))
    .stop();
  
      for(let i = 0; i < 300; i++) {
    simulation.tick();      
    }  
    simulation.stop();
    */

/*
svg.selectAll('circle')
    .data(selectedYear)
    .join('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => size(d.gdpPerCap))
    .attr('fill', d => color(d.continent))
    .attr('opacity', .8);


    on:mouseover={(event) => {selected_datapoint = d; mouseover_fx(event,d)}}
    */

    let points = my_data.map(d => {
                let i = Math.floor(Math.random() * m) //the cluster id
                let focusX = 110 * Math.cos(i / m * Math.PI * 2)
                let focusY = 110 * Math.sin(i / m * Math.PI * 2)

                let dataPoint = {
                    
                    x: focusX,
                    y: focusY,
                    focusX: focusX,
                    focusY: focusY
                } 
                return dataPoint

            });
            debugger
    console.warn(points)
</script>

{#each my_data as d,i}
<circle 
    cx={d.x}
    cy={d.y}
    r={size(d.gdpPerCap) }
    fill={color(d.continent)}
    opacity={0.7}    
/>

{/each}

