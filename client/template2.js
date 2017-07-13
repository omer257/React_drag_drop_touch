import React from 'react';
module.exports = function (props) {
		return (
			<div>
				<div draggable="false" className="timeline-badge">{props.props.index + 1}</div>
				<div draggable="false" className="timeline-panel">
				<div draggable="false"  className="trash">
				<span className="icon-trash" onClick={()=>{props.onReorder()}}></span>
				</div>
				<div draggable="false" className="move">
				<span className="icon-dots"></span>
				</div>
				<div draggable="false"  className="timeline-heading">
				<h5 className="timeline-title" draggable="false" >{props.props.artist} {props.props.name}</h5>
				</div>
				</div>
			</div>
		);
};