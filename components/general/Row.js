import React, {
    Component,
    PropTypes
} from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Input, Col, HelpBlock, Modal, Checkbox} from 'react-bootstrap';
import {Title} from './Title'
import {SimpleInputContainer} from './Container'
//Container title import
class SimpleRow extends Component {
    constructor(props) {
        super(props);
        this.result = {};
        this.state = {
            "data" : null
        };
    }
    componentDidMount(props) {
        var array = [];
        array.push({value:this.props.value, type:this.props.selectorValue||this.props.category||this.props.type||this.props.selector[0], validateState:""});
        var data = {name:this.props.name};
        data["value"] = array;
        this.setState({
            "data" : data
        });
    }
    getResult(){
        
    }
    render() {
        var style = {overflow: "hidden", margin: "10px 0" }
        var isNotNull = false;
        if(this.props.validator){
            if(this.props.validator.notNull)
                isNotNull = true;
        }
        return (
            <FormGroup bgSize="lg" controlId={this.props.id} style={style}>
                <Title value={this.props.alias||this.props.name} />     
                <SimpleInputContainer {...this.props}/>                      
            </FormGroup>
        );
    }
}
export {SimpleRow};

