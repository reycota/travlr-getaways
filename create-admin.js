require('./app_api/models/db');
require('./app_api/models/user');

const mongoose = require('mongoose');
const User = mongoose.model('User');

(async () => {
  try {
    await User.deleteMany({ email: 'admin@travlr.com' });

    const user = new User({ email: 'admin@travlr.com' });
    await user.setPassword('admin123');
    await user.save();

    console.log('Admin user created correctly');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
