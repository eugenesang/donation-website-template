const aboutRoute = require('./routes/about');
const newsRoute = require('./routes/news');
const hiwRoute = require('./routes/hiw');

function route(app){
    

    app.get('/', (req, res)=>{ res.render('index')});

    app.use('/about', aboutRoute);
    app.use('/news', newsRoute);
    app.use('/hiw', hiwRoute);

    app.use((req, res)=>{
        res.status(404).render('404');
    })

}

module.exports = route