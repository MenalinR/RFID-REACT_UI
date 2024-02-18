const express = require('express');
const http = require('http');
const WebSocket = require("ws");
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

let scanButtonStatus = false;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('A new client connected');
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    // Here you can also handle messages from the client if needed
  });
  
  // Example of sending a message to the client
  // ws.send('something');
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const port = 8000;

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin"
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Handle JSON parsing middleware
app.use(express.json());

// Fetch all employees
app.get('/AddEmployee', (req, res) => {
  const sql = "SELECT * FROM employee";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});

// Fetch employee names
app.get('/getEmployeeNames', (req, res) => {
  const sql = "SELECT name, RFID_no FROM employee";
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching employee names:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).json(results);
  });
});

// Fetch all scheduled meetings
app.get('/ScheduleMeet', (req, res) => {
  const sql = "SELECT * FROM meeting";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
});

// Add a new employee
app.post('/AddEmployee', (req, res) => {
  const sql = "INSERT INTO employee (EID, name, RFID_no, phone_no, department, building, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const { EID, name, RFID_no, phone_no, department, building, role } = req.body;
  const values = [EID, name, RFID_no, phone_no, department, building, role];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Error adding employee:', err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json({ success: true, data });
  });
});


// Schedule a new meeting
app.post('/ScheduleMeet', (req, res) => {
  console.log('Received request:', req.body);
  const currentDate = new Date().toISOString().split('T')[0]; // Getting current date in "YYYY-MM-DD" format
  const sql = "INSERT INTO meeting (reference_key, topic, Participants, date, start_time, end_time, scheduler, duration, schldate, RFID_nos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const { referenceKey, topic, Participants, date, start_time, end_time, scheduler, duration, RFID_nos } = req.body;
  const values = [referenceKey, topic, Participants, date, start_time, end_time, scheduler, duration, currentDate, JSON.stringify(RFID_nos)];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Error adding meeting:', err);
      console.log('SQL Query:', sql);
      console.log('Values:', values);
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
      
    } else {
      return res.status(200).json({ success: true, data });
    }
  });
});

// Add a new endpoint for checking overlapping meetings
app.post('/checkOverlap', (req, res) => {
  const { date, start_time, end_time } = req.body;

  const sql = "SELECT * FROM meeting WHERE date = ? AND ((start_time <= ? AND end_time >= ?) OR (start_time >= ? AND start_time < ?) OR (end_time >= ? AND end_time <= ?))";
  const values = [date, start_time, end_time, start_time, end_time, start_time, end_time];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Error checking for overlap:', err);
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    } else {
      // Send a response indicating whether there is an overlap
      return res.status(200).json({ overlap: data.length > 0 });
    }
  });
});

