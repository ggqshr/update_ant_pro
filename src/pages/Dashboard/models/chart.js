import {
  fakeChartData,
  getTotalDate,
  getDetailData,
  getDataPerHour,
  getOption,
  getUserData,
  getRateOption,
  getRateData,
  getOldAndNewOpt,
  getRateData2,
} from '@/services/api';

export default {
  namespace: 'chart',

  state: {
    totaldata: {},
    detaildata: [],
    ipOption: {},
    pvOption: {},
    vvOption: {},
    uvOption: {},
    rateopt:{},
    radarData: [],
    loading: false,
    userdata:{},
    rateopt2:{},
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
        yield put({
          type:'save',
          payload:{
            userdata:res
          }
        })
    },
    *fetchRateData({payload},{call,put}){
      const res = yield call(getRateData,payload);
      yield put({
        type:"saveRate",
        payload:{
          ratedata:res,
        }
      })
    },
    *fetchRateData2({payload},{call,put}){
      const res = yield call(getRateData2,payload);
      yield put({
        type:"saveOldAndNew",
        payload:{
          rateopt2:res,
        }
      })
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveRate(state, { payload }) {
      const finalOtp = getRateOption(payload.ratedata)
      return {
        ...state,
        rateopt:finalOtp
      };
    },
    savaDta(state, { payload }) {
      const finalData = getOption({ ...payload });
      return {
        ...state,
        ...finalData,
      };
    },
    saveOldAndNew(state, { payload }) {
      const finalData = getOldAndNewOpt(payload.rateopt2);
      console.log(finalData)
      return {
        ...state,
        rateopt2:finalData,
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
