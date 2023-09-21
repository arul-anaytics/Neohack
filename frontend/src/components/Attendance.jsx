import React ,{useState}from 'react';
import QRGenerator from './QRGenerator';
import QRScanner from './QRScanner';
function Attendance({ userData }) {
    const [studentId, setStudentId] = useState("123456");  // Sample student ID for demonstration.

    const handleScan = (scannedData) => {
        if (scannedData) {
            console.log("Scanned student ID:", scannedData);
            // Here, mark attendance or perform other operations based on the scanned student ID.
        }
    }

    return (
        <div>
            {userData.role === 'TRAINER' ? <QRGenerator studentId={studentId} /> : <QRScanner onScan={handleScan} />}
        </div>
    );
}

export default Attendance;
