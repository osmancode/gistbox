import React, {Component} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import PropTypes from 'prop-types';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import {ButtonGroup, Button, ButtonToolbar, Glyphicon, ListGroup, ListGroupItem} from 'react-bootstrap';

export class GistsList extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        activeId: PropTypes.number
    };

    renderToolbar() {
        return (
            <ButtonToolbar>
                <ToggleButtonGroup type="radio" name="access-level" defaultValue={1}>
                    <ToggleButton bsSize="small" value={1}>All</ToggleButton>
                    <ToggleButton bsSize="small" value={2}>Public</ToggleButton>
                    <ToggleButton bsSize="small" value={3}>Private</ToggleButton>
                </ToggleButtonGroup>
                <ButtonGroup className="pull-right" type="radio" name="sort-order" defaultValue={1}>
                    <Button bsStyle="link" bsSize="small" value={1}><Glyphicon glyph="sort-by-attributes"/>
                        Created</Button>
                    <Button bsStyle="link" bsSize="small" value={2}><Glyphicon glyph=""/> Updated</Button>
                </ButtonGroup>
            </ButtonToolbar>
        );
    }

    renderListItem(item) {
        const {id, name, description, category} = item;
        const isActive = (this.props.activeId === id);
        return (
            <LinkContainer key={id} to={`/${category}/${id}`}>
                <ListGroupItem active={isActive} header={name}>
                    {description}
                </ListGroupItem>
            </LinkContainer>
        );
    }

    render() {

        let {items} = this.props;
        items = items.map((item) => this.renderListItem(item));

        let content = '';
        if (items.length) {
            content = <div className="row">
                <div className="col-header col-xs-12">{this.renderToolbar()}</div>
                <div className="col-body col-xs-12">
                    <div className="row">
                        <ListGroup className="list-categories">{items}</ListGroup>
                    </div>
                </div>
            </div>;
        }
        else {
            content = <div className="box-center">
                <h4>No category has been selected!.</h4>
                <ol className="list-unstyled">
                    <li>Select a category from categories list</li>
                </ol>
            </div>;
        }

        return (
            <div className="col-xs-12 col-xs-push-0 col-md-3 col-md-push-2 col col-secondary-sidebar">{content}</div>
        );
    }
}