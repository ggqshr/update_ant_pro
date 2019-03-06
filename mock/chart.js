import moment from 'moment';

// mock data
const visitData = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}
const salesTypeData = [
  {
    x: '家用电器',
    y: 4544,
  },
  {
    x: '食用酒水',
    y: 3321,
  },
  {
    x: '个护健康',
    y: 3113,
  },
  {
    x: '服饰箱包',
    y: 2341,
  },
  {
    x: '母婴产品',
    y: 1231,
  },
  {
    x: '其他',
    y: 1231,
  },
];

const salesTypeDataOnline = [
  {
    x: '家用电器',
    y: 244,
  },
  {
    x: '食用酒水',
    y: 321,
  },
  {
    x: '个护健康',
    y: 311,
  },
  {
    x: '服饰箱包',
    y: 41,
  },
  {
    x: '母婴产品',
    y: 121,
  },
  {
    x: '其他',
    y: 111,
  },
];

const salesTypeDataOffline = [
  {
    x: '家用电器',
    y: 99,
  },
  {
    x: '食用酒水',
    y: 188,
  },
  {
    x: '个护健康',
    y: 344,
  },
  {
    x: '服饰箱包',
    y: 255,
  },
  {
    x: '其他',
    y: 65,
  },
];

const offlineData = [];
for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `Stores ${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10,
  });
}
const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];

const radarData = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach(item => {
  Object.keys(item).forEach(key => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

const getFakeChartData = {
  visitData,
  visitData2,
  salesData,
  searchData,
  offlineData,
  offlineChartData,
  salesTypeData,
  salesTypeDataOnline,
  salesTypeDataOffline,
  radarData,
};
const totaldata = {
  iP: 12,
  pV: 377,
  uV: 12,
  vV: 14,
};
const detaildata = [
  {
    date: '2019-03-05 00:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 01:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 02:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 03:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 04:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 05:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 06:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 07:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 08:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 09:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 10:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 11:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 12:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 13:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 14:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 15:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 16:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 17:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 18:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-05 19:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 00:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 01:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 02:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 03:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 04:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 05:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 06:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 07:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 08:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 09:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 10:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 11:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 12:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 13:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 14:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 15:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 16:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 17:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 18:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 19:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 20:00',
    vv: 8,
    uv: 8,
    pv: 146,
    ip: 7,
    jumprates: 4.7945,
    avgvisittimes: 2.7143,
  },
  {
    date: '2019-03-04 21:00',
    vv: 2,
    uv: 2,
    pv: 14,
    ip: 2,
    jumprates: 14.2857,
    avgvisittimes: 1.0,
  },
  {
    date: '2019-03-04 22:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-04 23:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 00:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 01:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 02:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 03:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 04:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 05:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 06:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 07:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 08:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 09:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 10:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 11:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 12:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 13:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 14:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 15:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 16:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 17:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 18:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 19:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 20:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 21:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 22:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
  {
    date: '2019-03-03 23:00',
    vv: 0,
    uv: 0,
    pv: 0,
    ip: 0,
    jumprates: 0.0,
    avgvisittimes: 0.0,
  },
];

const dataperhour = {
  beforseven: {
    vvData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ipData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    pvData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    uvData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  today: {
    vvData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ipData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    pvData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    uvData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  yestoday: {
    vvData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 2, 0, 0],
    ipData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 2, 0, 0],
    pvData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 146, 14, 0, 0],
    uvData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 2, 0, 0],
  },
  beformonth: {
    vvData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ipData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    pvData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    uvData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
};

const userdata ={"newuser":23,"activeuser":33,"silenceuser":2,"totaluser":109}

export default {
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/totaldata': totaldata,
  'GET /api/detaildata': detaildata,
  'GET /api/dataperhour': dataperhour,
  "GET /api/userdata": userdata,
};
