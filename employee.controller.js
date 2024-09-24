const { staffs } = require('./data');
const nextId = require('./helpers/nextId');

exports.getEmployees = (req, res) => {
  const {
    name,
  } = req.query;
  let filterStaffs = staffs;

  if (name) {
    filterStaffs = filterStaffs.filter(
      item => item.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res
    .status(200)
    .json({
      status: 'success',
      data: {
        staffs: filterStaffs
      }
    });
};

exports.addEmployee = (req, res) => {
  const {
    name,
    duty,
    image,
  } = req.body;

  const staff = {
    id: nextId(staffs),
    name,
    duty,
    image,
  }
  staffs.push(staff);

  res
    .status(201)
    .json({
      status: 'success',
      data: {
        staff
      }
    });
};

exports.getEmployee = (req, res) => {
  const { id } = req.params;
  const staff = staffs.find(item => item.id === Number(id));

  if (staff) {
    return res
      .status(200)
      .json({
        status: 'success',
        data: {
          staff
        }
      });
  }

  res
    .status(404)
    .json({
      status: 'fail',
    });
}

exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const {
    name,
    duty,
    image,
  } = req.body;

  const staff = staffs.find(item => item.id === Number(id));
  if (staff) {
    staff.name = name || staff.name;
    staff.duty = duty || staff.duty;
    staff.image = image || staff.image;

    return res
      .status(200)
      .json({
        status: 'success',
        data: {
          staff
        },
      });
  }

  res
    .status(404)
    .json({
      status: 'fail',
    });
}