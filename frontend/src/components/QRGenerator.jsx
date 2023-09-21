// QRGenerator.jsx

import React from 'react';
import QRCode from "react-qr-code";

function QRGenerator({ studentId }) {
    return (
        <div>
            <h2>QR Code for Student ID: {studentId}</h2>
            <QRCode value={studentId} size={256} />
        </div>
    );
}

export default QRGenerator;
