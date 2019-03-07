import { queryTags,getRemainOpt,getRemainData } from '@/services/api';

export default {
  namespace: 'monitor',

  state: {
    tags: [],
    remainOpt:{}
  },

  effects: {
    *fetchTags(_, { call, put }) {
      const response = yield call(queryTags);
      yield put({
        type: 'saveTags',
        payload: response.list,
      });
    },
    *fetchRemainData(_,{call,put}){
      const res = yield call(getRemainData)
      console.log(res)
      yield put({
        type:"saveRemain",
        payload:res
      })
    }
  },

  reducers: {
    saveTags(state, action) {
      return {
        ...state,
        tags: action.payload,
      };
    },
    saveRemain(state,{payload}){
      const opt = getRemainOpt(payload)
      return {
        ...state,
        remainOpt:opt
      }
    }
  },
};
