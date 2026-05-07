import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { QRCodeCanvas } from "qrcode.react";

function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .maybeSingle();

      if (error) {
        console.log(error.message);
      }

      setProfile(data);
    };

    fetchProfile();
  }, [username]);

  if (!profile) return <h2>Loading...</h2>;

  const url = `${window.location.origin}/${profile.username}`;

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>

      {/* ✅ CLEAN IMAGE FIX */}
      <img
        src={
          profile.image_url
            ? profile.image_url
            : "https://via.placeholder.com/120?text=No+Image"
        }
        alt="profile"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #ddd",
        }}
      />

      <h2>{profile.username}</h2>
      <p>📱 {profile.phone}</p>
      <p>🆔 {profile.qid}</p>

      <h3>Profile Link</h3>
      <a href={url} target="_blank" rel="noreferrer">
        {url}
      </a>

      <h3>QR Code</h3>
      <QRCodeCanvas value={url} size={180} />

    </div>
  );
}

export default ProfilePage;