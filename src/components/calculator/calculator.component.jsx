import React from "react";

import './calculator.styles.scss';

class Calculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstValue: null,
            secondValue: null,
            operation: '',
            total:''
        };
    }   

    componentDidMount () {
     
    }

    handleClick = (evt) =>{
        var value = '';
        var res = 0;
        evt.stopPropagation();

        value = evt.currentTarget.textContent;

        //clear operation
        if(value.toUpperCase()=== 'C'){
            this.setState({firstValue: null, secondValue: null, operation: '', total: 0} );
        }

        //save first value
        if(this.state.operation === '' && this.state.secondValue === null &&  value.match(/[0-9]/g) ){
            value = this.state.total === 0 ? value : this.state.total + value
            this.setState({total: value});
        }

        //save second value
        if(this.state.operation !== '' && this.state.firstValue !== null &&  value.match(/[0-9]/g) ){
            value = this.state.total === 0 ? value : this.state.total + value;
            this.setState({total: value});
        }

        //save + - * / operation
        if( !value.match(/[0-9]/g) && value !== 'C' && value !== '%' && value !== '+-' && value !== '.'){
            this.setState({firstValue:this.state.total, secondValue: null, operation: value, total: 0} );
        }

        //percentage operation
        if(value.toUpperCase()  === '%'){
            res = parseInt(this.state.total)/100+'%';
            this.setState({total:res.toString()});
        }

        //invert value 
        if(isNaN(value) && value.toUpperCase()  === '+-'){
            res = (parseInt(this.state.total)*-1).toString();
            this.setState({firstValue:res, total:res});
        }

         //. operation
        if(value.toUpperCase()  === '.'){
            if(this.state.total.indexOf('.') < 0){
                res = this.state.total+value;
                this.setState({total:res})
            }else{
                this.setState({total:this.state.total})
            }
        }


        //compile result
        if(value === '='){
            this.setState({secondValue: this.state.total},operationResult(this) );
        }
        
        function operationResult(context){
            const operation = context.state.operation;
            var result = 0;
            const firstNumber = parseFloat(context.state.firstValue);
            const secondNumber = parseFloat(context.state.total);
            switch(operation){
                case '*':
                    result = firstNumber*secondNumber;
                    break;
                case '/':
                    result = firstNumber/secondNumber;
                    break;
                case '-':
                    result = firstNumber-secondNumber;
                    break;
                default:
                    result = firstNumber+secondNumber;;
                
            }
            context.setState({total: result === Infinity ? 'Error' : result});
        }

    }
   
    render() {
        return (
            <div className="page">
                <div className="calculator-container">
                    <div className="row">
                        <div className="col screen last-cell">
                            <div className="screen-viewer">{this.state.total ? this.state.total : '0'}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div onClick={this.handleClick.bind(this)}>C</div>
                        </div>
                        <div className="col">
                            <div onClick={this.handleClick.bind(this)}>+-</div>
                        </div>
                        <div className="col">
                            <div onClick={this.handleClick.bind(this)}>%</div>
                        </div>
                        <div className="col last-cell">
                            <div onClick={this.handleClick.bind(this)}>/</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div onClick={this.handleClick.bind(this)}>7</div>
                        </div>
                        <div className="col">
                            <div onClick={this.handleClick.bind(this)}>8</div>
                        </div>
                        <div className="col">
                            <div onClick={this.handleClick.bind(this)}>9</div>
                        </div>
                        <div className="col last-cell">
                            <div onClick={this.handleClick.bind(this)}>*</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div onClick={this.handleClick.bind(this)}>4</div>
                        </div>
                        <div className="col">
                            <div onClick={this.handleClick.bind(this)}>5</div>
                        </div>
                        <div className="col">
                            <div onClick={this.handleClick.bind(this)}>6</div>
                        </div>
                        <div className="col last-cell">
                            <div onClick={this.handleClick.bind(this)}>-</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div onClick={this.handleClick.bind(this)}>1</div>
                        </div>
                        <div className="col">
                            <div onClick={this.handleClick.bind(this)}>2</div>
                        </div>
                        <div className="col">
                            <div onClick={this.handleClick.bind(this)}>3</div>
                        </div>
                        <div className="col last-cell">
                            <div onClick={this.handleClick.bind(this)}>+</div>
                        </div>
                    </div>
                    <div className="row last">
                        <div className="col">
                            <div onClick={this.handleClick.bind(this)}>0</div>
                        </div>
                        <div className="col">
                            <div onClick={this.handleClick.bind(this)}>.</div>
                        </div>
                        <div className="col last-cell">
                            <div onClick={this.handleClick.bind(this)}>=</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Calculator;