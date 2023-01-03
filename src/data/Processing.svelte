
<script>
  import * as aq from "arquero";
import energyData from './energyData_2010.json';
import continentsDataClean from './continentsDataClean.json';

export let joinedData;

let energyClean = energyData.map(d => { 
    var newd = {
      country : d.country,
      year : d.year,
      iso_code : d.iso_code,
      gdp : d.gdp,
      renewablesShare : d.renewables_share_energy,
      renewablesConsPerCap: d.renewables_energy_per_capita,
      renewablesGenPerCap: d.renewables_elec_per_capita,
      renewablesCons: d.renewables_consumption,
      renewablesConsChangePercPct: d.renewables_cons_change_pct,
      renewablesConsChangePercTwh: d.renewables_cons_change_twh 
  }
  
    return newd;
  }).filter((d) =>
      d.gdp >= 0 && d.renewablesShare >= 0 
      //&& d.year === parseInt(year) &&
      && d.country !== "World"
    );
    let energyCleanArq = aq.from(energyClean);
let continentsCleanArq = aq.from(continentsDataClean);

console.warn(energyClean)
joinedData = energyCleanArq.join_left(continentsCleanArq).objects()    
</script>    