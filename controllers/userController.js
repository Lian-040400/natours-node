exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: 200, data: {tours
        }
    });
};
exports.createUser = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1; //converting to number
    const tour = tours.find(e => e.id === id);
    res.status(200).json({
        status: 200, data: {
            tour
        }
    });
};
exports.getUser = (req, res) => {
    console.log(req.body);
    res.send('Done');
};
exports.updateUser = (req, res) => {
    console.log(req.body);
    res.send('Done');
};
exports.deleteUser = (req, res) => {
    res.status(204).json({
        status: 'success', data: null
    });
};
