import React from 'react'
import Chart from 'react-google-charts';
import { Row, Col } from 'reactstrap';
function PieChart (props){
    return(
            <div>
                <h2>Some Stats</h2>
                <Row>
                    <Col xs="6">
                        <Chart
                        width={'100'}
                        height={'100'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Ticket Priority', 'value'],
                            ['High', props.high],
                            ['Medium', props.medium],
                            ['Low',props.low],
                            ]}
                        options={{
                        title: 'Ticket Priority %'
                        }}
                        />
                    </Col>
                    <Col xs="6">
                        <Chart
                        width={'100'}
                        height={'100'}
                        chartType="Bar"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Department', 'Type'],
                            ['Sales', props.sales],
                            ['Technical', props.technical],
                            ['Service', props.service],
                        ]}
                        options={{
                            chart: {
                            title: 'Tickets By Department'
                            },
                        }}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
export default PieChart;