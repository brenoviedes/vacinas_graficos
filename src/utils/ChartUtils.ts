import { ChartType } from "chart.js";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { writeFileSync } from "fs";
import { join } from "path";
import VacsType from "../models/types/VacTypes";


const getChart = (vacTypes: VacsType) => {
    const labels: string[] = [`Coronavac ${vacTypes.coronaVacButantan}`, `Janssen ${vacTypes.janssen}`, `Oxford ${vacTypes.oxfordFiocruz}`, `Pfizer ${vacTypes.pfizer}`]

    const data: number[] = []

    data.push(vacTypes.coronaVacButantan)
    data.push(vacTypes.janssen)
    data.push(vacTypes.oxfordFiocruz)
    data.push(vacTypes.pfizer)

    const charInfo = {
        labels,
        datasets: [
            {
                backgroundColor: [
                    'rgb(66, 66, 111',
                    'rgb(0, 255, 0',
                    'rgb(210, 105, 30',
                    'rgb(255, 0, 255',
                ],
                data,
            }
        ]
    }

    return charInfo

}

export const createChart = (vacTypes: VacsType) => {
    const data = getChart(vacTypes)
    const {city} = vacTypes

    const chart = new ChartJSNodeCanvas({
        height: 800,
        width: 800,
        backgroundColour: '#FFF'
    })

    let chartTitle =  vacTypes.city == 'MS' ? `Vacinação no estado de Mato Grosso do Sul` : `Vacinação na cidade de ${vacTypes.city}`

    const image = chart.renderToBufferSync({
        type: <ChartType>'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: chartTitle
                }
            }
        },
    })

    const fileName = `${city}.png`
    const path = join(__dirname, '..', 'charts', fileName)
    writeFileSync(path, image)
}