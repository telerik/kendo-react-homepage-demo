import React from 'react';
import {
    Chart,
    ChartLegend,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
    ChartTooltip,
    ChartTitle
} from '@progress/kendo-react-charts';
import ReactMarkDown from 'react-markdown';
export default class DetailComponent extends React.Component {
    render() {
        const dataItem = this.props.dataItem;
        const data = this.props.makeChartData(dataItem.node.labels.edges)
        const defaultTooltipRender = (item) => {
            if (item.point) {
                return (`${item.point.category} : ${item.point.value}`)
            }
            return ""

        };
        return (
            <div style={{backgroundColor: "white", paddingLeft: 50}}>
                <div className="row">
                    <h4><strong>Author:</strong> {dataItem.node.author.login}</h4>
                </div>
                <div className="row">
                    <div className="col-3">
                        <Chart>
                            <ChartTitle text="Issue type Chart" color="black" position='bottom' font="19pt sans-serif"/>
                            <ChartTooltip render={defaultTooltipRender} />
                            <ChartSeries>
                                <ChartSeriesItem type="pie" data={data} categoryField="labelName" field="occurrence">
                                    <ChartSeriesLabels color="#fff" background="none" visible={false} />
                                </ChartSeriesItem>
                            </ChartSeries>
                            <ChartLegend visible={false} />
                        </Chart>
                    </div>
                    <div className="col-6">
                        <h4>Description</h4>
                        <ReactMarkDown source={dataItem.node.body}/>
                    </div>
                </div>
            </div>
        );
    }
}