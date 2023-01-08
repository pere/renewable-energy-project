<script>
  import svelteLogo from "./assets/svelte.svg";
  import * as d3 from "d3";
import { onMount } from 'svelte';  
//import xAxis from "./Components/Common/Axis.svelte";
  //import DataProcessing from "./Components/DataProcessing/Processing.svelte";
  //import energyData from './data/energyData_2010.json';
  import  {joinedData,continentsArray,beeswarm_data}  from './data/Processing.js';
  import * as aq from "arquero";
  import Force from "./Components/Charts/Force.svelte";
  import Beeswarm from "./Components/Charts/Beeswarm.svelte";
  import Range from "./Components/Utils/Range.svelte";

  
  let width=650;
  let height=200;
  let margin= {left: 40, right: 20, top: 20, bottom: 10};

  let year = 2013;
  let param_force='renewablesConsPerCap';

  let params_force=Object.keys(joinedData[0]).filter(d=>d.includes('renewables'))
//renewablesConsPerCap
let params_labels={
    renewablesCons: 'Primary energy consumption from renewables',
    renewablesConsChangePercPct: "Annual percentage change in energy consumption from renewables",
    renewablesConsChangePercTwh: "Annual change in other renewable consumption, measured in terawatt-hours",
    renewablesConsPerCap: "Per capita electricity consumption from renewables",
    renewablesGenPerCap: "Per capita electricity generation from renewables",
    renewablesShare: "Share of primary energy consumption that comes from renewables",
    renewables_share_elec: "Share of electricity generation that comes from renewables"
  }

  $ : beeswarm_data_filtered=beeswarm_data.filter((d)=>d.year==year)

  $ : filtered=joinedData.filter((d)=>d.year==year)

  //no circles bc they only render when component has run...
  $ : circles=d3.select(force_svg).selectAll('circle')
  $ : {
    //console.warn(joinedData,year,filtered)
  }
  let years=[...new Set(joinedData.map(d=>d.year))]
  let params=[...new Set(joinedData.map(d=>d.year))]
  //console.warn(years)
let this_legend;
let force_svg;
  let mouseover_legend=function()
  {
   // console.log(arguments)
      
  }
    /*
    d3.select(force_svg).selectAll('circle').filter((e,d)=>
    {
      console.warn(arguments)
      return d.continent=='Europe'
    }).attr('opacity',0.2)
    */

  onMount(() => {
    let selectedCont=[];
    console.warn(filtered)
   let continentsArrayFiltered=[...new Set(filtered.map(d => d.continent))] 
let colorScale = d3.scaleOrdinal()
                  .domain(continentsArrayFiltered)
                  .range(d3.schemeCategory10);
 let legend=d3.select('.legend')
  .attr('transform', 'translate(' + (margin.left + margin.right + 60) + ',' + (margin.top - 20) + ')')
  .selectAll('g')
  .data(continentsArrayFiltered)
  .enter()
  .append('g')
  .on('mouseover',function(e,g_data)
  {
    //the g
    console.warn(d3.select(this))
    d3.selectAll('.legend g').filter((d)=>
    {
      return d!==g_data;
    }).attr('opacity',.6)
   // console.info(d3.select(force_svg).selectAll('circle'))
    let circles=d3.select(force_svg).selectAll('circle');
    circles.attr('fill-opacity',.6)
    circles.each(function(d, i)
      {

      let data=JSON.parse(d3.select(this).attr('data'))
      if (data.continent!==g_data)
      d3.select(this).attr('fill-opacity',.2)
      })
  })
  .on('mouseout',function()
  {
    d3.selectAll('.legend g').attr('opacity',1)
    d3.select(force_svg).selectAll('circle').attr('fill-opacity',.6)
  })
  /*
  .on('click',function(e,g_data)
  {
    console.log(selectedCont)
    let pos=selectedCont.indexOf(g_data);
    if (pos==-1)
    {      
      //items 
      selectedCont.push(g_data)
    }
    else
    {      
       selectedCont.splice(pos, 1);
    }

    d3.selectAll('.legend g').each(function(d)
    {
      console.log(d)
      if (selectedCont.indexOf(d)>-1)
      d3.select(this).attr('opacity',.6)
      else
      d3.select(this).attr('opacity',1)
    })


  })
  */

 


  legend.append('circle')
  .attr('fill', (d, i) => 
  {
    return colorScale(d)
    })   
  .attr('transform','translate(0,8)')  
  .attr('r', 8)
  .attr('fill-opacity',.6)
  
  
legend.append('text')
  .attr('x', 18)
  .attr('y', 10)
  .attr('dy', '.15em')
  .text((d, i) => d)
  .style('text-anchor', 'start')
  .style('font-size', 12);

let sum=0;
legend.each(function(d,i)
{
  
  let node_width=(d3.select(this).node().getBBox().width);
  
  if (i>0)
  {
   
    d3.select(this).attr('transform','translate('+sum+', 5)')
    sum+=node_width+15;
  }
  
  else
  {
    
    sum+=node_width+15;
d3.select(this).attr('transform','translate(8, 5)')
  }
})
  })


</script>

{@html '<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-legend/2.25.6/d3-legend.min.js" />'}

<main>
<div>Testing</div>

<div class="select">
<div>
  <select bind:value={param_force}>
    {#each Object.entries(params_labels) as p}

        <option id={p[0]} value={p[0]}>{p[1]}</option> 
    {/each}
  </select>
</div>
  <div>
  <select bind:value={year}>
    {#each years as d }
        <option id={d}>{d}</option> 
    {/each}
  </select>
  </div>
</div>


<svg class="legend" {width} height=50 xmlns:svg='https://www.w3.org/2000/svg' viewBox='0 0 {width} 50' bind:this={this_legend} />

<svg class="force" {width} {height} xmlns:svg='https://www.w3.org/2000/svg' bind:this={force_svg} viewBox='0 0 {width} {height}'>
  <Force {params_labels} {width} {param_force} {continentsArray} {height} {year} bind:my_data={filtered}/> 
</svg>

<div>
<label for="basic-range">Years {year}</label>

<Range
 bind:my_data={filtered} 
  on:change={(e) => (year=e.detail.value)}
  id="basic-slider"
  min={2011}
  max={2018}
  initialValue={year}
/>

</div>



<svg  class="beeswarm" width={650} height={600} xmlns:svg='https://www.w3.org/2000/svg' viewBox='0 0 650 600'>
  <Beeswarm {params_labels} width={650} height={600} {year} {param_force} bind:my_beeswarmdata={beeswarm_data_filtered}/> 
</svg>



<div>


    <div class='col'>
    <p>Basic setup</p>
    <button on:click={() => year = 2012}>2012</button>
    <button on:click={() => year = 2015}>2015</button>
  </div>

</main>


 <style>

.legend
{
  cursor:pointer;
}
 .select select 
 {
  padding: 5px;
    font-size: unset;
    font-family: unset;
    max-width: 55%;
    float: left;
        margin-right: 10px;
            margin-top: 10px;
 }

  :global(.tooltip)
  {
    font-size:.8rem;
  }

  :global(.tooltip span)
  {
    display:block;
    
  }
  main {
    padding: 1em;
    padding-top: 5rem;
    margin: 0 auto;
  }
  
  :global(circle:hover)
 {
  cursor:pointer;
 }
  :global(.beeswarm .axis text,.yAxis text)
  {
    fill:white;
    font-size:.7rem;
  }
  :global(.highlighted)
  
    {
      padding:2px;
      background:#ff9800;
      color:white;
    }
  :global(.force),:global(.beeswarm)
   {
    
    margin-bottom:3rem;
  }
</style>
