import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components';
import { getHeroesByName } from '../helpers';
import { key } from 'localforage';

export const SearchPage = () => {

   const navigate = useNavigate();
   const location = useLocation();

   const { q = '' } = queryString.parse(location.search);

   const heroes = getHeroesByName(q);

   const showSearch = (q.length === 0);
   const showError = (q.length > 0) && (heroes.length === 0);

   const { searchText, onInputChange } = useForm({
      searchText: q
   })

   const onSearchSubmit = (event) => {
      event.preventDefault();
      navigate(`?q=${searchText}`) //uso de quiery parameter
   }

   return (
      <>
         <h1>SearchPage</h1>
         <hr />
         <div className="row">
            <div className="col-5">
               <h4>Searching</h4>
               <hr />
               <form onSubmit={onSearchSubmit} aria-label="form">
                  <input
                     type="text"
                     placeholder="Search a hero"
                     className="form-control"
                     name="searchText"
                     autoComplete="off"
                     value={searchText}
                     onChange={onInputChange}
                  />
                  <button className="btn btn-outline-primary mt-3">
                     Search
                  </button>
               </form>
            </div>
            <div className="col-7">
               <h4>Results</h4>
               <hr />
               <div
                  aria-label='alertLoad'
                  className="alert alert-primary animate__animated animate__fadeIn"
                  style={{ display: showSearch ? '' : 'none' }}
               >
                  Search a Hero...
               </div>
               <div
                  aria-label='alertDanger'
                  className="alert alert-danger animate__animated animate__fadeIn"
                  style={{ display: showError ? '' : 'none' }}
               >
                  No hero with <b>{q}</b>
               </div>
               {
                  heroes.map(hero => (
                     <HeroCard key={hero.id} {...hero} />
                  ))
               }
            </div>
         </div>
      </>
   )
}
