import { QRCodeCanvas } from "qrcode.react";
import { useParams } from "react-router-dom";

function QRCodePage() {
  const { username } = useParams();

  // 👉 real app link (same route your React app uses)
  const url = `${window.location.origin}/${username}`;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>My ASAPLink QR</h2>

      <QRCodeCanvas value={url} size={180} />
    </div>
  );
}

export default QRCodePage;