import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Panel, Label, ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';

// import Highlight from 'react-syntax-highlighter';
// import Style from 'react-syntax-highlighter/src/styles/github-gist';

export class GistDetail extends Component {
    static propTypes = {
        item: PropTypes.object,
    };


    render() {
        const item = this.props.item;


        let content = '';
        if (item) {
            const files = item.files.map((file) => <Panel key={file.id} header={file.name}>{file.code}</Panel>);
            const labels = item.labels.map((label) => <Label key={label.id} bsStyle={label.color}>{label.name}</Label>);

            content = <div className="row">
                <div className="col-header col-xs-12">
                    <h3 className="gist-name">{item.name}</h3>
                    <div className="gist-meta">
                        <div className="list-labels pull-left">{labels}</div>
                        <ButtonToolbar className="pull-right">
                            <ButtonGroup bsSize="xsmall">
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </div>
                <div className="col-body col-xs-12">
                    {files}
                </div>
            </div>;
        }
        else {
            content = <div className="box-center">
                <h4>No item has been selected!.</h4>
                <ol className="list-unstyled">
                    <li>Select item from items list</li>
                </ol>
            </div>
        }

        return (
            <div className="col-xs-12 col-xs-push-0 col-md-7 col-md-push-5 col col-main-content">{content}</div>
        );

    }
}