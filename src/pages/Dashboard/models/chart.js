import {
  fakeChartData,
  getTotalDate,
  getDetailData,
  getDataPerHour,
  getOption,
  getUserData,
  getRateOption,
} from '@/services/api';
import axios from 'axios'

export default {
  namespace: 'chart',

  state: {
    totaldata: {},
    detaildata: [],
    ipOption: {},
    pvOption: {},
    vvOption: {},
    uvOption: {},
    ratedata:{},
    radarData: [],
    loading: false,
    userdata:{},
  },

  effects: {
    *fetchTotalData(_, { call, put }) {
      const res = yield call(getTotalDate);
      yield put({
        type: 'save',
        payload: {
          totaldata: res,
        },
      });
    },
    *fetchDetailData(_, { call, put }) {
      const res = yield call(getDetailData);
      yield put({
        type: 'save',
        payload: {
          detaildata: res,
        },
      });
    },
    *fetchDataPerHour(_, { call, put }) {
      const res = yield call(getDataPerHour);
      yield put({
        type: 'savaDta',
        payload: {
          dataperhour: res,
        },
      });
    },
    *fetchUserData(_,{call,put}){
        const res = yield call(getUserData)
        console.log(res)
        yield put({
          type:'save',
          payload:{
            userdata:res
          }
        })
    },
    *fetchRateData(_,{call,put}){
      const res = yield axios
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    savaDta(state, { payload }) {
      const finalData = getOption({ ...payload });
      return {
        ...state,
        ...finalData,
      };
    },
    clear() {
      return {
        totaldata: {},
        detaildata: [],
        ipOption: {},
        pvOption: {},
        vvOption: {},
        uvOption: {},
        radarData: [],
        loading: false,
      };
    },
  },
};
