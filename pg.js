const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function insertData(users) {
    try {
        for (const user of users) {
            let { name, age, ...rest } = user;
            age = parseInt(age)
            if (isNaN(age)) {
            age = 0; 
            }
            const address = rest.address || null;
            const additionalInfo = {name, age, ...rest};
        
            await pool.query(
            'INSERT INTO users (name, age, address, additional_info) VALUES ($1, $2, $3, $4)',
            [`${name.firstName} ${name.lastName}`, age, address, additionalInfo]
            );
        }
    } catch (error) {
        throw error;   
    }
}

async function calculateAgeDistribution() {
    const { rows } = await pool.query('SELECT age FROM users');
    const distribution = { '< 20': 0, '20 to 40': 0, '40 to 60': 0, '> 60': 0 };
  
    rows.forEach(({ age }) => {
      if (age < 20) distribution['< 20']++;
      else if (age <= 40) distribution['20 to 40']++;
      else if (age <= 60) distribution['40 to 60']++;
      else distribution['> 60']++;
    });
  
    const total = rows.length;
    for (const group in distribution) {
      distribution[group] = ((distribution[group] / total) * 100).toFixed(2) + '%';
    }
  
    console.log('Age Distribution:', distribution);
}
  

module.exports = {
    insertData:insertData,
    calculateAgeDistribution:calculateAgeDistribution
}
