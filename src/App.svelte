<script>
  import svelteLogo from "./assets/svelte.svg";
  
  //import xAxis from "./Components/Common/Axis.svelte";
  //import DataProcessing from "./Components/DataProcessing/Processing.svelte";
  import energyData from './data/energyData_2010.json';
  import * as aq from "arquero";
  import Force from "./Components/Charts/Force.svelte";

  let width, height;
  let year=2018;
 let year2;

     /*
    test
    */
</script>



<main>
<div>in 555</div>
{#if {width} }
<div class='force' bind:clientWidth={width} bind:clientHeight={height}>
   <Force {width} {height} {year} year2={year2}/>
</div>   
{/if}

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
		height:50vh;
    width:90vw;
		margin-bottom:3rem;
	}
</style>
