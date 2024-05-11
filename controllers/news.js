const axios = require('axios');

function newsById(req, res) {
    const id = req.params.id;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://en.wikipedia.org/w/api.php?action=query&format=json&pageids=${id}&prop=info|extracts|images`
    };

    axios.request(config)
        .then((response) => {
            console.log(response.data);
            const content = response['data']["query"]['pages'][id]['extract'];
            const title = response['data']["query"]['pages'][id]['title'];

            res.render('news-more', {content, title})
        })
        .catch((error) => {
            console.error(error);
            res.redirect('/news')
        });
}


module.exports = {newsById};