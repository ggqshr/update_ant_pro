import {
  fakeChartData,
  getTotalDate,
  getDetailData,
  getDataPerHour,
  getOption,
  getUserData,
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
