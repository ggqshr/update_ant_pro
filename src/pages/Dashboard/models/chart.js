import { fakeChartData, getTotalDate, getDetailData, getDataPerHour } from '@/services/api';

export default {
  namespace: 'chart',

  state: {
    totaldata: {},
    detaildata: [],
    dataperhour: {},
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
    loading: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      console.log(response.salesData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
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
        type: 'save',
        payload: {
          dataperhour: res,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    },
  },
};
