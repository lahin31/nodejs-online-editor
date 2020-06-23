const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes/routes');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);

if (process.env.NODE_ENV !== 'production') { 
	//enabling .env
	require('dotenv').config();
}

if(process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

app.listen(process.env.PORT || 4000);