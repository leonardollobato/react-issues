import React, { Component } from 'react';
import { Container, Dimmer, Loader } from 'semantic-ui-react'

import { IssueTable } from '../Issues';
import { Helpers } from '../../utils/Helpers';

class DashboardScreen extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: true,
            issues: [],
            page_totals: 1
        }
    }

    componentDidMount(){
        this.fetchIssues()
    }

    async fetchIssues(page = 1, per_page = 100){
        return fetch(`https://api.github.com/repos/facebook/react/issues?page=${page}&per_page=${per_page}&access_token=d822898eb1264a67e5dd3780d31ec945634679c6`)
            .then(response => {
                let header = response.headers.get('Link');

                if(header !== ''){
                    let links = header.split(',');
                    let page_totals = Helpers.getParameterByName('page', links[1]); 

                    if(page_totals !== '') 
                        this.setState({ page_totals });
                }

                return response.json();
            })
            .then( data => {
                this.setState({ issues: data, isLoading: false});
            });
    }


    renderLoader(){
        return (
            <Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>
        )
    }

    render(){
        return (
            <Container>
            {
                this.state.isLoading ? 
                this.renderLoader():
                <IssueTable 
                    data={this.state.issues} 
                    current_page={this.state.current_page} 
                    page_totals={this.state.page_totals}
                    onPageChange={(event, data) => {
                        this.setState({ current_page: data.activePage});
                        this.fetchIssues(data.activePage);
                    }}
                />
            }
            </Container>
        )
    }
}

export { DashboardScreen };