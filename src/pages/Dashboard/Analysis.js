import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';

const IntroduceRow = React.lazy(() => import('./IntroduceRow'));
const SalesCard = React.lazy(() => import('./SalesCard'));
const TopSearch = React.lazy(() => import('./TopSearch'));
const ProportionSales = React.lazy(() => import('./ProportionSales'));

@connect(({ chart, loading }) => ({
  chart,
  loading: loading,
}))
class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  };
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchDataPerHour',
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchDetailData',
    });
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetchTotalData',
      });
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  //切换tab
  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };


  isActive = type => {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  render() {
    const { rangePickerValue, salesType, currentTabKey } = this.state;
    const { chart, loading } = this.props;
    const {
      totaldata,
      detaildata,
      uvOption,
      vvOption,
      pvOption,
      ipOption,
      avgTime,
      jumpOpt,
    } = chart;
    let salesPieData;
    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading.effects['chart/fetchTotalData']} totaldata={totaldata} />
        </Suspense>
        <Suspense fallback={null}>
          <SalesCard
            // rangePickerValue={rangePickerValue}
            // salesData={salesData}
            isActive={this.isActive}
            loading={pvOption === undefined ? true : false}
            // selectDate={this.selectDate}
            // echart的数据
            pvOptions={pvOption}
            uvOptions={uvOption}
            ipOptions={ipOption}
            vvOptions={vvOption}
            jumpOpt={jumpOpt}
            avgTime={avgTime}
          />
        </Suspense>
        <div className={styles.twoColLayout}>
          <Row gutter={24}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <TopSearch
                  loading={loading.effects['chart/fetchDetailData']}
                  detaildata={detaildata}
                />
              </Suspense>
            </Col>
          </Row>
        </div>
      </GridContent>
    );
  }
}

export default props => (
  <AsyncLoadBizCharts>
    <Analysis {...props} />
  </AsyncLoadBizCharts>
);
