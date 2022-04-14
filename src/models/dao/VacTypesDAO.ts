import { parse } from "csv-parse/sync"
import { readFileSync } from "fs"
import { join } from "path"
import VacsType from "../types/VacTypes"


export const parseVacsCSVFile = () => {
    const filePath = join(__dirname, '..', '..', 'data', 'doses_aplicadas_ms.csv')
    const strContent = readFileSync(filePath, 'utf-8')
    let parsedContent: any[] = parse(strContent, {
        delimiter: ';'
    })
    parsedContent = parsedContent.slice(1)
    return parsedContent
}

export const getVacsPerCity = (row: any): VacsType => {
    let [city, , coronaVacButantan, janssen, oxfordFiocruz, pfizer] = row

    city = city == 'TOTAL' ? 'MS' : city
    coronaVacButantan = coronaVacButantan.replace(/\./g, '')
    janssen = janssen.replace(/\./g, '')
    oxfordFiocruz = oxfordFiocruz.replace(/\./g, '')
    pfizer = pfizer.replace(/\./g, '')

    const vacsCity: VacsType = { city, coronaVacButantan, janssen, oxfordFiocruz, pfizer }

    return vacsCity
}

export const getVacsStatitics = (): VacsType[] => {
    const vacsPerCityArray = parseVacsCSVFile()
    const vacsPerCity: VacsType[] = []

    for (const i of vacsPerCityArray) {
        let vacCity = getVacsPerCity(i)
        vacsPerCity.push(vacCity)
    }

    return vacsPerCity
}
