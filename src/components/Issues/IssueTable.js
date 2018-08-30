import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination, Label } from 'semantic-ui-react';

const { Row, Cell, HeaderCell } = Table;
class IssueTable extends Component { 
    constructor(props){
        super(props);
        this.state = {
            current_page: props.current_page || 1,
            page_totals: props.page_totals || 1
        }
    } 

    renderFooter() {
        return (
                <Row>
                    <HeaderCell colSpan='6'>
                        <Pagination 
                            onPageChange={this.props.onPageChange} 
                            defaultActivePage={this.state.current_page} 
                            totalPages={this.state.page_totals} />
                    </HeaderCell>
                </Row>
        )
    }

    renderHeader(){

        return (
                <Row>
                    <HeaderCell>Issue Number</HeaderCell>
                    <HeaderCell>Title</HeaderCell>
                    <HeaderCell>Created At</HeaderCell>
                    <HeaderCell>Updated At</HeaderCell>
                    <HeaderCell>Labels</HeaderCell>
                    <HeaderCell>State</HeaderCell>
                </Row>
        );
    }

    renderLabels(labels){
        const labelsComponents = [];

        return Array.isArray(labels) && labels.length > 0 ?
            labels.map(l => labelsComponents.push(<Label basic size='mini' key={l.id}>{l.name}</Label>)) : 
            labelsComponents.push(<Label basic size='mini' key={0}>{'N/A'}</Label>)
    }

    renderRow(row){
        return (
                <Row key={row.id}>
                    <Cell>{row.number}</Cell>
                    <Cell>{row.title}</Cell>
                    <Cell>{new Date(row.created_at).toLocaleString()}</Cell>
                    <Cell>{new Date(row.updated_at).toLocaleString()}</Cell>
                    <Cell>
                        {this.renderLabels(row.labels)}
                    </Cell>
                    <Cell>
                        <Label color={row.state === 'open' ? 'yellow' : 'green'} ribbon='right'>{row.state}</Label>
                    </Cell>
                </Row>
        );
    }

    render(){
        return (
            <Table 
                celled
                tableData={this.props.data} 
                renderBodyRow={data => this.renderRow(data)}
                footerRow={this.renderFooter()} 
                headerRow={this.renderHeader()}/>
        )
    }
};

IssueTable.propTypes = {
  data: PropTypes.array.isRequired,
  //current_page: PropTypes.number,
  page_totals: PropTypes.any,
  onPageChange: PropTypes.func
};

export { IssueTable };