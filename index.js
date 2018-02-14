var express = require('express');
var app = express();
app.set('port', process.env.PORT || 8080);
var handlebars = require('express-handlebars')
.create({defaultLayout : 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

var fortunes = [
    "고멘 가라사대, 버그여 사라져라",
    "고멘 가라사대, 버그여 물럿거라",
    "고멘 가라사대 나 외에 다른 프로그래머를 섬기지 말지어다."
];

app.get('/', function(req, res){
    res.render('home');
});

app.get('/about', function(req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render("about", { fortune : randomFortune});
});

app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    res.status(500);
    res.render("500");
});

app.listen(app.get('port'), function(){
    console.log("Server is now listening on 8080");
})