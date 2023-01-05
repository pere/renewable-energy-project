<script>


import * as d3 from "d3";
import  {continentsArray}  from '../../data/Processing.js';
export let width;
export let height;

export let year;

export let my_beeswarmdata;

let selected_datapoint;
const maxRadius = 20;

let padding = 0.5;
let margin= {left: 120, right: 120, top: 100, bottom: 0};
let nodes;
$ : values=my_beeswarmdata;


$ : xScale =d3.scaleLinear()
  .domain([0,100])
  .nice()
  .range([margin.left, width - margin.right])

  //console.info(d3.max(my_data,d=>d.gdpPerCap))
console.log([d3.min(my_beeswarmdata,d=>d.gdpPerCap),d3.max(my_beeswarmdata,d=>d.gdpPerCap)])

$ : radiusScale = d3.scaleSqrt()
  .domain([d3.min(my_beeswarmdata,d=>d.gdpPerCap),d3.max(my_beeswarmdata,d=>d.gdpPerCap)])
  //.nice()
  .range([2, 30])  

$ : yScale = d3.scaleBand()
  .domain(continentsArray)
  .range([height + margin.bottom -50, margin.top-50])
          

$ :  colorScale = d3.scaleOrdinal()
  .domain(continentsArray)
  .range(d3.schemeTableau10)


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


function mouseover_fx(e,d) 
    {
              
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
                            <b>Renewable Consumption per cap</b>: ${d.renewablesShareCon}`)
                            
                                //.toLocaleString('en-US', {maximumFractionDigits:2})}
                       
                      
    }
   

   let BeedisplayData = [];
    
   
   function update() {
		
		BeedisplayData = my_beeswarmdata
		return my_beeswarmdata
	}

    //my_beeswarmdata never get updated with cx or cy
    console.log(my_beeswarmdata)
    $:simulation = d3.forceSimulation(year)
    .force('x', d3.forceX((d) => xScale(d.renewablesShareCon)).strength(0.3))
    .force('y', d3.forceY((d) => yScale(d.continent)).strength(0.3))
    .force('collide', d3.forceCollide(d => radiusScale(d.gdpPerCap) + padding).strength(1))    
    //.tick();
  
	$:{
        console.log('simulating a tick')
       // simulation.tick();
    }
	//$:simulation.on("tick", update)

  

</script>



{#each BeedisplayData as d,i}

<circle bind:this={nodes}
    r={radiusScale(d.gdpPerCap) }
    fill={colorScale(d.continent)}
    fill-opacity={0.6}
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

   
  



    