// Delete an employee
app.delete('/DeleteEmployee/:EID', (req, res) => {
  const EID = req.params.EID;
  const sql = 'DELETE FROM employee WHERE EID = ?';

  db.query(sql, [EID], (err, data) => {
    if (err) {
      console.error('Error deleting employee:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).json({ success: true, data });
  });
});

// Add a new admin
app.post('/AddAdmin', (req, res) => {
  const sql = 'INSERT INTO newadmin (name, password, permissions) VALUES (?, ?, ?)';
  const { name, password, permissions } = req.body;

  // Convert the permissions array to a JSON string
  const permissionsJson = JSON.stringify(permissions);

  db.query(sql, [name, password, permissionsJson], (err, result) => {
    if (err) {
      console.error('Error adding admin:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).json({ success: true, result });
  });
});

// Get permissions for a specific user
app.get('/getUserPermissions/:username', (req, res) => {
  const username = req.params.username;

  const sql = 'SELECT permissions FROM newadmin WHERE name = ?';

  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error('Error fetching user permissions:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const permissionsJson = result[0].permissions;
    const permissions = JSON.parse(permissionsJson);

    return res.status(200).json({ success: true, permissions });
  });
});



// Delete a meeting by reference_key
app.delete('/DeleteMeet/:reference_key', (req, res) => {
  const referenceKey = req.params.reference_key;
  const sql = 'DELETE FROM meeting WHERE reference_key = ?';

  db.query(sql, [referenceKey], (err, data) => {
    if (err) {
      console.error('Error deleting meeting:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if any rows were affected to determine if the meeting was found and deleted
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    return res.status(200).json({ success: true, data });
  });
});


// Login route
app.post('/login', (req, res) => {
  const { username, password} = req.body;

  // Check if the username and password are not empty
  if (!username || !password) {
    return res.json({ success: false, message: 'Username and password are required' });
  }

  // Query the database to check the provided credentials
  const query = 'SELECT * FROM newadmin WHERE name = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    // Check if the query returned any results
    if (results.length > 0) {
      // Authentication successful
      const userPermissions = results[0].permissions;
      res.json({ success: true, message: 'Login successful', permissions: userPermissions });
    } else {
      // Authentication failed
      res.json({ success: false, message: 'Invalid username or password' });
    }
  });
});



function logGrantedAccess(rfid, currentTime,currentMeetingReferenceKey) {
  const logSql = "INSERT INTO log (rfid_no, inTIME,ref_key) VALUES (?, ?,?)";
  db.query(logSql, [rfid, currentTime,currentMeetingReferenceKey], (err) => {
    if (err) {
      console.error('Error logging granted access:', err);
    } else {
      console.log('Access granted logged successfully.');
    }
  });
}




app.post('/updateButtonStatus', (req, res) => {
  // Update scan button status based on the request data
  scanButtonStatus = req.body.scanButtonStatus;
  res.json({ message: 'Button status updated successfully' });
});

app.get('/getButtonStatus', (req, res) => {
  console.log('Received GET request for button status');
  console.log('Current scan button status:', scanButtonStatus);
  res.json({ scanButtonStatus });
});

// ... (existing code)
app.post('/checkRFIDAccess', (req, res) => {
  const { rfidData } = req.body;
  
  // Log current time and date for debugging
  const currentTime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();
  console.log('Current Time:', currentTime);
  console.log('Current Date:', currentDate);
  
  // Assuming the RFID data is stored as an array of strings in the RFID_nos field in the meeting table
  const sql = "SELECT * FROM meeting WHERE date = CURDATE() AND start_time <= CURTIME() AND end_time >= CURTIME()";
  
  // Assuming scanButtonStatus is a global variable accessible in this scope
  if (scanButtonStatus) {
    console.log('Scan button is pressed on');
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ rfidData }));
      }
    });
    
    return res.json({
      success: true,
      message: 'RFID read with scan button pressed',
      rfidData,
    });
  } else {
    console.log('Scan button is  pressed off');
    
    // Perform any additional logic with rfidData when the button is not pressed
    // ...

    // Perform the database query
    db.query(sql, (err, data) => {
      if (err) {
        console.error('Error checking RFID access:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (data.length > 0) {
        const currentMeeting = data[0];
        const currentMeetingRFID = currentMeeting.RFID_nos;
        const currentMeetingReferenceKey = currentMeeting.reference_key;

        if (currentMeetingRFID.includes(rfidData)) {
          // RFID access is valid for the current meeting
          logGrantedAccess(rfidData, currentTime, currentMeetingReferenceKey);
          return res.status(200).json({
            success: true,
            message: 'RFID access granted for the current meeting',
            status: 'Meeting now',
            currentTime,
            currentDate,
            currentMeetingRFID,
            currentMeetingReferenceKey,
          });
        } else {
          // RFID access is denied as the provided RFID doesn't match the current meeting RFID
          return res.status(403).json({
            success: false,
            message: 'RFID access denied for the current meeting',
            status: 'Meeting now',
            currentTime,
            currentDate,
          });
        }
      } else {
        // No meeting at the current time
        return res.status(404).json({
          success: false,
          message: 'No meeting now',
          currentTime,
          currentDate,
        });
      }
    });
  }
});


// Update the getAllMeetingDetails route to include inTime from the log table
// Fetch all meeting details
app.get('/getAllMeetingDetails', (req, res) => {
  const sql = `
  SELECT
  employee.name,
  log.rfid_no,
  log.inTIME,
  meeting.schldate,
  meeting.topic,
  meeting.start_time,
  meeting.end_time,
  meeting.date,
  meeting.scheduler
FROM log
INNER JOIN employee ON log.rfid_no = employee.RFID_no
INNER JOIN meeting ON log.ref_key = meeting.reference_key;`;

  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('Meeting details:', data); // Log the data to check if it's empty
    return res.status(200).json(data);
  });  
});



// Start server
server.listen(port,()=> {
  console.log('Server is running on port ${port}');
});