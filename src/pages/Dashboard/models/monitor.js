import { queryTags,getRemainOpt,getRemainData,getNewAndActiveRemain,getRemainOpt2} from '@/services/api';

export default {
  namespace: 'monitor',

  state: {
    tags: [],
    remainOpt:{},
    activeOpt:{},
    newOpt:{},
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
    },
    *fetchNewAndActiveRemainData(_,{call,put}){
      const res = yield call(getNewAndActiveRemain);
      yield put({
        type:"saveRemain2",
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
    },
    saveRemain2(state,{payload}){
        const newOpt = getRemainOpt2(payload.newRemainRate,"新增用户留存比例");
        const activeOpt = getRemainOpt2(payload.activeRemainRate,"活跃用户留存比例")
        return {
          ...state,
          newOpt:newOpt,
          activeOpt:activeOpt
        }
    }
  },
};
