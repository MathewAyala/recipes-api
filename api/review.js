const router = require('express').Router();

let reviews = [
  { id: 1, recipeId: 1, reviewer: "Sam", rating: 5, comment: "Restaurant quality." },
  { id: 2, recipeId: 1, reviewer: "Priya", rating: 4, comment: "Good but a little salty." },
  { id: 3, recipeId: 2, reviewer: "Alex", rating: 5, comment: "My new go-to." },
];

let nextReviewId = 4;

router.get('/', (req, res) => {
    res.json(reviews);
})

router.post('/', (req, res) => {
    const {reviewer, rating, comment} = req.body;
    const newReview = { id: nextReviewId, recipeId, reviewer, rating, comment, }
    nextReviewId++;
    reviews.push(newReview);
    res.status(201).json(newReview);
})
router.patch('/:id', (req, res) => {
    
})

router.delete('/:id', (req, res) => {
    
})

module.exports = router;