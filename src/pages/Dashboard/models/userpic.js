import { getAllData, getBingOpt, getLineOpt, getfunnelOpt, getRemainOpt, getnewAndoldOpt, getVisitorData,getAvgDeepOpt } from '@/services/api';

export default {
  namespace: 'userPic',

  state: {
    ageOpt: {},
    employeeOpt: {},
    numOpt: {},
    educationOpt: {},
    deepOpt: {},
    oldnewOpt: {}
  },

  effects: {
    *fetchAllData(_, { call, put }) {
      const res = yield call(getAllData);
      yield put({
        type: 'saveTags',
        payload: res
      });
    },
    *fetchAllVisitorData(_, { call, put }) {
      const res = yield call(getVisitorData)
      yield put({
        type: 'save',
        payload: res
      });
    }
  },

  reducers: {
    saveTags(state, { payload }) {
      const num = getBingOpt(['男生', '女生'], payload.peoplenum)
      const education = getBingOpt(["未知", "初中", "高中", "本科", "专科"], payload.education)
      const age = getLineOpt(['未知', '0-17', '18-24', '25-29', '30-34', '35-39', '40以上'], payload.age)
      const datalabel = [];
      payload.employee.map((item, index) => {
        datalabel.push(item.name);
      })
      const employee = getfunnelOpt(datalabel, payload.employee)
      console.log(employee)
      return {
        ...state,
        numOpt: num,
        ageOpt: age,
        educationOpt: education,
        employeeOpt: employee
      };
    },
    save(state, { payload }) {
      const deepOpt = getAvgDeepOpt(payload.deep);
      const newOpt = getnewAndoldOpt(payload.oldandnew)
      return {
        ...state,
        oldnewOpt: newOpt,
        deepOpt: deepOpt
      }
    },
    clear() {
      return {
        ageOpt: {},
        employeeOpt: {},
        numOpt: {},
        educationOpt: {},
        deepOpt: {},
        oldnewOpt: {}
      }
    }
  },
};
