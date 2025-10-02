import User from '../models/User';
import bcrypt from 'bcryptjs';

const createDefaultAdmin = async () => {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'admin123';

  // Check if the admin user already exists
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) {
    console.log('Default admin user already exists');
    return;
  }

  // Create the admin user
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const adminUser = new User({
    name: 'Admin',
    email: adminEmail,
    password: hashedPassword,
    role: 'admin',
  });

  await adminUser.save();
  console.log('Default admin user created successfully');
};

export default createDefaultAdmin;
