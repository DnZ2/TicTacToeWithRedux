import React from "react";
import { InformationLayout } from "../Layouts/InformationLayout/InformationLayout";
import { store } from "../redux/store";
import { reset } from "../redux/actions";

export function Information(children){
	const {draw, endgame, currentPlayer} = store.getState()

	function restart(){
		store.dispatch(reset())
	}

	if(draw){
		children = 'Ничья'
	}
	else{
		if(endgame){
			children = `Победа: ${currentPlayer}`
		}
		else{
			children = `Ходит: ${currentPlayer}`
		}
	}
	return(
		<InformationLayout children={children} restart={restart}/>
	)
}
