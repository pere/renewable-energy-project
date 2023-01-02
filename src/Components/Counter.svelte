<script>
  import {scaleLinear, scaleBand} from 'd3-scale';
  import {max,min} from 'd3-array';
  console.warn(max([1,5,7]));
  let count = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment}>
  count is {count}
</button>
