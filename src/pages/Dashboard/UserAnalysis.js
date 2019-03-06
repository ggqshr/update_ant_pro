import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Menu, Dropdown } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';

const IntroduceRow = React.lazy(() => import('./UserIntroduceRow'));
const SalesCard = React.lazy(() => import('./UserSalesCard'));
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
  };
  componentWillMount() {
    var moment = require('moment');
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchDataPerHour',
    });
    dispatch({
      type: "chart/fetchRateData",
      payload: {
        startDate: moment().add(-7, 'days').format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
      }
    })
    dispatch({
      type: "chart/fetchRateData2",
      payload: {
        startDate: moment().add(-7, 'days').format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
      }
    })
  }
  componentDidMount() {
    var moment = require('moment');
    const rangePickerValue = [moment().add(-7, 'days'), moment()]
    const rangePickerValue2 = [moment().add(-7, 'days'), moment()]
    this.setState({
      rangePickerValue,
      rangePickerValue2
    })
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/fetchDetailData',
    });
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'chart/fetchUserData',
      });
    });
  }
  handleRangePickerChange = rangePickerValue => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });
    if(rangePickerValue[0]!=undefined){
      dispatch({
        type: 'chart/fetchRateData',
        payload: {
          startDate: rangePickerValue[0].format("YYYY-MM-DD"),
          endDate: rangePickerValue[1].format("YYYY-MM-DD")
        }
      });
    }
  };
  handleRangePickerChange2 = rangePickerValue2 => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue2,
    });
    if(rangePickerValue2[0]!=undefined){
      dispatch({
        type: 'chart/fetchRateData2',
        payload: {
          startDate: rangePickerValue2[0].format("YYYY-MM-DD"),
          endDate: rangePickerValue2[1].format("YYYY-MM-DD")
        }
      });
    }
    
  };
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
    const { salesType, currentTabKey,rangePickerValue2,rangePickerValue } = this.state;
    const { chart, loading } = this.props;
    const {
      userdata,
      totaldata,
      detaildata,
      uvOption,
      vvOption,
      pvOption,
      ipOption,
      rateopt,
      rateopt2,
    } = chart;
    let salesPieData;
    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading.effects['chart/fetchUserData']} userdata={userdata} />
        </Suspense>
        <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            // salesData={salesData}
            isActive={this.isActive}
            loading={pvOption === undefined ? true : false}
            handleRangePickerChange={this.handleRangePickerChange}
            // selectDate={this.selectDate}
            // echart的数据
            rateopt={rateopt}
            title={"新访客和活跃访客占比"}
          />
        </Suspense>
        <div className={styles.twoColLayout}>
          <Row gutter={24}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <SalesCard
                  rangePickerValue={rangePickerValue2}
                  // salesData={salesData}
                  isActive={this.isActive}
                  loading={pvOption === undefined ? true : false}
                  handleRangePickerChange={this.handleRangePickerChange2}
                  // selectDate={this.selectDate}
                  // echart的数据
                  rateopt={rateopt2}
                  title={"新老会员人数"}
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
