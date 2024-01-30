import React, { useState, useEffect, useCallback,useRef } from 'react';
import axios from 'axios';
import { Multiselect } from 'multiselect-react-dropdown';
import { toast, ToastContainer} from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../components/ScheduleMeet.css';
import 'react-toastify/dist/ReactToastify.css';




const ScheduleMeet = () => {
  const [employeeNames, setEmployeeNames] = useState([]);
  const [, setData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [copied, setCopied] = useState(false); // State to track if the referenceKey is copied
  
  const [topic, settopic]= useState('');
  // const [Paticipants, setPaticipants] = useState('');
  const [date, setdate] = useState('');
  const [start_time, setstart_time] = useState('');
  const [end_time, setend_time] = useState('');
  const [scheduler, setscheduler] = useState('');
  const [duration, setDuration] = useState(0);
  const [schldate] = useState('');
  const [ setShowModal] = useState(false);
  const [ setModalMessage] = useState('');
  const mt =useRef('');
  const mo =useRef('');
  const par =useRef('');
  const dt =useRef('');
  const st =useRef('');
  const et =useRef('');
  const du =useRef('');

  useEffect(() => {
    axios.get('http://localhost:8000/ScheduleMeet')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  
    axios.get('http://localhost:8000/getEmployeeNames')
      .then(res => {
        console.log(res.data);  // Log the data
        setEmployeeNames(res.data);
      })
      .catch(error => console.error('Error fetching employee names:', error));
  }, []);
  const handleMultiselectChange = (selectedList) => {
    setSelectedOptions(selectedList);
  };

  const calculateDuration = useCallback(() => {
    // Check if both start_time and end_time are set
    if (start_time && end_time) {
      const startTime = new Date(`2000-01-01T${start_time}`);
      const endTime = new Date(`2000-01-01T${end_time}`);
      // Calculate duration in minutes
      const durationInMinutes = (endTime - startTime) / (1000 * 60);

      // Update the duration state
      setDuration(durationInMinutes);
      return durationInMinutes;
    }
    return 0;
  }, [start_time, end_time]);

  useEffect(() => {
    // Calculate duration whenever start_time or end_time changes
    calculateDuration();
  }, [start_time, end_time, calculateDuration]);


  const customToastStyle = {
    width: 'auto', // Adjust the width as needed
    fontSize: '14px', // Adjust the font size as needed
  };

  // const handleDelete = (mid) => {
  //   // Send a DELETE request to the backend API
  //   axios.delete(http://localhost:8000/DeleteMeet/${mid})
  //     .then(response => {
  //       // Handle success if needed
  //       // Check for a successful response (status code in the 2xx range)
  //       if (response.status >= 200 && response.status < 300) {
  //         console.log(response.data);
  //         toast.success('Record deleted successfully');
  
  //         // Fetch updated data after deleting a record
  //         axios.get('http://localhost:8000/ScheduleMeet')
  //           .then(res => setData(res.data))
  //           .catch(err => console.log(err));
  //       } else {
  //         // Handle error for non-2xx status codes
  //         console.error('Error deleting meeting:', response.data);
  //       }
  //     })
  //     .catch(error => {
  //       // Handle error if needed
  //       console.error('Error deleting meeting:', error);
  //     });
  // };
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    mt.current.value="";
    mo.current.value="";
    par.current.resetSelectedValues();  
    dt.current.value="";
    st.current.value="";
    et.current.value="";
   



    if (!/^[a-zA-Z\s]+$/.test(scheduler)) {
      setModalMessage('Organizer name should only contain letters and spaces.');
      setShowModal(true);
      return;
    }

    // Check for overlap before submitting the form
    const overlapResponse = await checkOverlap();
    if (overlapResponse.overlap) {
      toast.error('There is an overlapping meeting. Please choose a different time.');
      return;
    }


    const participantsString = selectedOptions.map(employee => employee.name).join(', ');
    const calculatedDuration = calculateDuration();
    const referenceKey = uuidv4();

    axios.post('http://localhost:8000/ScheduleMeet', {
      referenceKey,
      topic,
      Participants: participantsString,
      date,
      start_time,
      end_time,
      scheduler,
      duration: calculatedDuration,
      schldate
    })
    .then(response => {
      // Handle success if needed
      // Check for a successful response (status code in the 2xx range)
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        // Show toast with copyable referenceKey
        toast.success(
          <div>
            <span>Record saved successfully. Reference Key: </span>
            <CopyToClipboard text={referenceKey} onCopy={() => setCopied(true)}>
              <span style={{ cursor: 'pointer', color: 'blue' }}> {referenceKey}</span>
            </CopyToClipboard>
          </div>
        );

        // Fetch updated data after adding a new record
        axios.get('http://localhost:8000/ScheduleMeet')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
      } else {
        // Handle error for non-2xx status codes
        console.error('Error adding meeting:', response.data);
      }
    })
    .catch(error => {
      // Handle error if needed
      console.error('Error adding meeting:', error);
    });

  };


  const checkOverlap = async () => {
    const overlapCheckData = {
      date,
      start_time,
      end_time,
    };
  
    try {
      const response = await axios.post('http://localhost:8000/checkOverlap', overlapCheckData);
      return response.data;
    } catch (error) {
      console.error('Error checking for overlap:', error);
      return { overlap: false };
    }
  };
  


  // const handleOptionChange = (employeeName) => {
  //   setSelectedOptions((prevOptions) => {
  //     const isSelected = prevOptions.includes(employeeName);
  
  //     if (isSelected) {
  //       // If already selected, remove from the list
  //       return prevOptions.filter((name) => name !== employeeName);
  //     } else {
  //       // If not selected, add to the list
  //       return [...prevOptions, employeeName];
  //     }
  //   });
  // };

 
  return (
    <div className='cc'>
      {/* Meeting Schedule Form */}
      <form className="fo" onSubmit={handleSubmit}>
        <h4>Meeting Schedule</h4>
        <hr />
       
        <div className="ib">
          <label>Meeting Topic</label>
          <input type="text" id="topic" ref={mt} placeholder="Enter the topic of the meeting" name='topic'required
          onChange={e => settopic(e.target.value)} />
        </div>
        <div className="ib">
          <label>Meeting Organizer</label>
          <input type="text" ref={mo} placeholder="Scheduler name" name='scheduler'required
           pattern="^[a-zA-Z\s]+$"
           title="organizer name should only contain letters and spaces."
          onChange={e => setscheduler(e.target.value)}  />
        </div>
        <div className="ib">
  <label>Participants:</label><br />
  <Multiselect
  ref={par}
    options={employeeNames}
    displayValue="name"
    onSelect={(selectedList) => handleMultiselectChange(selectedList)}
    onRemove={(selectedList) => handleMultiselectChange(selectedList)}
    selectedValues={selectedOptions}
  />
 
</div>
        <div className="ib" id="date">
          <label>Date</label>
          <input type="date" id="meetingDate"  ref={dt} name='date'required
          onChange={e => setdate(e.target.value)}  />
        </div>
        <div className="ib">
          <label>Meeting Time</label>
          <div className="column">
            <div className="time">
              <label htmlFor="startTime">Start Time:</label>
              <input type="time" id="startTime" ref={st} name="start_time" required
              onChange={e => setstart_time(e.target.value)} />
              <label htmlFor="endTime">End Time:</label>
              <input type="time" id="endTime" ref={et} name="end_time" required
              onChange={e => setend_time(e.target.value)} />
            </div>
            <div className="ib">
              <div>
                <label htmlFor="duration" id="du" ref={du} >
                  Duration (min): {duration}
                </label>
              </div>
             
            </div>
          </div>
        </div>
        <div className='btdiv'>
        <div className='btn' id="bt">
          <button type="submit">Schedule</button>
        </div>
        </div>
      </form>
{/* 
      Meeting Table
      <div className="ta">
     
        <table>
          <thead>
          {/* <h5>Meeting Table</h5> 
            <tr>
            <th>MID</th>
              <th>Topic</th>
              <th>Participants</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Scheduler</th>
              <th>Duration</th>
              <th>Scheduling Date </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr >
                
                <td>{d.topic}</td>
                <td>{d.Participants}</td>
                <td>{d.date}</td>
                <td>{d.start_time}</td>
                <td>{d.end_time}</td>
                <td>{d.scheduler}</td>
                <td>{d.duration}</td>
                <td>{d.schldate}</td>
                <td>
                
                  <button className='btn-danger' >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <ToastContainer
        toastStyle={customToastStyle}
      />
      {copied && (
        <div style={{ marginTop: '10px', color: 'green' }}>
          Reference Key Copied!
        </div>
      )}
    </div>
  );
};

export default ScheduleMeet;