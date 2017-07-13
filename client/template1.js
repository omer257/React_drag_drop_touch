import React from 'react';
module.exports = function (props) {
		return (
				<div onClick={()=>{props.onReorder()}}>
					<div draggable="false" className="timeline-badge blue"></div>
					<div draggable="false"  className="timeline-panel">
					<img draggable="false"  src={props.props.image} alt={props.props.artist + " " + props.props.name}/>
						<div draggable="false"  className="timeline-heading">
							<h5 draggable="false"  className="timeline-title">{props.props.artist}
							- {props.props.name}</h5>
						</div>
					</div>
				</div>
		);
};