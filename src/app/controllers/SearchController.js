import Dev from '../models/Dev';

class SearchController {
    async index(request, response) {
        const { latitude, longitude, techs } = request.body;
        console.log(request.body);
        const techsArray = techs.split(',').map(t => t.trim());
        const dev = await Dev.find({
            techs: {
                $in: techsArray
            },
             location : {
                $near: {
                    $geometry: {
                        type: 'Points',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                }
            },
        });
        return response.json(dev);
    }
}

export default new SearchController();