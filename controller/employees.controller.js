const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
    try {
      const employees = await Employee.find().populate('department');
      res.json(employees);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.getRandom = async (req, res) => {
    try {
      const count = await Employee.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const employee = await Employee.findOne().skip(rand);
      if (!employee) res.status(404).json({ message: 'Not Found' });
      else res.json(employee);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.getById = async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) res.status(404).json({ message: 'Not Found' });
      else res.json(employee);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.addNew = async (req, res) => {
    const { firstName, lastName, department, salary } = req.body;
    try {
      const newEmployee = new Employee({ firstName: firstName, lastName: lastName, department: department, salary: salary });
      await newEmployee.save();
      res.json({ message: 'OK' });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.edit = async (req, res) => {
    const { firstName, lastName, department, salary } = req.body;
    try {
      const employee = await Employee.findById(req.params.id);
      if (employee) {
        await Employee.updateOne(
          { _id: req.params.id },
          { $set: { firstName: firstName, lastName: lastName, department: department, salary: salary } }
        );
        res.json({ message: 'OK' });
      } else {
        res.status(404).json({ message: 'Not found...' });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };
  
  exports.delete = async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (employee) {
        await Employee.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      } else {
        res.status(404).json({ message: 'Not found...' });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };