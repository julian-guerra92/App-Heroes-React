import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers";

export const HeroPage = () => {

   const { heroId } = useParams();
   const navigate = useNavigate();
   const hero = useMemo(() => getHeroById(heroId), [heroId]);

   const onNavigateBack = () => {
      navigate(-1);
   }

   if (!hero) return <Navigate to="/marvel" />;

   return (
      <div className="row mt-5">
         <div className="col-4">
            <img
               src={`/assets/heroes/${heroId}.jpg`}
               alt={hero.superhero}
               className="img-thumbnail animate__animated animate__fadeInLeft"
            />
         </div>
         <div className="col-8">
            <h2>{hero.superhero}</h2>
            <ul className="list-group list-group-flush">
               <li className="list-group-item"><b>Alter ego: </b>{hero.alter_ego}</li>
               <li className="list-group-item"><b>Publiser: </b>{hero.publisher}</li>
               <li className="list-group-item"><b>First appearance: </b>{hero.first_appearance}</li>
            </ul>
            <h3>Characters</h3>
            <p>{hero.characters}</p>
            <button
               className="btn btn-outline-primary"
               onClick={onNavigateBack}
            >
               Return
            </button>
         </div>
      </div>
   )
}
