export function generateParamStringforPages(data) {
    let prams;
    if (data.page && data.pageSize) {
      return `?page=${data.page}&pageSize=${data.pageSize}`;
    } else {
      return `?page=${data.page}`;
    }
}