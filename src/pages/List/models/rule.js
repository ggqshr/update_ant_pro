import { queryRule, removeRule, addRule, updateRule,getAgentData } from '@/services/api';

export default {
  namespace: 'rule',

  state: {
    allData:{
      list:[],
      pagination:{}
    },
    // data: {
    //   list: [],
    //   pagination: {},
    // },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *fetchAddData({payload}, { call, put }) {
      const response = yield call(getAgentData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, {payload}) {
      const alldata = {list:payload,pagination:{}}
      return {
        ...state,
        allData:alldata,
      };
    },
  },
};
