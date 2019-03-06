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
    rateopt,
    title,
  }) => (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <RangePicker
                value={rangePickerValue}
                onChange={handleRangePickerChange}
                style={{ width: 256 }}
              />
              </div>
            </div>
          }
          size="large"
          tabBarStyle={{ marginBottom: 24 }}
        >
          {/* 销售tab */}
          <TabPane tab={title} key="sales">
            <Row>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  {/* 画图位置 */}
                  <ReactEcharts option={rateopt} />;
                </div>
              </Col>
            </Row>
          </TabPane>
          {/* <TabPane tab={'独立用户(UV)'} key="views">
            <Row>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <ReactEcharts option={uvOptions} />;
                </div>
              </Col>
            </Row>
          </TabPane> */}

          {/* <TabPane tab={'访问次数（VV）'} key="w">
            <Row>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}> */}
                  {/* 画图位置 */}
                  {/* <ReactEcharts option={vvOptions} />;
                </div>
              </Col>
            </Row>
          </TabPane> */}

          {/* <TabPane tab={'独立IP'} key="IP">
            <Row>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}> */}
                  {/* 画图位置 */}
                  {/* <ReactEcharts option={ipOptions} />;
                </div>
              </Col>
            </Row>
          </TabPane> */}

          {/* <TabPane tab={'跳出率'} key="jump">
            <Row>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}> */}
                  {/* 画图位置 */}
                  {/* <ReactEcharts option={pvOptions} />;
                </div>
              </Col>
            </Row>
          </TabPane> */}

          {/* <TabPane tab={'平均在线时长'} key="averageTime">
            <Row>
              <Col xl={24} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}> */}
                  {/* 画图位置 */}
                  {/* <ReactEcharts option={pvOptions} />;
                </div>
              </Col>
            </Row>
          </TabPane> */}
        </Tabs>
      </div>
    </Card>
  )
);

export default SalesCard;
