import { URL } from '../url'
import api from '../config';

/** BART CHARTS PART ! */
export const getBuildingAgeRentalValue = () => {
    return api.get(URL + '/api/buildingAgeRentalValue');
}

export const getBuildingAgeContractType = () => {
    return api.get(URL + '/api/buildingAgeContractType');
}

export const getNumberOfBedroomsRentalValue = () => {
    return api.get(URL + '/api/numberOfBedroomsRentalValue');
}

export const getNumberOfBathroomsRentalValue = () => {
    return api.get(URL + '/api/numberOfBathroomsRentalValue');
}

export const getBuildingStatusRentalValue = () => {
    return api.get(URL + '/api/buildingStatusRentalValue');
}

export const getBuildingConditionRentalValue = () => {
    return api.get(URL + '/api/buildingConditionRentalValue');
}

/** PIE CHARTS */

export const getRentalArrangementsContractType = () => {
    return api.get(URL + '/api/rentalArrangementsContractType');
}

export const getNumberOfBedroomsDistribution = () => {
    return api.get(URL + '/api/numberOfBedroomsDistribution');
}

export const getHouseholdPerZone = () => {
    return api.get(URL + '/api/householdPerZone');
}

export const getHouseholdPerZoneBar = () => {
    return api.get(URL + '/api/householdPerZoneBar');
}
export const getHouseholdPerZoneBarSecond = () => {
    return api.get(URL + '/api/householdPerZoneBar/1');
}
export const getHouseholdPerZoneBarThird = () => {
    return api.get(URL + '/api/householdPerZoneBar/1/1');
}

/** SCATTER CHART */
export const getRentalValueDistribution = () => {
    return api.get(URL + '/api/rentalValueDistribution');
}


/** Counters */
export const getContractArrangements = () => {
    return api.get(URL + '/api/contractArrangements');
}

export const getFurnishedCount = () => {
    return api.get(URL + '/api/furnishedCount');
}

/** STATISTICS TABLE */

export const getTable = (filters, zoneId = null) => {
    let params = [];
    filters.map(filter => params.push(`answer_${filter.question_id}=${filter.answer}`));

    return api.get(URL + `/api/table?${params.join('&')}&zone_id=${zoneId}`);
}

export const getFilters = () => {
    return api.get(URL + '/api/filters');
}