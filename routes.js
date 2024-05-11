const aboutRoute = require('./routes/about');
const newsRoute = require('./routes/news');
const hiwRoute = require('./routes/hiw');
const donateRoute = require('./routes/donate');
const feedbackRoute = require('./routes/feedback');

function route(app){
    

    app.get('/', (req, res)=>{ res.render('index')});

    app.use('/about', aboutRoute);
    app.use('/news', newsRoute);
    app.use('/hiw', hiwRoute);
    app.use('/donate', donateRoute);
    app.use('/feedback', feedbackRoute);
    app.get('/success', (req, res)=>{
        res.render('success');
    })
    app.use((req, res)=>{
        res.status(404).render('404');
    })

}

module.exports = route