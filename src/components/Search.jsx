import { Input } from "@mui/material";
import React from "react";

const Search = function({filter, setFilter}) {
    

    return(
        <div className='search__block'> 
          <Input
            placeholder="Search here!"
            type="text" 
            name="text" 
            className="search" 
            value = {filter}
            onChange={e =>  setFilter(e.target.value) 
            }
            />
      </div>
    )
}

export default Search;