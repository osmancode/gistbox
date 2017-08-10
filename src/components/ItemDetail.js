import React, {Component} from 'react';
import {Panel, Label, ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';
import axios from 'axios';
import {reactLoading} from './../helpers';
import activeItemComponent from "./hoc/ActiveItemComponent";
import eq from 'shallowequal';

import {connect} from 'react-redux';
import {removeItem} from '../actionCreators/item';

class ItemDetail extends Component {
    state = {
        item: undefined,
        isLoading: false
    };

    componentWillReceiveProps(nextProps) {
        if (!(eq(this.props.item, nextProps.item))) {
            this.setState({
                isLoading: true,
            });
        }
    }

    removeItem(id) {
        this.setState({
            isLoading: true
        });

        if (id) {
            axios.delete(`http://localhost:9914/items/${id}`)
                .then((response) => {
                    this.setState({
                        item: undefined,
                        isLoading: false
                    });
                    this.props.itemChanged(0);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    render() {
        const {item, isLoading} = this.state;
        let content;

        if (isLoading) {
            content = reactLoading();
        }
        else if (item === undefined || item === {}) {
            content = <div className="box-center">
                <h4>No item has been selected!.</h4>
                <ol className="list-unstyled">
                    <li>Select item from items list</li>
                </ol>
            </div>;
        }
        else if (item) {
            const files = item.files.map((file) => <Panel key={file.id} header={file.name}>{file.code}</Panel>);
            const labels = item.labels.map((label) => <Label key={label.id} bsStyle={label.color}>{label.name}</Label>);

            content = <div className="row">
                <div className="col-header col-xs-12">
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-meta">
                        <div className="list-labels pull-left">{labels}</div>
                        <ButtonToolbar className="pull-right">
                            <ButtonGroup bsSize="xsmall">
                                <Button>
                                    <i className="glyphicon glyphicon-edit"/> Edit
                                </Button>
                                <Button onClick={() => this.removeItem(item.id)}>
                                    <i className="glyphicon glyphicon-remove"/> Delete
                                </Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </div>
                </div>
                <div className="col-body col-xs-12">
                    {files}
                </div>
            </div>
        }

        return (
            <div className="col-xs-12 col-xs-push-0 col-md-7 col-md-push-5 col col-main-content">{content}</div>
        );

    }
}

export default activeItemComponent(ItemDetail);