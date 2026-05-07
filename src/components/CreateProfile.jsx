import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import "../App.css";

function CreateProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    qid: "",
    phone: "",
    image: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = null;

    // ✅ UPLOAD IMAGE (CORRECT)
    if (form.image) {
      const fileName = `${Date.now()}-${form.image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(fileName, form.image);

      if (uploadError) {
        console.log("Upload Error:", uploadError.message);
        return;
      }

      // ✅ GET PUBLIC URL (CORRECT WAY)
      const { data } = supabase.storage
        .from("profile-images")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    // ✅ SAVE TO DATABASE
    const { error } = await supabase.from("profiles").insert([
      {
        username: form.username,
        phone: form.phone,
        qid: form.qid,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      console.log("DB Error:", error.message);
      return;
    }

    alert("Profile created successfully 🚀");

    navigate(`/${form.username}`);
  };

  return (
    <div className="page">
      <div className="card">

        <h1 className="title">Create Profile</h1>
        <p className="subtitle">Build your digital link in seconds</p>

        <form className="form" onSubmit={handleSubmit}>

          <div className="field">
            <label>Profile Image</label>
            <input type="file" accept="image/*" onChange={handleImage} />
          </div>

          <div className="field">
            <label>Username</label>
            <input name="username" onChange={handleChange} required />
          </div>

          <div className="field">
            <label>QID Number</label>
            <input name="qid" onChange={handleChange} />
          </div>

          <div className="field">
            <label>Phone Number</label>
            <input name="phone" onChange={handleChange} />
          </div>

          <button type="submit">Create Profile</button>

        </form>
      </div>
    </div>
  );
}

export default CreateProfile;