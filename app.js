const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('67dd0b39e08c37dfdd20c790')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://Tony:5759463525Tony@cluster0.erp5r.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then(result => {
  User.findOne().then(user => {
    if(!user){
      const user = new User({
        name: 'tara',
        email: 'tara@2006',
        cart:{
          items: []
        }
      })
      user.save()
    }
  })
  app.listen(3000)
})
.catch(err => {
  console.log(err)
})