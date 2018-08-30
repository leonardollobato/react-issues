import React, { Component } from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';

const { Row, Cell, HeaderCell } = Table;

class DashboardScreen extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
            issues: []
        }
    }

    componentDidMount(){
        fetch("https://api.github.com/repos/facebook/react/issues")
        .then(results => {
            return results.json();
        })
        .then( data => {
            console.log({ data });
            this.setState({ issues: data });
        });
    }

    renderFooter() {
        return (
                <Row>
                    <HeaderCell colSpan='5'>
                    <Menu floated='right' pagination>
                        <Menu.Item as='a' icon>
                        <Icon name='chevron left' />
                        </Menu.Item>
                        <Menu.Item as='a'>1</Menu.Item>
                        <Menu.Item as='a'>2</Menu.Item>
                        <Menu.Item as='a'>3</Menu.Item>
                        <Menu.Item as='a'>4</Menu.Item>
                        <Menu.Item as='a' icon>
                        <Icon name='chevron right' />
                        </Menu.Item>
                    </Menu>
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

    }

    renderRow(row){
        return (
                <Row key={row.id}>
                    <Cell>{row.number}</Cell>
                    <Cell>{row.title}</Cell>
                    <Cell>{row.created_at}</Cell>
                    <Cell>{row.updated_at}</Cell>
                    <Cell>{'labels'}</Cell>
                    <Cell>{row.state}</Cell>
                </Row>
        );
    }

    render(){
        return (
            <Table 
                celled
                tableData={this.state.issues} 
                renderBodyRow={data => this.renderRow(data)}
                footerRow={this.renderFooter()} 
                headerRow={this.renderHeader()}/>
        )
    }
}

export { DashboardScreen };