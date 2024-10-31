const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Department.find({}));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };
  
  
exports.getRandom = async (req, res) => {

try {
    const count = await Department.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Department.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
}
catch(err) {
    res.status(500).json({ message: err });
}

};

exports.getById = async (req, res) => {
try {
    const dep = await Department.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
} catch (err) {
    res.status(500).json({ message: err });
}
};

exports.addNew = async (req, res) => {
const { name } = req.body;
try {
    const newDepartment = new Department({ name: name});
    await newDepartment.save();
    res.json({ message: 'OK'});
} catch(err) {
    res.status(500).json({ message: err });
}
};

exports.edit = async (req, res) => {
const { name } = req.body;
try {
    const updatedDepartment = await Department.findByIdAndUpdate(
    req.params.id,
    { name: name },
    { new: true }
    );
    
    if (updatedDepartment) {
    res.json(updatedDepartment);
    } else {
    res.status(404).json({ message: 'Not found...' });
    }
} catch (err) {
    res.status(500).json({ message: err });
}
};

exports.delete = async (req, res) => {
try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    
    if (deletedDepartment) {
    res.json(deletedDepartment);
    } else {
    res.status(404).json({ message: 'Not found...' });
    }
} catch (err) {
    res.status(500).json({ message: err });
}
};