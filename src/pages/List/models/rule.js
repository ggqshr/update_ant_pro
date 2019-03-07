import { queryRule, removeRule, addRule, updateRule,getAgentData,getProductData } from '@/services/api';

export default {
  namespace: 'rule',

  state: {
    allData:{
      list:[],
      pagination:{}
    },
    productdata:[]
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
    *fetchAddData({payload}, { call, put }) {
      const response = yield call(getAgentData, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchProduct(_,{call,put}){
        const res = yield call(getProductData)
        yield put({
          type: 'savePro',
          payload: res,
        });

    }
  },

  reducers: {
    save(state, {payload}) {
      const alldata = {list:payload,pagination:{}}
      return {
        ...state,
        allData:alldata,
      };
    },
    savePro(state,{payload}){
      return {
        ...state,
        productdata:payload
      }
    }
  },
};
