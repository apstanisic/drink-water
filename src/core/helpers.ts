/**
 * Convert callback function to promise
 * @param callbackFunc Function that has callback
 * @param params Params to be passed to that function
 * @param hasReject Does function has reject or error callback
 */
export function callbackToPromise<T>(
  callbackFunc: (...rest: any[]) => Promise<T>,
  params: any[] = [],
  hasReject = true
): Promise<T> {
  return new Promise((resolve, reject) => {
    if (hasReject) {
      return callbackFunc(...params, resolve, reject);
    } else {
      return callbackFunc(...params, resolve);
    }
  });
}

// export function callbackToPromise(callbackFunc) {
//     return new Promise((res, reject) => {
//         return callbackFunc(res, reject);
//     })
// }

export function wait(time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

export function promiseError<T>(
  returnData: T,
  errorMessage = ''
): (error) => Promise<T> {
  return error => {
    console.log(errorMessage, error);
    return Promise.resolve(returnData);
  };
}
