import { URL } from '../url'
import api from '../config';

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