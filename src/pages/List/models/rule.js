import { queryRule, removeRule, addRule, updateRule,getAgentData,getProductData,getActionData } from '@/services/api';

export default {
  namespace: 'rule',

  state: {
    allData:{
      list:[],
      pagination:{}
    },
    productdata:[],
    actionData:[],
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
    },
    *fetchAllActionData(_,{call,put}){
      const res = yield call(getActionData);
      yield put({
        type:"saveAction",
        payload:res,
      })
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
    },
    saveAction(state,{payload}){
      return {
        ...state,
        actionData:payload
      }
    },
  },
};
