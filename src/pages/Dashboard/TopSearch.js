import React, { memo } from 'react';
import { Row, Col, Table, Tooltip, Card, Icon } from 'antd';
import { FormattedMessage } from 'umi/locale';
import Trend from '@/components/Trend';
import numeral from 'numeral';
import styles from './Analysis.less';
import NumberInfo from '@/components/NumberInfo';
import { MiniArea } from '@/components/Charts';

const columns = [
  {
    title: '时间',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: (
     "浏览量PV"
    ),
    dataIndex: 'keyword',
    key: 'keyword',
  },
  {
    title: '独立用户UV',
    dataIndex: 'count',
    key: 'count',
    className: styles.alignRight,
  },
  {
    title: '访问次数VV',
    dataIndex: 'range',
    key: 'range',
  },
  {
    title: '独立IP',
    dataIndex: 'keyword',
    key: 'keyword1',
  },
  {
    title: '跳出率',
    dataIndex: 'keyword',
    key: 'keyword2',
  },
  {
    title: '平均在线时长',
    dataIndex: 'keyword',
    key: 'keyword3',
  },
];

const TopSearch = memo(({ loading, visitData2, searchData, dropdownGroup }) => (
  <Card
    loading={loading}
    bordered={false}
    title={
      "详细数据"
    }
    extra={dropdownGroup}
    style={{ marginTop: 24 }}
  >
    {/* <Row gutter={68}>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              <FormattedMessage id="app.analysis.search-users" defaultMessage="search users" />
              <Tooltip
                title={<FormattedMessage id="app.analysis.introduce" defaultMessage="introduce" />}
              >
                <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
              </Tooltip>
            </span>
          }
          gap={8}
          total={numeral(12321).format('0,0')}
          status="up"
          subTotal={17.1}
        />
        <MiniArea line height={45} data={visitData2} />
      </Col>
      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              <FormattedMessage
                id="app.analysis.per-capita-search"
                defaultMessage="Per Capita Search"
              />
              <Tooltip
                title={<FormattedMessage id="app.analysis.introduce" defaultMessage="introduce" />}
              >
                <Icon style={{ marginLeft: 8 }} type="info-circle-o" />
              </Tooltip>
            </span>
          }
          total={2.7}
          status="down"
          subTotal={26.2}
          gap={8}
        />
        <MiniArea line height={45} data={visitData2} />
      </Col>
    </Row> */}
    <Table
      rowKey={record => record.index}
      size="small"
      columns={columns}
      dataSource={searchData}
      pagination={{
        style: { marginBottom: 0 },
        pageSize: 8,
      }}
    />
  </Card>
));

export default TopSearch;
