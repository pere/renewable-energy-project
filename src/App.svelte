<script>
  import svelteLogo from "./assets/svelte.svg";
  
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
  

  let year = 2013;
  let param_force='renewablesConsPerCap';

  let params_force=Object.keys(joinedData[0]).filter(d=>d.includes('renewables'))

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
  $ : {
    //console.warn(joinedData,year,filtered)
  }
  let years=[...new Set(joinedData.map(d=>d.year))]
  let params=[...new Set(joinedData.map(d=>d.year))]
  //console.warn(years)

</script>



<main>
<div>Testing</div>

<select bind:value={param_force}>
  {#each Object.entries(params_labels) as p}

      <option id={p[0]} value={p[0]}>{p[1]}</option> 
  {/each}
</select>

<select bind:value={year}>
  {#each years as d }
      <option id={d}>{d}</option> 
  {/each}
</select>




<svg class="force" {width} {height} xmlns:svg='https://www.w3.org/2000/svg' viewBox='0 0 {width} {height}'>
  <Force {params_labels} {width} {param_force} {height} {year} bind:my_data={filtered}/> 
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
    margin-top:50px;
    margin-bottom:3rem;
  }
</style>
