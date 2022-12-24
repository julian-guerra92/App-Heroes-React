import { Link } from "react-router-dom";

const CharactersByHero = ({ alter_ego, characters }) => {
   return (alter_ego === characters)
      ? (<></>)
      : (<p>{characters}</p>);
}

export const HeroCard = ({
   id,
   superhero,
   publisher,
   alter_ego,
   first_appearance,
   characters,
}) => {

   const heroImageUrl = `/heroes/${id}.jpg`;

   return (
      <div className="col animate__animated animate__fadeIn">
         <div className="card text-bg-dark">
            <div className="card-header mt-2">
               <h4><b>{superhero}</b></h4>
            </div>
            <div className="row align-items-center">
               <div className="col-5 p-3">
                  <img src={heroImageUrl} className="card-img" alt={superhero} />
               </div>
               <div className="col-7">
                  <div className="card-body">
                     <p className="card-text">{alter_ego}</p>
                     <CharactersByHero alter_ego={alter_ego} characters={characters} />
                     <p className="card-text">
                        <small className="text-muted">{first_appearance}</small>
                     </p>

                     <Link to={`/hero/${id}`}>
                        <button className="btn btn-info btn-sm">
                           More Info!
                        </button>
                     </Link>

                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
