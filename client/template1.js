import React from 'react';
module.exports = function (props) {
		return (
				<div>
						<div draggable="false" className="timeline_center-badge">{props.props.index + 1}
						</div>
						<div draggable="false" className="timeline_center-panel">
								<div draggable="false" className="trash">
										<span className="icon-trash"></span>
								</div>
								<div draggable="false" className="move">
										<span className="icon-dots"></span>
								</div>
								<div draggable="false" className="timeline_center-heading">
										<h4 className="timeline_center-title" draggable="false">{props.props.artist} {props.props.name}</h4>
								</div>
						</div>
				</div>
		);
};