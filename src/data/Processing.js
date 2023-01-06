

  import * as aq from "arquero";
import energyData from './energyData_2010.json';
import continentsDataClean from './continentsDataClean.json';

//export let joinedData;
export let joinedData;
export let continentsArray;
export let beeswarm_data;

let energyClean = energyData.map(d => { 
    var newd = {
      country : d.country,
      year : d.year,
      iso_code : d.iso_code,
      gdp : d.gdp,
      population:d.population,
      renewablesShare : d.renewables_share_energy,
      renewablesConsPerCap: d.renewables_energy_per_capita,
      renewablesGenPerCap: d.renewables_elec_per_capita,
      renewablesCons: d.renewables_consumption,
      renewablesConsChangePercPct: d.renewables_cons_change_pct,
      renewablesConsChangePercTwh: d.renewables_cons_change_twh ,
      renewables_share_energy:d.renewables_share_energy,
      renewables_share_elec:d.renewables_share_elec
  }
  
    return newd;
  }).filter((d) =>
      d.gdp >= 0 
      
      //why??
      && d.renewablesShare >= 0 
      //&& d.year === parseInt(year) &&
      && d.country !== "World"
    );
    let energyCleanArq = aq.from(energyClean);
let continentsCleanArq = aq.from(continentsDataClean);

console.warn(energyClean)

/*.select({
  country: 'country',
  year: 'year',
  iso_code: 'iso_code',
  gdp: 'gdp',
  population: 'population',
  renewables_share_energy: 'renewablesShareCon',
  renewables_share_elec: 'renewablesShareGen',
})
*/
let beeswarm_data_simple=aq.from(energyClean)


.derive({ gdpPerCap : d => d.gdp/d.population})
.filter(
  (d) =>
    op.abs(d.gdp) >= 0 &&
    op.abs(d.renewables_share_energy) >= 0
)
//.energyArq.join_full(continentsClean).objects()

beeswarm_data=beeswarm_data_simple.join_left(continentsCleanArq).objects()    
console.log(beeswarm_data)

joinedData=energyCleanArq.join_left(continentsCleanArq).objects()    
continentsArray = [...new Set(joinedData.filter(d=>d!==undefined && d.continent).map(d => d.continent))] 
//.filter(d => d !== undefined);