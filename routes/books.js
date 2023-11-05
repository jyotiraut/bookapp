var express = require('express');
var router = express.Router();
var books = require('../resources/books')

/* GET home page. */
router.get('/add', function(req, res, next) { //get req to display
    res.render('addBooks', { title: 'Add Books' }); //ejs index content
});


router.post('/save', function(req, res, next) {
    books.push({...req.body, _id: `00${(books.length+1)}` })
    res.redirect('/')
})

router.get('/edit/:_id', function(req, res, next) {
    const book = books.find((book) => book._id == req.params._id)
    console.log(book)
    res.render('editBooks', { title: "Edit Books", book: book })

})
router.post('/saveEdited/:_id', function(req, res, next) {
    const currIndex = books.findIndex((book) => book._id === req.params._id)
    books.splice(currIndex, 1, {...req.body, _id: req.params._id })
    res.redirect('/')
})



router.get('/delete/:_id', function(req, res, next){
    const book = books.find((book)=>book._id === req.params._id)
    const currIndex = books.findIndex((book)=>book._id === req.params._id)
    books.splice(currIndex, 1)
      res.render('deleteBooks', {title: "Delete Books", book})
    res.redirect('/')

})






module.exports = router;
