const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');


app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}=> Method:${req.method}; Path:${req.url}`;

	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append server.log')
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenanse.hbs');
// 	//next();
// });

app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (request, response) => {
	response.render('home.hbs', {
		title: 'Home',
		pageName: 'Home Page',
		pageShortDescription: 'This is short description of text'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageName: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});


app.listen(3000, () => {
	console.log('Server is listen port 3000');
});