// src/components/QRScanner.jsx

import React from 'react';
// import QrReader from 'react-qr-reader';

function QRScanner({ onScan }) {
    const handleError = (err) => {
        console.error("Error scanning QR code:", err);
    }

    return (
        <div>
            <h2>Scan QR Code</h2>
            {/* <QrReader
                delay={300}
                onError={handleError}
                onScan={onScan}
                style={{ width: '100%' }}
            /> */}
        </div>
    );
}

export default QRScanner;
