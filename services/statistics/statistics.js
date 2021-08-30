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