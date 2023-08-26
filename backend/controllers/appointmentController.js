const Doctor = require('../models/Doctor');

exports.getRecommendedDoctors = async (req, res) => {
  try {
    // Get the user's preferred specialty from the request body
    const { preferredSpecialty } = req.body;

    // Fetch recommended doctors based on the user's provided preferred specialty
    if (preferredSpecialty) {
      const recommendedDoctors = await Doctor.find({ specialty: preferredSpecialty });
      res.status(200).json({ recommendedDoctors });
    } else {
      // If no preferred specialty is provided, fetch all doctors
      const allDoctors = await Doctor.find();
      res.status(200).json({ allDoctors });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};
