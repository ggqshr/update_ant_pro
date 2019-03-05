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
const OfflineData = React.lazy(() => import('./OfflineData'));

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
  getPvOption = (todayData, yestodayData, sevenData, monthData) => {
    console.log("option")
    return {
      legend: {
        data: ['今天', '昨天', '7天前', '30天前'],
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [
          '00:00',
          '01:00',
          '02:00',
          '03:00',
          '04:00',
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
        ],
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis',
      },
      series: [
        {
          name: '今天',
          data: todayData,
          type: 'line',
        },
        {
          name: '昨天',
          data: yestodayData,
          type: 'line',
        },
        {
          name: '7天前',
          data: sevenData,
          type: 'line',
        },
        {
          name: '30天前',
          data: monthData,
          type: 'line',
        },
      ],
    };
  };
  componentWillMount(){
    const { dispatch } = this.props;
    console.log("object")
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


  selectDate = type => {
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    dispatch({
      type: 'chart/fetchSalesData',
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
      dataperhour,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }
    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );
    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
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
            loading={loading.effects["chart/fetchDataPerHour"]}
            // selectDate={this.selectDate}
            // echart的数据
            pvOptions={()=>this.getPvOption(
              dataperhour.today.pvData,
              dataperhour.yestoday.pvData,
              dataperhour.beforseven.pvData,
              dataperhour.beformonth.pvData
            )}
            uvOptions={()=>this.getPvOption(
              dataperhour.today.uvData,
              dataperhour.yestoday.uvData,
              dataperhour.beforseven.uvData,
              dataperhour.beformonth.uvData
            )}
            ipOptions={
              ()=>this.getPvOption(
                dataperhour.today.ipData,
                dataperhour.yestoday.ipData,
                dataperhour.beforseven.ipData,
                dataperhour.beformonth.ipData
              )
            }
            vvOptions={
              ()=>this.getPvOption(
                dataperhour.today.vvData,
                dataperhour.yestoday.vvData,
                dataperhour.beforseven.vvData,
                dataperhour.beformonth.vvData
              )
            }
          />
        </Suspense>
        <div className={styles.twoColLayout}>
          <Row gutter={24}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <TopSearch
                  loading={loading.effects["chart/fetchDetailData"]}
                  detaildata={detaildata}
                  dropdownGroup={dropdownGroup}
                />
              </Suspense>
            </Col>
            {/* <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <ProportionSales
                  dropdownGroup={dropdownGroup}
                  salesType={salesType}
                  loading={loading}
                  salesPieData={salesPieData}
                  handleChangeSalesType={this.handleChangeSalesType}
                />
              </Suspense>
            </Col> */}
          </Row>
        </div>
        <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={offlineData}
            offlineChartData={offlineChartData}
            handleTabChange={this.handleTabChange}
          />
        </Suspense>
      </GridContent>
    );
  }
}

export default props => (
  <AsyncLoadBizCharts>
    <Analysis {...props} />
  </AsyncLoadBizCharts>
);
