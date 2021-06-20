import { notify } from './toaster';
export const handleError = (error) => {
  debugger;

  let err = error.response;
  let errMsg = 'Something went wrong';
  if (err) {
    errMsg = err && err.data && err.data.msg;
  }
  notify.showError(errMsg);
  // accept error
  // check error
  // parse error
  // prepare error
  // show them in UI
};
