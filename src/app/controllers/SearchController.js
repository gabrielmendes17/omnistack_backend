import Dev from '../models/Dev';
import util  from '../utils/ParseStringArray';

class SearchController {
    async index(request, response) {
        const { latitude, longitude, techs } = request.body;
        const techsArray = util.parseStringAsArray(techs);
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