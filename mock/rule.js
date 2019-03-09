import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    name: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    desc: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}

function getRule(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function postRule(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        desc,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          Object.assign(item, { desc, name });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  return getRule(req, res, u);
}
const data = [
  {
    "acdate": "2019-02-25",
    "actime": "13",
    "anum": 55,
    "dnum": 55,
    "id": "1",
    "platform": "pc",
    "pnum": 55,
    "referdomain": "localhost",
    "useragent": "Mozilla/5.0 (Windows NT 6..."
  },
  {
    "acdate": "2019-02-25",
    "actime": "16",
    "anum": 160,
    "dnum": 200,
    "id": "2",
    "platform": "pc",
    "pnum": 200,
    "referdomain": "localhost",
    "useragent": "Mozilla/5.0 (Windows NT 1..."
  },
  {
    "acdate": "2019-02-25",
    "actime": "16",
    "anum": 40,
    "dnum": 200,
    "id": "3",
    "platform": "pc",
    "pnum": 200,
    "referdomain": "localhost",
    "useragent": "Mozilla/5.0 (Windows NT 6..."
  },
  {
    "acdate": "2019-02-28",
    "actime": "23",
    "anum": 128,
    "dnum": 128,
    "id": "4",
    "platform": "pc",
    "pnum": 128,
    "referdomain": "localhost",
    "useragent": "Mozilla/5.0 (Windows NT 1..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 32,
    "dnum": 292,
    "id": "5",
    "platform": "android",
    "pnum": 244,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (iPhone; CPU ..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 32,
    "dnum": 292,
    "id": "6",
    "platform": "ios",
    "pnum": 32,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (iPhone; CPU ..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 32,
    "dnum": 292,
    "id": "7",
    "platform": "pc",
    "pnum": 16,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (iPhone; CPU ..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 104,
    "dnum": 292,
    "id": "8",
    "platform": "android",
    "pnum": 244,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 104,
    "dnum": 292,
    "id": "9",
    "platform": "ios",
    "pnum": 32,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 104,
    "dnum": 292,
    "id": "10",
    "platform": "pc",
    "pnum": 16,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 24,
    "dnum": 292,
    "id": "11",
    "platform": "android",
    "pnum": 244,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 24,
    "dnum": 292,
    "id": "12",
    "platform": "ios",
    "pnum": 32,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 24,
    "dnum": 292,
    "id": "13",
    "platform": "pc",
    "pnum": 16,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 12,
    "dnum": 292,
    "id": "14",
    "platform": "android",
    "pnum": 244,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 12,
    "dnum": 292,
    "id": "15",
    "platform": "ios",
    "pnum": 32,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 12,
    "dnum": 292,
    "id": "16",
    "platform": "pc",
    "pnum": 16,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 28,
    "dnum": 292,
    "id": "17",
    "platform": "android",
    "pnum": 244,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 28,
    "dnum": 292,
    "id": "18",
    "platform": "ios",
    "pnum": 32,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 28,
    "dnum": 292,
    "id": "19",
    "platform": "pc",
    "pnum": 16,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 20,
    "dnum": 292,
    "id": "20",
    "platform": "android",
    "pnum": 244,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 20,
    "dnum": 292,
    "id": "21",
    "platform": "ios",
    "pnum": 32,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 20,
    "dnum": 292,
    "id": "22",
    "platform": "pc",
    "pnum": 16,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 56,
    "dnum": 292,
    "id": "23",
    "platform": "android",
    "pnum": 244,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 56,
    "dnum": 292,
    "id": "24",
    "platform": "ios",
    "pnum": 32,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 56,
    "dnum": 292,
    "id": "25",
    "platform": "pc",
    "pnum": 16,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 16,
    "dnum": 292,
    "id": "26",
    "platform": "android",
    "pnum": 244,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Windows NT 1..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 16,
    "dnum": 292,
    "id": "27",
    "platform": "ios",
    "pnum": 32,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Windows NT 1..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "20",
    "anum": 16,
    "dnum": 292,
    "id": "28",
    "platform": "pc",
    "pnum": 16,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Windows NT 1..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "21",
    "anum": 12,
    "dnum": 28,
    "id": "29",
    "platform": "android",
    "pnum": 28,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-04",
    "actime": "21",
    "anum": 16,
    "dnum": 28,
    "id": "30",
    "platform": "android",
    "pnum": 28,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 1,
    "dnum": 95,
    "id": "31",
    "platform": "android",
    "pnum": 93,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (iPhone; CPU ..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 1,
    "dnum": 95,
    "id": "32",
    "platform": "ios",
    "pnum": 2,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (iPhone; CPU ..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 1,
    "dnum": 95,
    "id": "33",
    "platform": "android",
    "pnum": 93,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (iPhone; CPU ..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 1,
    "dnum": 95,
    "id": "34",
    "platform": "ios",
    "pnum": 2,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (iPhone; CPU ..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 6,
    "dnum": 95,
    "id": "35",
    "platform": "android",
    "pnum": 93,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 6,
    "dnum": 95,
    "id": "36",
    "platform": "ios",
    "pnum": 2,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 5,
    "dnum": 95,
    "id": "37",
    "platform": "android",
    "pnum": 93,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 5,
    "dnum": 95,
    "id": "38",
    "platform": "ios",
    "pnum": 2,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 11,
    "dnum": 95,
    "id": "39",
    "platform": "android",
    "pnum": 93,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 11,
    "dnum": 95,
    "id": "40",
    "platform": "ios",
    "pnum": 2,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 16,
    "dnum": 95,
    "id": "41",
    "platform": "android",
    "pnum": 93,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 16,
    "dnum": 95,
    "id": "42",
    "platform": "ios",
    "pnum": 2,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 9,
    "dnum": 95,
    "id": "43",
    "platform": "android",
    "pnum": 93,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 9,
    "dnum": 95,
    "id": "44",
    "platform": "ios",
    "pnum": 2,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 34,
    "dnum": 95,
    "id": "45",
    "platform": "android",
    "pnum": 93,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 34,
    "dnum": 95,
    "id": "46",
    "platform": "ios",
    "pnum": 2,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 8,
    "dnum": 95,
    "id": "47",
    "platform": "android",
    "pnum": 93,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 8,
    "dnum": 95,
    "id": "48",
    "platform": "ios",
    "pnum": 2,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 4,
    "dnum": 95,
    "id": "49",
    "platform": "android",
    "pnum": 93,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "10",
    "anum": 4,
    "dnum": 95,
    "id": "50",
    "platform": "ios",
    "pnum": 2,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "12",
    "anum": 7,
    "dnum": 7,
    "id": "51",
    "platform": "android",
    "pnum": 7,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-05",
    "actime": "19",
    "anum": 7,
    "dnum": 7,
    "id": "52",
    "platform": "android",
    "pnum": 7,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  },
  {
    "acdate": "2019-03-06",
    "actime": "09",
    "anum": 7,
    "dnum": 7,
    "id": "53",
    "platform": "android",
    "pnum": 7,
    "referdomain": "47.102.140.85",
    "useragent": "Mozilla/5.0 (Linux; Andro..."
  }
]

export default {
  'GET /api/rule': getRule,
  'POST /api/rule': postRule,
  "POST /api/agen/data":data,
  
};
