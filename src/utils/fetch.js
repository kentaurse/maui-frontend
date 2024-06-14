import axios from 'axios';
import _ from 'lodash';
import { call, put } from 'redux-saga/effects';
import { appConfig } from '../appConfig';

import { WorkflowConstants } from '../saga/constants/workflowConstants';

export const requestPending = type => `${type}_PENDING`;
export const requestSuccess = type => `${type}_SUCCESS`;
export const requestFail = type => `${type}_FAILURE`;

export const request = ({ type, method, url, apiUrl, headers, success, fail, payloadOnSuccess, payloadOnFail }) =>
  function* apiRequest(action = {}) {
    const { data, params, onUploadProgress, success: successCallback, fail: failCallback } = action.payload || {};

    try {
      if (type) {
        yield put({
          type: requestPending(type),
          originalType: type,
        });
      }
      const token = localStorage.getItem('token');
      axios.defaults.baseURL = apiUrl || appConfig.apiUrl;
      
      delete axios.defaults.headers.common.Authorization;
      if (type !== WorkflowConstants.GET_IP_ADDRESS) {
        // axios.defaults.headers.common.Authorization = token || '';
      } else {
        delete axios.defaults.headers.common.Authorization;
      }
      const res = yield call(axios.request, {
        url,
        method: method.toLowerCase(),
        headers: headers || {
          Authorization: `Bearer ${token}` || ''
        },
        data: data || {},
        params,
        onUploadProgress,
      });

      if (type) {
        yield put({
          type: requestSuccess(type),
          payload: payloadOnSuccess ? payloadOnSuccess(res.data, action) : res.data,
          originalType: type,
        });
      }

      successCallback && successCallback(res.data);
      success && success(res.data, action);

      return res.data;
    } catch (err) {
      const errRes = _.get(err, 'response', err);

      failCallback && failCallback(errRes);
      fail && fail(errRes);

      if(type==="TOKEN_SIGNIN_ACTION")  
        localStorage.clear();

      if (type) {
        yield put({
          type: requestFail(type),
          payload: payloadOnFail ? payloadOnFail(errRes, action) : errRes,
          originalType: type,
        });
      }
      return null;
    }
  };


export const getRequest = params => request({ ...params, method: 'get' });
export const postRequest = params => request({ ...params, method: 'post' });
export const putRequest = params => request({ ...params, method: 'put' });
export const deleteRequest = params => request({ ...params, method: 'delete' });

export const getHTTPErrorMessage = (error) => {
  if (error && (error.status === 400 || error.status === 500)) {
    return _.get(error, 'data.failure.errors.0.message');
  } else {
    return error?.message;
  }
}

export default request;
