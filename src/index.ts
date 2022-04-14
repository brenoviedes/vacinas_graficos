import { getVacsStatitics } from "./models/dao/VacTypesDAO";
import { createChart } from "./utils/ChartUtils";


const vacCity = getVacsStatitics()
vacCity.forEach(vacsCities => createChart(vacsCities))

console.log("Juro solenemente não fazer nada de bom")