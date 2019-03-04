import React, { memo } from 'react';
import { Row, Col, Card, Tabs, DatePicker } from 'antd';
import { FormattedMessage, formatMessage } from 'umi/locale';
import numeral from 'numeral';
import styles from './Analysis.less';
import { Bar } from '@/components/Charts';
import ReactEcharts from 'echarts-for-react';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: formatMessage({ id: 'app.analysis.test' }, { no: i }),
    total: 323234,
  });
}

const SalesCard = memo(
  ({
    rangePickerValue,
    salesData,
    isActive,
    handleRangePickerChange,
    loading,
    selectDate,
    pvOptions,
    uvOptions,
  }) => (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <h3>小时指标</h3>
                {/* <a className={isActive('today')} onClick={() => selectDate('today')}>
                  <FormattedMessage id="app.analysis.all-day" defaultMessage="All Day" />
                </a>
                <a className={isActive('week')} onClick={() => selectDate('week')}>
                  <FormattedMessage id="app.analysis.all-week" defaultMessage="All Week" />
                </a>
                <a className={isActive('month')} onClick={() => selectDate('month')}>
                  <FormattedMessage id="app.analysis.all-month" defaultMessage="All Month" />
                </a>
                <a className={isActive('year')} onClick={() => selectDate('year')}>
                  <FormattedMessage id="app.analysis.all-year" defaultMessage="All Year" />
                </a> */}
              </div>
              {/* <RangePicker
                value={rangePickerValue}
                onChange={handleRangePickerChange}
                style={{ width: 256 }}
              /> */}
            </div>
          }
          size="large"
          tabBarStyle={{ marginBottom: 24 }}
        >
          {/* 销售tab */}
          <TabPane tab={'浏览量(PV)'} key="sales">
            <Row>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  {/* 画图位置 */}
                  <ReactEcharts option={pvOptions} />;
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab={'独立用户(UV)'} key="views">
            <Row>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <ReactEcharts option={uvOptions} />;
                </div>
              </Col>
              {/* <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>
                    <FormattedMessage
                      id="app.analysis.visits-ranking"
                      defaultMessage="Visits Ranking"
                    />
                  </h4>
                  <ul className={styles.rankingList}>
                    {rankingListData.map((item, i) => (
                      <li key={item.title}>
                        <span
                          className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                        >
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.title}>
                          {item.title}
                        </span>
                        <span>{numeral(item.total).format('0,0')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col> */}
            </Row>
          </TabPane>

          <TabPane tab={'访问次数（W）'} key="w">
            <Row>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  {/* 画图位置 */}
                  <ReactEcharts option={pvOptions} />;
                </div>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab={'独立IP'} key="IP">
            <Row>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  {/* 画图位置 */}
                  <ReactEcharts option={pvOptions} />;
                </div>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab={'跳出率'} key="jump">
            <Row>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  {/* 画图位置 */}
                  <ReactEcharts option={pvOptions} />;
                </div>
              </Col>
            </Row>
          </TabPane>

          <TabPane tab={'平均在线时长'} key="averageTime">
            <Row>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  {/* 画图位置 */}
                  <ReactEcharts option={pvOptions} />;
                </div>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  )
);

export default SalesCard;
