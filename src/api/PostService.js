import axios from "axios";




export default class PostService {
    static async getAll(p) {
            const response = await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films?page=${p}`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': '2a8f9c72-239f-4fb3-8701-102b9ba8d4df',
                    'Content-Type': 'application/json',
                    
                },
            })
        
            
      
            console.log(p)
            return response.data.items
       
        
    }

    static async getById(id) {
        let result
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
        response.data.items.forEach(element => {
            if(element.kinopoiskId = id) {
                console.log(element)
                result = element
            }
        });
        console.log(result)
        return result   
}
}