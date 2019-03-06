import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage } from 'umi/locale';
import styles from './Analysis.less';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
import numeral from 'numeral';
import Yuan from '@/utils/Yuan';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(({ loading, userdata }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={<FormattedMessage id="新增访客" defaultMessage="新增访客" />}
        // action={
        //   // <Tooltip
        //   //   title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
        //   // >
        //   //   <Icon type="info-circle-o" />
        //   // </Tooltip>
        // }
        loading={loading}
        total={userdata.newuser}
        footer={
          <Field
          // label={'日访问量'}
          // value={`${numeral(12423).format('0,0')}`}
          />
        }
        contentHeight={46}
      >
        {/* <Trend flag="up" style={{ marginRight: 16 }}>
          <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
          <span className={styles.trendText}>11%</span>
        </Trend> */}
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="活跃用户" defaultMessage="活跃用户" />}
        // action={
        //   <Tooltip
        //     title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
        //   >
        //     <Icon type="info-circle-o" />
        //   </Tooltip>
        // }
        total={userdata.activeuser}
        footer={
          <Field
          // label={<FormattedMessage id="app.analysis.day-visits" defaultMessage="Daily Visits" />}
          // value={numeral(1234).format('0,0')}
          />
        }
        contentHeight={46}
      >
        {/* <Trend flag="up" style={{ marginRight: 16 }}>
          <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
          <span className={styles.trendText}>11%</span>
        </Trend> */}
        {/* <MiniArea color="#975FE4" data={visitData} /> */}
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={'沉默用户'}
        // action={
        //   <Tooltip
        //     title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
        //   >
        //     <Icon type="info-circle-o" />
        //   </Tooltip>
        // }
        total={userdata.silenceuser}
        footer={
          <Field
          // label={
          //   <FormattedMessage
          //     id="app.analysis.conversion-rate"
          //     defaultMessage="Conversion Rate"
          //   />
          // }
          // value="60%"
          />
        }
        contentHeight={46}
      >
        {/* <MiniBar data={visitData} /> */}
        {/* <Trend flag="up" style={{ marginRight: 16 }}>
          <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
          <span className={styles.trendText}>11%</span>
        </Trend> */}
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title={'总用户'}
        // action={
        //   <Tooltip
        //     title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
        //   >
        //     <Icon type="info-circle-o" />
        //   </Tooltip>
        // }
        total={userdata.totaluser}
        footer={
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <Trend style={{ marginRight: 16 }}>
              {/* <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
              <span className={styles.trendText}>12%</span> */}
            </Trend>
            {/* <Trend flag="down">
              <FormattedMessage id="app.analysis.day" defaultMessage="Weekly Changes" />
              <span className={styles.trendText}>11%</span>
            </Trend> */}
          </div>
        }
        contentHeight={46}
      >
        {/* <Trend flag="up" style={{ marginRight: 16 }}>
          <FormattedMessage id="app.analysis.week" defaultMessage="Weekly Changes" />
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          <FormattedMessage id="app.analysis.day" defaultMessage="Daily Changes" />
          <span className={styles.trendText}>11%</span>
        </Trend> */}
        {/* <MiniProgress percent={78} strokeWidth={8} target={80} color="#13C2C2" /> */}
      </ChartCard>
    </Col>
  </Row>
));

export default IntroduceRow;
