import React from "react";
import { Query } from "react-apollo";
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import { ColumnMenu } from './ColumnMenu.js';
import DetailComponent from './DetailComponent';
import { StateCell }from './StateCell';
import { АssignedTo }from './АssignedTo';

import { getQuery } from '../queries/github';
import kendoReactIssues from '../data/fallBackData.json';
import reactIssues from '../data/fallBackDataReact.json';



export default class KendoGridContainer extends React.Component {
    state = {
        skip: 0,
        take: 10
    }
    allLabels = [];
    uniqueLabels = [];
    expandChange = (event) => {
        event.dataItem.expanded = !event.dataItem.expanded;
        this.forceUpdate();
    }

    getOccurrence = (array, value) => {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }

    makeChartData = (currentLabels) => {
        let data = []
        let currentLabelsParse = currentLabels.map(item => {
            item = item.node.name
            return item
        })
        this.uniqueLabels.map(item => {
            let occurrence = this.getOccurrence(this.allLabels, item)
            if (currentLabelsParse.indexOf(item) >= 0) {
                data.push({
                    occurrence: occurrence,
                    labelName: item,
                    explode: true
                })
            } else {
                data.push({
                    occurrence: occurrence,
                    labelName: item
                })
            }
        })

        return data
    }

    render() {
        return (
            <div>
                <Query query={getQuery(this.props.repo)}>
                    {({ data, loading, error }) => {
                        let gridData = []
                        if (loading) {
                            return <span className="k-loading">Loading...</span>;
                        }
                        if(error){
                            if(this.props.repo === 'react'){
                                gridData = reactIssues.data.repository.issues.edges;
                            } else {
                                gridData = kendoReactIssues.data.repository.issues.edges;
                            }

                        } else {
                            gridData = data.repository.issues.edges;
                        }
                        this.allLabels = [];
                        gridData.map(item => {
                            item.node.createdAt = new Date(item.node.createdAt)
                            item.node.labels.edges.map(item => {
                                this.allLabels.push(item.node.name)
                            })
                            return item;
                        });
                        this.uniqueLabels = this.allLabels.filter((item, i, ar) => { return ar.indexOf(item) === i; });
                        return <Grid data={process(gridData, this.state)}
                            sortable
                            pageable
                            {...this.state}
                            onDataStateChange={(e) => { this.setState(e.data); }}
                            expandField="expanded"
                            onExpandChange={this.expandChange}
                            detail={(props) => <DetailComponent {...props} makeChartData={this.makeChartData} />} >
                            <GridColumn field="node.number" title="ID" width="100px" />
                            <GridColumn field="node.state" title="State" cell={StateCell} width="180px" columnMenu={ColumnMenu} />
                            <GridColumn field="node.title" title="Issue" columnMenu={ColumnMenu} />
                            <GridColumn field="node.assignees.node" title="Assigned to" cell={АssignedTo} sortable={false} />
                            <GridColumn field="node.createdAt" title="Create at" format='{0:yyyy/MM/dd hh:mm}' filter="date" columnMenu={ColumnMenu} />
                        </Grid>
                    }}
                </Query>
            </div>
        );
    }
}