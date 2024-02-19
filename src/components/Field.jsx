import React, { useEffect } from "react";
import { FieldLayout } from "../Layouts/FieldLayout/FieldLayout";
import { WIN_PATTERNS } from "../constants";
import { store } from "../redux/store";
import { move, playerMove, setDraw, finishGame} from "../redux/actions";

export function Field(){
	const { field, currentPlayer, endgame } = store.getState()


	useEffect(()=>{
		if(!field.some((element)=>element==='')){
			store.dispatch(setDraw())
		}
		WIN_PATTERNS.forEach((wins)=>{
			if(wins.every((winPosition)=>field[winPosition]==='X')){
				store.dispatch(playerMove('X'))
				store.dispatch(finishGame())
			}
			if(wins.every((winPosition)=>field[winPosition]==='O')){
				store.dispatch(playerMove('O'))
				store.dispatch(finishGame())
			}
	})
	},[currentPlayer, field])

	function click(i){
		XsAndOs('X', 'O', i) // ход X и переход хода к O
		XsAndOs('O', 'X', i) // ход O и переход хода к X
	}

	function XsAndOs(value, newValue, index){
		if(!endgame){
			if(currentPlayer===value && field[index]!=='O' && field[index]!=='X'){
				store.dispatch(move(index, value))
				store.dispatch(playerMove(newValue)) // Изменение массива, и смена игрока
			}
		}
	}

	return(
		<FieldLayout field={field} click={click}/>
	)
}
