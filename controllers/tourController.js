const fs = require('fs');
const Tour = require('../models/tourModel');

exports.getTours = async (req, res) => {
  try {
    const queryObj = {...req.query};
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(el => delete queryObj[el] );

let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    let query = Tour.find(JSON.parse(queryStr));

   if(req.query.sort){
     const sortBy = req.query.sort.split(',').join(' ');
     query = query.sort(sortBy)
   }else{
     query = query.sort('createdAt')
   }

    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields)
    }else{
      query = query.sort('__v')
    }

    const tours = await query;

    res.status(200).json({
      status: 200,
      data: {
        tours
      }
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: e
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(201).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: e
    });
  }

};
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: e
    });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body,{
      new: true,
      runValidators: true
    });
    res.status(201).json({
      status: 'success',
      data: {
        tour: tour,
      }
    });
  } catch (e) {
    res.status(404).json({
      status: 'fail',
      message: e
    });
  }
};

exports.deleteTour = async (req, res) => {
 try {
   await Tour.findByIdAndDelete(req.params.id);
   res.status(201).json({
     status: 'success',
   })
 }catch (e) {
   res.status(404).json({
     status: 'fail',
     message: e
   });
 }

};
