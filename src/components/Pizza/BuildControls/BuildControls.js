import React from 'react';
import './BuildControls.scss';
import BuildControl from './BuildControl/BuildControl';

//SVGs
import Tomato from '../../../assets/ingredients/tomato.svg';
import Pepperoni from '../../../assets/ingredients/pepperoni.svg';
import Jalapeno from '../../../assets/ingredients/jalapeno.svg';
import Cheese from '../../../assets/ingredients/cheese.svg';
import Cucumber from '../../../assets/ingredients/cucumber.svg';
import Mushroom from '../../../assets/ingredients/mushroom.svg';
import Pineapple from '../../../assets/ingredients/pineapple.svg';
import Olive from '../../../assets/ingredients/olive.svg';
import Paprika from '../../../assets/ingredients/paprika.svg';
import Oregano from '../../../assets/ingredients/oregano.svg';

const controls = [
	{ label: 'Tomato', type: 'tomato', src: Tomato },
	{ label: 'Pepperoni', type: 'pepperoni', src: Pepperoni },
	{ label: 'Jalapeno', type: 'jalapeno', src: Jalapeno },
	{ label: 'Cheese', type: 'cheese', src: Cheese },
	{ label: 'Cucumber', type: 'cucumber', src: Cucumber },
	{ label: 'Mushroom', type: 'mushroom', src: Mushroom },
	{ label: 'Pineapple', type: 'pineapple', src: Pineapple },
	{ label: 'Olive', type: 'olive', src: Olive },
	{ label: 'Paprika', type: 'paprika', src: Paprika },
	{ label: 'Oregano', type: 'oregano', src: Oregano },
];

const BuildControls = props => (
	<div className="build-controls">
		{controls.map(ctrl => (
			<BuildControl
				key={ctrl.label}
				source={ctrl.src}
				label={ctrl.label}
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				disabledLess={props.disabledLess[ctrl.type]}
				disabledMore={props.disabledMore[ctrl.type]}
			/>
		))}
	</div>
);

export default BuildControls;
