exports.index = function(req, res, next){
    var queryString = req.param('q');
    //    res.send('query: ' + queryString);
    res.render('search', { title: 'Express', user: req.session.user,
		queryString: queryString});
};