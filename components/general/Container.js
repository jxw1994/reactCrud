import React, {
    Component,
    PropTypes
} from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Input, Col, HelpBlock, Modal, Checkbox} from 'react-bootstrap'
import {SimpleInput} from './Input'

class SimpleInputContainer extends Component{   
     constructor(props) {
        super(props);
     }
     getResult(){

     }
     render() {
        return (        
            <Col sm={10}>
                <SimpleInput />
            </Col>
        );
    }
}
export {SimpleInputContainer};