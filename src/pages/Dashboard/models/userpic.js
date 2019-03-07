import { getAllData,getBingOpt,getLineOpt,getfunnelOpt } from '@/services/api';

export default {
  namespace: 'userPic',

  state: {
    ageOpt:{},
    employeeOpt:{},
    numOpt:{},
    educationOpt:{}
  },

  effects: {
    *fetchAllData(_, { call, put }) {
      const res = yield call(getAllData);
      yield put({
        type: 'saveTags',
        payload: res
      });
    },
  },

  reducers: {
    saveTags(state, {payload}) {
      console.log(payload)
      const num = getBingOpt(['男生','女生'],payload.peoplenum)
      const education = getBingOpt(["未知","初中","高中","本科","专科"],payload.education)
      const age = getLineOpt(['未知', '0-17', '18-24', '25-29', '30-34', '35-39', '40以上'],payload.age)
      const datalabel = [];
      payload.employee.map((item,index)=>{
        datalabel.push(item.name);
      })
      const employee = getfunnelOpt(datalabel,payload.employee)
      console.log(employee)
      return {
        ...state,
        numOpt:num,
        ageOpt:age,
        educationOpt:education,
        employeeOpt:employee
      };
    },
    clear(){
      return {
        ageOpt:{},
        employeeOpt:{},
        numOpt:{},
        educationOpt:{}
      }
    }
  },
};
