<script>
	import { onMount } from 'svelte';

import {scaleLinear, scaleBand} from 'd3-scale';
import * as d3 from "d3";

import d3Tip from 'd3-tip';

import * as aq from "arquero";

export let width;
export let height;

export let year;

export let my_data;

const maxRadius = 20;
const margin = 40;

onMount(  () => {
 // alert(d3.select('svg.force circle').length)
 
})
let nodes;
$ : values=my_data;

let length=my_data.length;
$ :
{

  //console.log(my_data[0].gdp)
}


$ : xScale = d3.scaleLinear()                
    .domain([d3.min(my_data, d => d.renewablesConsPerCap), d3.max(my_data, d => d.renewablesConsPerCap)])
    .range([margin+maxRadius, width - margin]);
    

$ :  radiusScale = d3.scaleSqrt()
                .domain([d3.min(my_data, d => d.gdp),d3.max(my_data, d => d.gdp)])
                .range([3, maxRadius]);     

          

$ :  colorScale = d3.scaleOrdinal()
                .domain([...new Set(my_data.map(d => d.continent))])
                .range(d3.schemeCategory10);


let tooltip = d3.select('body')
      .append('div')
      .attr('id', 'scatterplot-tooltip')
      .style('position', 'absolute')
      .style('z-index', '1')
      .style('visibility', 'hidden')
      .style('padding', '10px')
      .style('background', 'rgba(0,0,0,0.6)')
      .style('border-radius', '4px')
      .style('color', '#fff');

let selected_datapoint;
function mouseover_fx(e,d) {
              
      const tooltipWidth = tooltip.node().offsetWidth;
      const tooltipHeight = tooltip.node().offsetHeight;
      tooltip
                            .style("left", e.pageX - tooltipWidth/2 +'px')
                            .style("top", e.pageY-tooltipHeight - 10+'px')
                            .style('visibility', 'visible')
                            //.html('<span>'+d.country+'</span>')
                            .html(`<b>Country</b>: ${d.country} <br/>
                            <b>Year</b>: ${d.year} <br/>
                            <b>GDP per cap</b>: ${d.gdp.toLocaleString('en-US', {maximumFractionDigits: 2})}<br/>
                            <b>Renewable Consumption per cap</b>: ${d.renewablesConsPerCap.toLocaleString('en-US', {maximumFractionDigits:2})}
                            `)
                      
}
   

   let displayData = [];

   function update() {
		
		displayData = my_data
		return my_data
	}

	
   $:simulation = d3.forceSimulation(my_data)
      .force('x', d3.forceX().x(d => xScale(d.renewablesConsPerCap)))
      .force('y', d3.forceY().y(height/2))
      .force('collision', d3.forceCollide().radius( d =>radiusScale(d.gdp) +1));
	

	
	
	$: simulation.on("tick", update)

  

</script>



{#each displayData as d,i}
<circle bind:this={nodes}
    r={radiusScale(d.gdp) }
    fill={colorScale(d.continent)}
    fill-opacity={0.4}
    cx={d.x}
    cy={d.y}
    on:mouseover={(e) => {selected_datapoint = d; mouseover_fx(e,d)}}
    on:mousemove={(e)=>{ 
      const tooltipWidth = tooltip.node().offsetWidth;
      const tooltipHeight = tooltip.node().offsetHeight;
    tooltip
       .style("left", e.pageX - tooltipWidth/2 +'px')
      .style("top", e.pageY-tooltipHeight - 10+'px')
    }}
    on:mouseout={(e)=>{ 
      tooltip.style('visibility', 'hidden')
    }
  }
    
    
  
/>

{/each}

<!-- <div>Force here counts aressss{my_data.length} for year {my_data[0].year} or {m}</div> -->


<!--
<div>Force here counts aressss{my_data.length}</div>

{#each my_data as data}
<div>{data.country}</div>
{/each}
-->

   
  



    
