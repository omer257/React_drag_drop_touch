import React from 'react';
module.exports = function (props) {
		return (
			<div>
				<div className="timeline-badge">{props.props.index + 1}</div>
				<div className="timeline-panel">
				<div className="trash">
				<span className="icon-trash" onClick={()=>{props.onReorder()}}></span>
				</div>
				<div className="move">
				<span className="icon-dots"></span>
				</div>
				<div className="timeline-heading">
				<h5 className="timeline-title"  >{props.props.artist} - {props.props.name}</h5>
				</div>
				</div>
			</div>
		);
};