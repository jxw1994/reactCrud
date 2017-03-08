import React, {
	Component,
	PropTypes
} from 'react';
import { Button, FormGroup, FormControl, ControlLabel, Input, Col, HelpBlock, Modal, Checkbox} from 'react-bootstrap';
import ObjectUtil from '../../util/ObjectUtil';
import DateUtil from '../../util/DateUtil';

class SimpleInput extends Component{ 
    constructor(props) {
        super(props);
        this.result = {};
        var validateState = "unknown";
        if(!this.props.validator){
            validateState = "";
        }
        var data = {name:this.props.name, value:this.props.value, validateState:validateState};
        if(this.props.type && this.props.type == "select")
            data.value = data.value || this.props.options[0];
        if(this.props.type && this.props.type == "checkbox")
            data.value = data.value || 0;
        this.state = {
            "data" : data
        };
    }
    componentDidMount(){
    }
    validate(){
        var data2 = this.state.data;
        if(data2.validateState == "error")
            return false;
        if(data2.validateState == "unknown"){
            var validateResult = this.validateAndSetState(data2);
            return data2.validateState != "error"
        }
        return true;
    }

    changeValue(event){
        if(this.props.onChange){
            this.props.onChange(event);
            return;
        }
        var data2 = this.state.data;
        data2["value"] = event.target.value;
        this.validateAndSetState(data2);
    }

    onCheck(event){
        var data2 = this.state.data;
        data2["value"] = event.target.checked;
        if(data2["value"])
            data2["value"] = 1;
        else
            data2["value"] = 0;
        this.setState({
            "data" : data2
        });
    }

    validateAndSetState(data2){
        var validateResult = this.validateByValue(data2.value);
        Object.assign(data2, validateResult);
        this.setState({
            "data" : data2
        });
        return validateResult;
    }

    validateByValue(value){
        if(!this.props.validator)
            return true;
        var properties = {
            "errorMessage" :"",
            "validateState" : ""
        };
        if(this.props.validator.notNull == true){
            if($.trim(value)===""){
                properties["validateState"] = 'error';
                properties["errorMessage"]  = '字段不能为空';
            }
        }
        //console.log(this.props.validator.dataType);
        if(this.props.validator.dataType){
            switch(this.props.validator.dataType){
                case "number":
                    if((!value=="")&&!$.isNumeric(value)){
                        properties["validateState"] = 'error';
                        properties["errorMessage"] = '请填写数字';
                    }
                    break;
                case "email":
                    var reg = /.*@.+\..+/;
                    if((!value=="")&&!reg.test(value)){
                        properties["validateState"] = 'error';
                        properties["errorMessage"] = '请填写正确邮箱格式';
                    }
                    break;
                case "mobile":
                    if(!$.isNumeric(value) || value.length!=11){
                        properties["validateState"] = 'error';
                        properties["errorMessage"] = '请填写正确的手机号码';
                    }
                    break;
                case "time":
                    if(!DateUtil.checkDateTime(value, this.props.validator.pattern)){
                        properties["validateState"] = 'error';
                        properties["errorMessage"] = '请填写正确时间类型，例如:2016-01-01';
                    }           
            }
        }
        var minLength,maxLength;
        if(minLength = this.props.validator.minLength){
            if(value && value.length < minLength){
                properties["validateState"] = 'error';
                properties["errorMessage"] = '字段最小长度应大于'+minLength;
            }
        }
        if(maxLength = this.props.validator.maxLength){
            if(value && value.length > maxLength){
                properties["validateState"] = 'error';
                properties["errorMessage"] = '字段最大长度不能大于'+maxLength;
            }
        }
        properties["value"] = value;
        return properties;
        
    }

    getResult(){
        var result = {};
        result[this.state.data.name] = this.state.data.value;
        return result;
    }

    render() {
        //console.log(this.state.data);
        var type = this.props.type;
        var propsExt = {
            placeholder : this.props.placeholder,
            defaultValue : this.props.value,
            name : this.props.name,
            type : type,
            style: {marginTop:"5px"}
        };
        var options;
        var style = {overflow: "hidden", margin: "10px 0" }
        var hidden = "";
        if(type){
            switch (type) {
                case "delete":
                    return null;
                    break;
                case "textArea":
                case "textarea":
                    propsExt["componentClass"] = "textarea";
                    break;
                case "checkbox":
                    propsExt = {};              
                    propsExt["componentClass"] = "checkbox";
                    var checked = [];
                    if(this.props.value == "1" || this.props.value == 1 || this.props.value == true){
                        checked["checked"] = "true";
                    }
                    if(this.props.readOnly){
                        checked["disabled"] = "disabled"
                    }
                    return (
                        <FormGroup bgSize="lg" controlId={this.props.id} style={style} validationState={this.state.data.validateState}>
                              <Col sm={2} style={{textAlign:"right",paddingTop:"10px"}} componentClass={ControlLabel}>
                                {notNullTag}{this.props.alias||this.props.name} 
                              </Col> 
                                <Col sm={10}>
                                    <Checkbox name={this.props.name} onClick={this.onCheck.bind(this)} style={{marginLeft:"10px"}} {...checked}>点选{checked}</Checkbox>
                              </Col>
                        </FormGroup>
                    );
                    break;
                case "readOnly":
                    propsExt["value"] =  propsExt["defaultValue"];
                    delete propsExt["defaultValue"];
                    propsExt["readOnly"] = true;
                    break;
                case "hidden":
                    style["display"] = "none";
                    propsExt["type"] = "hidden";
                    break;
                case "select":
                    propsExt["componentClass"] = "select";
                    options = this.props.options.map(function(option,index){
                        return <option value={option}>{option}</option>;
                    });
                    break;
            }
        }else{
            propsExt["type"] = "text";
        }
        if(this.props.readOnly){
            propsExt["value"] =  propsExt["defaultValue"];
            delete propsExt["defaultValue"];
            propsExt["readOnly"] = true;
        }

        var notNullTag = "";
        if(this.props.validator){
            if(this.props.validator.notNull)
                notNullTag = "* "
        }
        return (        
            <div>
                <FormControl  {...propsExt} onChange={this.changeValue.bind(this)} inputRef={ref => { this.input = ref}}>
                    {options}
                </FormControl>
                <HelpBlock>{this.state.data.errorMessage}</HelpBlock>
                <FormControl.Feedback style={{right:"15px",top:"4px"}}/>
            </div>
        );
    }
}

export {SimpleInput};