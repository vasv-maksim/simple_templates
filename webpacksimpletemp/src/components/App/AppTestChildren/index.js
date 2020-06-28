import React from 'react';
import { connect } from 'react-redux';
import { actionMain }  from '../../../store/mainAction'; 

class AppTestChildren extends React.Component {

constructor(props) {
	super(props);
	this.handleClick = this.handleClick.bind(this);
} 
	handleClick() {
	this.props.changeState();
};

render () {
	return (
		<div>
			<div>
	        	Store:  {this.props.test}
	        </div>

        	<button onClick={this.handleClick}>Нажать для смены состояния</button>
        </div>
        )
       }
}


const mapStateToProps = (state) => {
	return {
		test: state.test
	}
};

const mapDispatchToProps = (dispatch) => {
	const action = actionMain("Состояние поменялось!");
	return {
		changeState: () => { dispatch(action) }
};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppTestChildren);