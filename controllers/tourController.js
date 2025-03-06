const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
exports.checkBody = (req, res, next) => {
    console.log(888);
    if(!(req.body.name || req.params.price)){
       return res.status(400).json({status: 'fail', message: "Please enter exact amount of properties" });
    }
    next();
}
exports.checkId = (req, res, next, val) => {
    if(req.params.id*1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid id'
        })
    }
    next();
}
exports.getTours = (req, res) => {
    res.status(200).json({
        status: 200, data: {
            tours
        }
    });
};
exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1; //converting to number
    const tour = tours.find(e => e.id === id);
    res.status(200).json({
        status: 200, data: {
            tour
        }
    });
};
exports.createTour = (req, res) => {
    console.log(888);
    res.send('Done');
};
exports.updateTour = (req, res) => {
    console.log(req.body);
    res.send('Done');
};
exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success', data: null
    });
};
