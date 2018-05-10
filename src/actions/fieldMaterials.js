/* eslint max-len: off */
export const FIELDS_MATERIALS_FETCH_REQUESTED = 'FIELDS_MATERIALS_FETCH_REQUESTED';
export const FIELDS_MATERIALS_FETCH_SUCCEEDED = 'FIELDS_MATERIALS_FETCH_SUCCEEDED';

export const fieldMaterialsRequest = filters => ({type: FIELDS_MATERIALS_FETCH_REQUESTED, filters});
export const FieldMaterialsSucceeded = fieldMaterials => ({type: FIELDS_MATERIALS_FETCH_SUCCEEDED, fieldMaterials});
