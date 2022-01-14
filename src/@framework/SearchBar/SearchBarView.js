import React,{ useState }from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function SearchBarView(props){

const [searchTerm,setSearchTerm] = useState('');
 
const handleSearch=(searchTerm)=> {
    props.handleSearch(searchTerm);
 }

const updateSearch = (e) => {
		setSearchTerm(e.target.value);
};

return (
				<form action="search" class="home_search_form" id="home_search_form">
								<div class="d-flex flex-lg-row flex-column align-items-start justify-content-lg-between justify-content-start">
									<span class="search_input_word">Near</span>
									<GooglePlacesAutocomplete
								      onSelect={(addr)=>handleSearch(addr.description)}
								      initialValue={searchTerm} 
								      inputClassName={"search_input search_input_80" }
								      required
								      placeholder={""}
								    />
									<button class="home_search_button"  disabled={searchTerm==null||searchTerm==""} onClick={(event)=>handleSearch(event)}>search</button>
								</div>
				</form>

	);
	
}


export default  SearchBarView;