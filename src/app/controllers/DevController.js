import axios from 'axios';
import Dev from '../models/Dev'

class DevController {

    async index(request, response) {
        const devList = await Dev.find();
        return response.json(devList);
    }

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = techs.split(',').map(t => t.trim());

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };

            let dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
            return response.json(dev);
    }
}

export default new DevController();