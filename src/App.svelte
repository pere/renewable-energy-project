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
  
  $: year = 2018;


  //let year=2018;
 let year2;

     /*
    test
    */
</script>



<main>
<div>Testing</div>
<!--
<div class="force">
  
    
      <Force {width} {height} {year} year2={year2} />
    
  
</div>
-->

<!-- {#if {width} } -->
<div class='force'>
  <!-- bind:clientWidth={width} bind:clientHeight={height}> -->
  {#if {width} } 
   <Force {width} {height} {year} year2={year2} {joinedData}/>
   {/if} 
</div>   
<!--  {/if} -->

<div>
  <label for="basic-range">Years {year}</label>
  <Range
    on:change={(e) => (year=e.detail.value)}
    id="basic-slider"
    min={2018}
    max={2022}
    initialValue={2018}
  />
</div>

  	<div class='col'>
		<p>Basic setup</p>
		<button on:click={() => year2 = 2019}>2019</button>
		<button on:click={() => year2 = 2020}>2020</button>
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
