<script>
  //  import { onMount } from 'svelte';
  
  
  import * as d3 from "d3";
  import Axis from '../Common/Axis.svelte';
  import d3Tip from 'd3-tip';
  
  import * as aq from "arquero";
  
/* import {params_labels} from '../../App.svelte'; */

  export let width;
  export let height;
  export let param_force;
  export let params_labels;
  
  export let year;
  
  export let my_data;
  

  let all_nodes;
  let margin= {left: 40, right: 20, top: 20, bottom: 10};
  const maxRadius = 20;
  //const margin = 40;
  /*
  onMount(  () => {
   // alert(d3.select('svg.force circle').length)
   
  })
  */
  function highlight(param_code)
                                {
                                  console.warn(param_code,param_force)
                                  if (param_code==param_force)
                                  {
                                    
                                    return "class='highlighted'";
                                  }
                                  else
                                  {
                                    return false
                                  }
                                  
                                }
  let nodes;
  $ : values=my_data;
  
  let length=my_data.length;
  $ :
  {
  
    //console.log(my_data[0].gdp)
  }
  

  console.info([d3.min(my_data, d => d[param_force]), d3.max(my_data, d => d[param_force])])
  $ : xScale = d3.scaleLinear()                
      .domain([d3.min(my_data, d => d[param_force]), d3.max(my_data, d => d[param_force])])
     .range([(margin.left+maxRadius), (width - margin.left)]);
    // .range([margin.left, width - margin.right])
  //let formatValue = d3.format(".2s");
  
  $ : xScaleAxis = d3.scaleLinear()                
      .domain([0, d3.max(my_data, d => d[param_force])])
     .range([margin.left, (width - margin.left)])
     
      
  
  $ :  radiusScale = d3.scaleSqrt()
                  .domain([d3.min(my_data, d => d.gdp),d3.max(my_data, d => d.gdp)])
                  .range([3, maxRadius]);     
  
            
  
  $ :  colorScale = d3.scaleOrdinal()
                  .domain([...new Set(my_data.map(d => d.continent))])
                  .range(d3.schemeCategory10);
  
  
  let tooltip = d3.select('body')
        .append('div')
        .attr('class', 'force-tooltip tooltip')
        
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
console.warn(params_labels)
        
        tooltip
                              .style("left", e.pageX - tooltipWidth/2 +'px')
                              .style("top", e.pageY-tooltipHeight - 10+'px')
                              .style('visibility', 'visible')
                              //.html('<span>'+d.country+'</span>')
                              .html(`<span><b>Country</b>: ${d.country} <span/>
                              <span><b>Year</b>: ${d.year} <span/>`+


                              Object.entries(params_labels).map((o,i)=>
                              {
                                let param_code=o[0];
                                let param_label=o[1];       

                             
                                                                                         
                                

                                if (param_code=='renewablesConsPerCap')
                                return `<span ${highlight(param_code)}><b>Renewable Consumption per cap</b>: ${d[param_code].toLocaleString('en-US', {maximumFractionDigits:2})}</span>`
                                else
                                return `<span ${highlight(param_code)}><b>`+param_label+`</b>: ${d[param_code]}</span>`

                              }).join('')
                              +`
                              <span><b>GDP per cap</b>: ${d.gdp.toLocaleString('en-US', {maximumFractionDigits: 2})}<span/>
                              
                              
                              
                              `)

                             
                        
  }
     
  
     let displayData = [];
  
     function update() {
      
      displayData = my_data
      return my_data
    }
  
    
     $:simulation = d3.forceSimulation(my_data)
        .force('x', d3.forceX().x(d => xScale(d[param_force])))
        .force('y', d3.forceY().y(height/2))
        .force('collision', d3.forceCollide().radius( d =>radiusScale(d.gdp) +1));
    
  
    
    
    $: simulation.on("tick", update)
  
    let innerH=height - margin.top - margin.bottom;
  
  </script>
  
  <g class="xAxis" transform="translate(0,0)">
   
        {#each xScaleAxis.ticks() as d,i}
  
            <text
                style={{ textAnchor: 'middle' }}
                dy=".71em"
                y={innerH}
                transform={`translate(${xScaleAxis(d)},0)`}
              >
            
                {d/1000 + " K"}
              </text>
  
   {/each}
   </g>
  
  <g class='circles' bind:this={all_nodes}>
  
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
  </g>
  
   
  <style>

    </style>
   
  
  
  
  <!-- <div>Force here counts aressss{my_data.length} for year {my_data[0].year} or {m}</div> -->
  
  
  <!--
  <div>Force here counts aressss{my_data.length}</div>
  
  {#each my_data as data}
  <div>{data.country}</div>
  {/each}
  -->
  
     
    
  
  
  
      
  