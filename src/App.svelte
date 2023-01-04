<script>
  import svelteLogo from "./assets/svelte.svg";
  
  //import xAxis from "./Components/Common/Axis.svelte";
  //import DataProcessing from "./Components/DataProcessing/Processing.svelte";
  //import energyData from './data/energyData_2010.json';
  import  {joinedData}  from './data/Processing.js';
  import * as aq from "arquero";
  import Force from "./Components/Charts/Force.svelte";
  import Range from "./Components/Utils/Range.svelte";

  let width=500;
  let height=400;
  
  let year = 2013;

  $ : filtered=joinedData.filter((d)=>d.year==year)
  $ : {
    console.warn(joinedData,year,filtered)
  }
  let years=[...new Set(joinedData.map(d=>d.year))]
  //console.warn(years)

</script>



<main>
<div>Testing</div>

<select bind:value={year}>
	{#each years as d }
	<!--
  {

	console.log(year,filtered)
	}
  -->
	    <option id={d}>{d}</option> 
	{/each}
</select>
<Force width=500 {height} bind:my_data={filtered}/> 
<svg class="force" {width} {height} xmlns:svg='https://www.w3.org/2000/svg' viewBox='0 0 {width} {height}'>
  <Force width=500 {height} bind:my_data={filtered}/> 
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

  	<div class='col'>
		<p>Basic setup</p>
		<button on:click={() => year = 2012}>2012</button>
		<button on:click={() => year = 2015}>2015</button>
	</div>

</main>


 <style>
	main {
		padding: 1em;
		margin: 0 auto;
	}

	:global(.force) {
	
		margin-bottom:3rem;
	}
</style>
