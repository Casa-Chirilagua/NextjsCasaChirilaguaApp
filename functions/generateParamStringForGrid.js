export function generateParamStringForGrid(data) {
  return`/grid?objName=${data.objName}&id=${data.id}&objToRetrieve=${data.objToRetrieve}&objMakingRequest=${data.objMakingRequest}`;
}
