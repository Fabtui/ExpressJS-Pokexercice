import React from "react";
import { useParams } from "react-router-dom";
import { Pokemon } from './Pokemon'

export function PokemonLink()  {

    const params = useParams()
    console.log(params.Id)
    return (
            <div className="pokemon-show">
              <Pokemon id={params.Id}/>
            </div>
    );
}