import { useMemo } from "react";
import { getHeroesByPublisher } from "../helpers"
import { HeroCard } from "./";


export const HeroList = ({ publisher }) => {

   const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

   return (
      <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
         {
            heroes.map((hero) => (
               <HeroCard
                  key={hero.id}
                  {...hero}
               />
            ))
         }
      </div>
   )
}
