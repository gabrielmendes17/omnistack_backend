import axios from 'axios';
import Dev from '../models/Dev'

class DevController {

    async teste(request, response) {
        const { github_username, techs } = request.body;
        console.log(github_username);
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        const { name = login, avatar_url, bio } = apiResponse.data;
        console.log(name, avatar_url, bio, github_username);

        const techsArray = techs.split(',').map(t => t.trim());
        const dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
        });
        return response.json(dev);
    }
}

export default new DevController();