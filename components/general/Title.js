import React, {
    Component,
    PropTypes
} from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Input, Col, HelpBlock, Modal, Checkbox} from 'react-bootstrap';

class Title extends Component{
    constructor(props) {
        super(props);
    }
    
    render() {
		var notNullTag = "";
	    if(this.props.notNull){
	    	if(this.props.notNull == true)
	    		notNullTag = "* "
	    }
        var type = this.props.type;
        var propsExt = {
            placeholder : this.props.placeholder,
            defaultValue : this.props.value,
            name : this.props.name,
            type : type,
            style: {marginTop:"5px"}
        };
        if(type){
            switch (type) {
                case "hidden":
                    style["display"] = "none";
                    propsExt["type"] = "hidden";
                    break;
            }
        }
        return (
		      <Col sm={2} style={{textAlign:"right",paddingTop:"10px"}} componentClass={ControlLabel}>
		         {this.props.value} 
		      </Col> 		      		   
        );
    }   
}
export {Title};