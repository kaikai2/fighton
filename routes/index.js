
/*
 * GET home page.
 */
var cityNames = {
    1: '长沙',
    2: '上海',
    3: '北京',
};
exports.index = function(req, res){
    var cityName = cityNames[+req.param('c')];

    res.render('index', { title: 'Express', user: req.session.user, currentCityName: cityName, cityNames: cityNames })
};